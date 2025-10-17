import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import { courses } from '@/lib/data';

// Initialize Hugging Face client (will work without API key for public models with rate limits)
const hf = new HfInference();

// Simple in-memory vector store for course embeddings
let courseEmbeddings: Array<{
  courseId: string;
  embedding: number[];
  text: string;
}> | null = null;

// Generate embeddings for all courses (cached)
async function initializeCourseEmbeddings() {
  if (courseEmbeddings) return courseEmbeddings;

  console.log('Generating course embeddings...');

  courseEmbeddings = await Promise.all(
    courses.map(async (course) => {
      // Create rich text representation for embedding
      const text = `${course.title}. ${course.description}. ${course.shortDescription}. Doelgroep: ${course.targetAudience.join(', ')}. Leerdoelen: ${course.objectives.join('. ')}. Categorie: ${course.category}`;

      try {
        // Use sentence-transformers model for embeddings (multilingual support)
        const response = await hf.featureExtraction({
          model: 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
          inputs: text,
        });

        // Handle response which could be number[] or number[][]
        const embedding = Array.isArray(response[0]) ? response[0] : response as number[];

        return {
          courseId: course.id,
          embedding: embedding as number[],
          text,
        };
      } catch (error) {
        console.error(`Error generating embedding for course ${course.id}:`, error);
        // Return zero vector as fallback
        return {
          courseId: course.id,
          embedding: new Array(384).fill(0),
          text,
        };
      }
    })
  );

  console.log(`Generated embeddings for ${courseEmbeddings.length} courses`);
  return courseEmbeddings;
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Semantic search using embeddings
async function semanticSearch(query: string, topK: number = 5) {
  // Initialize embeddings if not done yet
  const embeddings = await initializeCourseEmbeddings();

  // Generate query embedding
  let queryEmbedding: number[];
  try {
    const response = await hf.featureExtraction({
      model: 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2',
      inputs: query,
    });

    queryEmbedding = Array.isArray(response[0]) ? response[0] : response as number[];
  } catch (error) {
    console.error('Error generating query embedding:', error);
    return [];
  }

  // Calculate similarities
  const similarities = embeddings.map((item) => ({
    courseId: item.courseId,
    similarity: cosineSimilarity(queryEmbedding as number[], item.embedding),
  }));

  // Sort by similarity and return top K
  similarities.sort((a, b) => b.similarity - a.similarity);

  return similarities.slice(0, topK);
}

// Generate AI-powered search summary using RAG
async function generateSearchSummary(query: string, relevantCourses: typeof courses) {
  if (relevantCourses.length === 0) {
    return `Helaas hebben we geen cursussen gevonden die exact matchen met "${query}". Probeer een andere zoekterm of verken onze complete catalogus.`;
  }

  // Create context from relevant courses
  const context = relevantCourses
    .map((course, idx) => `${idx + 1}. ${course.title}: ${course.shortDescription}`)
    .join('\n');

  try {
    // Use Hugging Face's text generation (using a smaller, faster model)
    const prompt = `Je bent een behulpzame cursusadviseur voor een Nederlands IT trainingsplatform.

Zoekterm: "${query}"

Relevante cursussen:
${context}

Schrijf een korte, professionele samenvatting (2-3 zinnen) die uitlegt welke cursussen we hebben gevonden en waarom deze relevant zijn voor de zoekopdracht. Wees enthousiast maar professioneel.

Samenvatting:`;

    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
        top_p: 0.9,
        return_full_text: false,
      },
    });

    return response.generated_text.trim();
  } catch (error) {
    console.error('Error generating summary:', error);

    // Fallback to template-based summary
    const count = relevantCourses.length;
    const categories = [...new Set(relevantCourses.map(c => c.category))];

    if (count === 1) {
      return `We hebben de perfecte cursus gevonden voor "${query}": ${relevantCourses[0].title}. ${relevantCourses[0].shortDescription}`;
    } else if (count <= 3) {
      return `We hebben ${count} relevante cursussen gevonden voor "${query}". Deze cursussen behandelen ${categories.join(', ')} en zijn perfect voor professionals die hun vaardigheden willen uitbreiden.`;
    } else {
      return `Geweldig nieuws! We hebben ${count} cursussen gevonden die matchen met "${query}". Van ${categories[0]} tot ${categories[categories.length - 1]} - er zit vast iets tussen dat perfect bij je past.`;
    }
  }
}

// Keyword-based search (fallback and augmentation)
function keywordSearch(query: string) {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/);

  return courses.map((course) => {
    const searchText = `${course.title} ${course.description} ${course.category} ${course.shortDescription} ${course.targetAudience.join(' ')} ${course.objectives.join(' ')}`.toLowerCase();

    // Calculate keyword match score
    let score = 0;

    // Exact phrase match (highest score)
    if (searchText.includes(queryLower)) {
      score += 10;
    }

    // Title match (high score)
    if (course.title.toLowerCase().includes(queryLower)) {
      score += 8;
    }

    // Category match
    if (course.category.toLowerCase().includes(queryLower)) {
      score += 5;
    }

    // Individual word matches
    words.forEach(word => {
      if (word.length > 2 && searchText.includes(word)) {
        score += 1;
      }
    });

    return { courseId: course.id, score };
  }).filter(item => item.score > 0);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const method = searchParams.get('method') || 'hybrid'; // semantic, keyword, or hybrid

  if (!query || query.trim().length < 2) {
    return NextResponse.json({
      results: [],
      summary: 'Voer een zoekterm in om cursussen te vinden.',
      method: 'none',
    });
  }

  try {
    let rankedCourseIds: Array<{ courseId: string; score: number }> = [];

    if (method === 'semantic' || method === 'hybrid') {
      // Semantic search using embeddings
      const semanticResults = await semanticSearch(query, 10);
      rankedCourseIds = semanticResults.map(r => ({
        courseId: r.courseId,
        score: r.similarity * 100
      }));
    }

    if (method === 'keyword' || method === 'hybrid') {
      // Keyword search
      const keywordResults = keywordSearch(query);

      if (method === 'hybrid') {
        // Merge semantic and keyword results
        const mergedScores = new Map<string, number>();

        // Add semantic scores
        rankedCourseIds.forEach(item => {
          mergedScores.set(item.courseId, item.score * 0.7); // 70% weight
        });

        // Add keyword scores
        keywordResults.forEach(item => {
          const current = mergedScores.get(item.courseId) || 0;
          mergedScores.set(item.courseId, current + item.score * 3 * 0.3); // 30% weight
        });

        rankedCourseIds = Array.from(mergedScores.entries())
          .map(([courseId, score]) => ({ courseId, score }))
          .sort((a, b) => b.score - a.score);
      } else {
        rankedCourseIds = keywordResults.sort((a, b) => b.score - a.score);
      }
    }

    // Get top 8 courses
    const topCourseIds = rankedCourseIds.slice(0, 8).map(r => r.courseId);
    const relevantCourses = courses.filter(c => topCourseIds.includes(c.id));

    // Sort courses by their ranking
    relevantCourses.sort((a, b) => {
      const aIndex = topCourseIds.indexOf(a.id);
      const bIndex = topCourseIds.indexOf(b.id);
      return aIndex - bIndex;
    });

    // Skip slow AI summary generation for speed
    const summary = '';

    return NextResponse.json({
      results: relevantCourses,
      summary,
      method,
      query,
      totalResults: rankedCourseIds.length,
    });
  } catch (error) {
    console.error('Search error:', error);

    return NextResponse.json({
      results: [],
      summary: 'Er is een fout opgetreden bij het zoeken. Probeer het opnieuw.',
      method,
      query,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
