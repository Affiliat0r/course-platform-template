/**
 * Regional Platform Detector
 *
 * Intelligently finds course platforms based on region, language, and topic.
 * Uses search engines and local knowledge to identify competitors.
 */

interface RegionalPlatform {
  name: string
  url: string
  type: 'global' | 'regional' | 'local'
  languages: string[]
  specialties?: string[]
}

interface SearchQuery {
  region: string
  language: string
  topic: string
  courseType?: 'professional' | 'academic' | 'hobby'
}

export class RegionalPlatformDetector {
  // Global platforms available in most regions
  private globalPlatforms: RegionalPlatform[] = [
    {
      name: 'Udemy',
      url: 'https://www.udemy.com',
      type: 'global',
      languages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'ja', 'ko', 'zh'],
      specialties: ['programming', 'business', 'design']
    },
    {
      name: 'Coursera',
      url: 'https://www.coursera.org',
      type: 'global',
      languages: ['en', 'es', 'fr', 'de', 'pt', 'ru', 'zh', 'ar', 'it'],
      specialties: ['academic', 'professional', 'certificates']
    },
    {
      name: 'LinkedIn Learning',
      url: 'https://www.linkedin.com/learning',
      type: 'global',
      languages: ['en', 'es', 'fr', 'de', 'pt', 'ja', 'zh'],
      specialties: ['business', 'technology', 'creative']
    }
  ]

  // Regional platform database
  private regionalPlatforms: Record<string, RegionalPlatform[]> = {
    // Netherlands
    netherlands: [
      {
        name: 'Studytube',
        url: 'https://www.studytube.nl',
        type: 'regional',
        languages: ['nl', 'en'],
        specialties: ['corporate', 'professional']
      },
      {
        name: 'LOI',
        url: 'https://www.loi.nl',
        type: 'regional',
        languages: ['nl'],
        specialties: ['vocational', 'professional']
      },
      {
        name: 'NCOI',
        url: 'https://www.ncoi.nl',
        type: 'regional',
        languages: ['nl'],
        specialties: ['business', 'management']
      },
      {
        name: 'Computrain',
        url: 'https://www.computrain.nl',
        type: 'regional',
        languages: ['nl', 'en'],
        specialties: ['IT', 'technology']
      },
      {
        name: 'Springest',
        url: 'https://www.springest.nl',
        type: 'regional',
        languages: ['nl'],
        specialties: ['aggregator', 'marketplace']
      }
    ],

    // Germany
    germany: [
      {
        name: 'Lecturio',
        url: 'https://www.lecturio.de',
        type: 'regional',
        languages: ['de', 'en'],
        specialties: ['medical', 'law', 'business']
      },
      {
        name: 'Oncampus',
        url: 'https://www.oncampus.de',
        type: 'regional',
        languages: ['de'],
        specialties: ['academic', 'professional']
      },
      {
        name: 'ILS',
        url: 'https://www.ils.de',
        type: 'regional',
        languages: ['de'],
        specialties: ['distance learning', 'certificates']
      }
    ],

    // France
    france: [
      {
        name: 'OpenClassrooms',
        url: 'https://openclassrooms.com',
        type: 'regional',
        languages: ['fr', 'en'],
        specialties: ['programming', 'digital']
      },
      {
        name: 'Elephorm',
        url: 'https://www.elephorm.com',
        type: 'regional',
        languages: ['fr'],
        specialties: ['creative', 'design', 'video']
      },
      {
        name: 'Tuto.com',
        url: 'https://www.tuto.com',
        type: 'regional',
        languages: ['fr'],
        specialties: ['creative', 'technical']
      }
    ],

    // Spain
    spain: [
      {
        name: 'Tutellus',
        url: 'https://www.tutellus.com',
        type: 'regional',
        languages: ['es'],
        specialties: ['general', 'blockchain']
      },
      {
        name: 'Domestika',
        url: 'https://www.domestika.org',
        type: 'regional',
        languages: ['es', 'en', 'pt'],
        specialties: ['creative', 'design', 'crafts']
      },
      {
        name: 'Platzi',
        url: 'https://platzi.com',
        type: 'regional',
        languages: ['es', 'en'],
        specialties: ['technology', 'programming']
      }
    ],

    // Japan
    japan: [
      {
        name: 'Schoo',
        url: 'https://schoo.jp',
        type: 'regional',
        languages: ['ja'],
        specialties: ['business', 'technology']
      },
      {
        name: 'Progate',
        url: 'https://prog-8.com',
        type: 'regional',
        languages: ['ja', 'en'],
        specialties: ['programming']
      },
      {
        name: 'Aidemy',
        url: 'https://aidemy.net',
        type: 'regional',
        languages: ['ja'],
        specialties: ['AI', 'data science']
      }
    ],

    // India
    india: [
      {
        name: 'Byju\'s',
        url: 'https://byjus.com',
        type: 'regional',
        languages: ['en', 'hi'],
        specialties: ['academic', 'test prep']
      },
      {
        name: 'UpGrad',
        url: 'https://www.upgrad.com',
        type: 'regional',
        languages: ['en'],
        specialties: ['professional', 'higher education']
      },
      {
        name: 'Simplilearn',
        url: 'https://www.simplilearn.com',
        type: 'regional',
        languages: ['en'],
        specialties: ['certifications', 'professional']
      },
      {
        name: 'Vedantu',
        url: 'https://www.vedantu.com',
        type: 'regional',
        languages: ['en', 'hi'],
        specialties: ['academic', 'school']
      }
    ],

    // Nordic countries
    nordic: [
      {
        name: 'Coursio',
        url: 'https://coursio.com',
        type: 'regional',
        languages: ['sv', 'no', 'da', 'en'],
        specialties: ['business', 'professional']
      },
      {
        name: 'Learnifier',
        url: 'https://learnifier.com',
        type: 'regional',
        languages: ['sv', 'en'],
        specialties: ['corporate', 'training']
      }
    ]
  }

  /**
   * Detect platforms based on region and topic
   */
  async detectPlatforms(query: SearchQuery): Promise<RegionalPlatform[]> {
    const platforms: RegionalPlatform[] = []

    // 1. Add relevant global platforms
    const globalMatches = this.globalPlatforms.filter(platform =>
      platform.languages.includes(query.language) ||
      platform.languages.includes('en') // Fallback to English
    )
    platforms.push(...globalMatches)

    // 2. Add regional platforms
    const regionalKey = this.getRegionalKey(query.region)
    if (this.regionalPlatforms[regionalKey]) {
      const regionalMatches = this.regionalPlatforms[regionalKey].filter(platform => {
        // Filter by language
        if (!platform.languages.includes(query.language) &&
            !platform.languages.includes('en')) {
          return false
        }

        // Filter by topic specialty if applicable
        if (platform.specialties && query.topic) {
          const topicLower = query.topic.toLowerCase()
          return platform.specialties.some(specialty =>
            topicLower.includes(specialty) || specialty.includes(topicLower)
          )
        }

        return true
      })
      platforms.push(...regionalMatches)
    }

    // 3. Use web search to find additional local platforms
    const searchPlatforms = await this.searchForLocalPlatforms(query)
    platforms.push(...searchPlatforms)

    // Remove duplicates
    const uniquePlatforms = this.removeDuplicates(platforms)

    // Sort by relevance
    return this.sortByRelevance(uniquePlatforms, query)
  }

  /**
   * Search for local platforms using search engines
   */
  private async searchForLocalPlatforms(query: SearchQuery): Promise<RegionalPlatform[]> {
    const searchTerms = this.buildSearchTerms(query)
    const platforms: RegionalPlatform[] = []

    // This would use Playwright to search Google
    // For now, returning empty array as placeholder
    // In real implementation:
    // 1. Search Google in target language
    // 2. Extract course platform URLs
    // 3. Verify they are course platforms

    console.log('Search terms:', searchTerms)

    return platforms
  }

  /**
   * Build localized search terms
   */
  private buildSearchTerms(query: SearchQuery): string[] {
    const translations: Record<string, Record<string, string[]>> = {
      nl: {
        course: ['cursus', 'opleiding', 'training'],
        online: ['online', 'digitaal', 'e-learning'],
        platform: ['platform', 'website', 'portaal'],
        it: ['IT', 'ICT', 'informatica', 'programmeren']
      },
      de: {
        course: ['Kurs', 'Schulung', 'Weiterbildung'],
        online: ['online', 'digital', 'E-Learning'],
        platform: ['Plattform', 'Portal', 'Webseite'],
        it: ['IT', 'Informatik', 'Programmierung']
      },
      fr: {
        course: ['cours', 'formation', 'apprentissage'],
        online: ['en ligne', 'numérique', 'e-learning'],
        platform: ['plateforme', 'site', 'portail'],
        it: ['informatique', 'IT', 'programmation']
      },
      es: {
        course: ['curso', 'formación', 'capacitación'],
        online: ['en línea', 'online', 'digital'],
        platform: ['plataforma', 'sitio', 'portal'],
        it: ['informática', 'TI', 'programación']
      }
    }

    const lang = query.language
    const terms: string[] = []

    if (translations[lang]) {
      const t = translations[lang]

      // Build search queries in local language
      t.course.forEach(courseWord => {
        t.online.forEach(onlineWord => {
          terms.push(`${onlineWord} ${courseWord} ${query.topic}`)
          terms.push(`${courseWord} ${query.topic} ${query.region}`)
        })
      })

      // Add platform-specific searches
      t.platform.forEach(platformWord => {
        terms.push(`${platformWord} ${t.course[0]} ${query.topic}`)
      })
    } else {
      // Fallback to English
      terms.push(`online courses ${query.topic} ${query.region}`)
      terms.push(`e-learning platform ${query.topic} ${query.region}`)
      terms.push(`training courses ${query.topic} ${query.region}`)
    }

    return terms
  }

  /**
   * Get regional key from region name
   */
  private getRegionalKey(region: string): string {
    const regionMap: Record<string, string> = {
      'netherlands': 'netherlands',
      'nederland': 'netherlands',
      'nl': 'netherlands',
      'holland': 'netherlands',
      'germany': 'germany',
      'deutschland': 'germany',
      'de': 'germany',
      'france': 'france',
      'fr': 'france',
      'spain': 'spain',
      'españa': 'spain',
      'es': 'spain',
      'japan': 'japan',
      'jp': 'japan',
      'india': 'india',
      'in': 'india',
      'sweden': 'nordic',
      'norway': 'nordic',
      'denmark': 'nordic',
      'finland': 'nordic'
    }

    const key = region.toLowerCase()
    return regionMap[key] || key
  }

  /**
   * Remove duplicate platforms
   */
  private removeDuplicates(platforms: RegionalPlatform[]): RegionalPlatform[] {
    const seen = new Set<string>()
    return platforms.filter(platform => {
      const key = platform.url.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  /**
   * Sort platforms by relevance
   */
  private sortByRelevance(
    platforms: RegionalPlatform[],
    query: SearchQuery
  ): RegionalPlatform[] {
    return platforms.sort((a, b) => {
      // Prioritize regional platforms
      if (a.type === 'regional' && b.type !== 'regional') return -1
      if (b.type === 'regional' && a.type !== 'regional') return 1

      // Prioritize platforms with the query language
      const aHasLang = a.languages.includes(query.language)
      const bHasLang = b.languages.includes(query.language)
      if (aHasLang && !bHasLang) return -1
      if (bHasLang && !aHasLang) return 1

      // Prioritize platforms with matching specialties
      if (a.specialties && b.specialties && query.topic) {
        const topicLower = query.topic.toLowerCase()
        const aMatch = a.specialties.some(s => topicLower.includes(s))
        const bMatch = b.specialties.some(s => topicLower.includes(s))
        if (aMatch && !bMatch) return -1
        if (bMatch && !aMatch) return 1
      }

      return 0
    })
  }

  /**
   * Generate search URLs for the detected platforms
   */
  generateSearchUrls(platforms: RegionalPlatform[], topic: string): string[] {
    return platforms.map(platform => {
      // Build search URL based on platform
      const encodedTopic = encodeURIComponent(topic)

      // Platform-specific search URLs
      const searchPatterns: Record<string, string> = {
        'udemy.com': `/courses/search/?q=${encodedTopic}`,
        'coursera.org': `/search?query=${encodedTopic}`,
        'linkedin.com': `/learning/search?keywords=${encodedTopic}`,
        'domestika.org': `/courses/search/${encodedTopic}`,
        'skillshare.com': `/search?query=${encodedTopic}`,
        'platzi.com': `/buscar/?search=${encodedTopic}`,
        'openclassrooms.com': `/search?query=${encodedTopic}`
      }

      // Find matching pattern
      for (const [domain, pattern] of Object.entries(searchPatterns)) {
        if (platform.url.includes(domain)) {
          return platform.url + pattern
        }
      }

      // Default: try common search patterns
      if (platform.url.includes('.nl')) {
        return `${platform.url}/zoeken?q=${encodedTopic}`
      } else if (platform.url.includes('.de')) {
        return `${platform.url}/suche?q=${encodedTopic}`
      } else if (platform.url.includes('.fr')) {
        return `${platform.url}/recherche?q=${encodedTopic}`
      }

      // Fallback
      return `${platform.url}/search?q=${encodedTopic}`
    })
  }
}

// Example usage
export async function findCompetitors(
  region: string,
  language: string,
  topic: string
): Promise<string[]> {
  const detector = new RegionalPlatformDetector()

  const platforms = await detector.detectPlatforms({
    region,
    language,
    topic
  })

  console.log(`Found ${platforms.length} platforms for ${topic} in ${region}:`)
  platforms.forEach(p => {
    console.log(`- ${p.name} (${p.type}) - ${p.languages.join(', ')}`)
  })

  return detector.generateSearchUrls(platforms, topic)
}

// Specific example for Netherlands IT courses
export async function findDutchITCompetitors(): Promise<string[]> {
  return findCompetitors('Netherlands', 'nl', 'IT programming')
}