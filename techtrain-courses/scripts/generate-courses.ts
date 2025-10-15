// Script to generate course data from CSV
// This will be used to create the courses array for lib/data.ts

interface CSVCourse {
  name: string;
  originalPrice: number;
  adjustedPrice: number;
}

const csvData: CSVCourse[] = [
  { name: "Basisprincipes Programmeren / Programming Fundamentals", originalPrice: 2200, adjustedPrice: 1650 },
  { name: "Python (met ChatGPT)", originalPrice: 2095, adjustedPrice: 1575 },
  { name: "Python Deep Learning", originalPrice: 4250, adjustedPrice: 3195 },
  { name: "Werken met Large Language Models in Python", originalPrice: 2555, adjustedPrice: 1925 },
  { name: "Apache Kafka voor Python", originalPrice: 2330, adjustedPrice: 1750 },
  { name: "R Programmeren", originalPrice: 2570, adjustedPrice: 1925 },
  { name: "Data Analyse", originalPrice: 3180, adjustedPrice: 2625 },
  { name: "Python voor Data Science", originalPrice: 2680, adjustedPrice: 3295 },
  { name: "Data Science Management", originalPrice: 1600, adjustedPrice: 1200 },
  { name: "Data Strategie", originalPrice: 1735, adjustedPrice: 1300 },
  { name: "Data Modeling", originalPrice: 3315, adjustedPrice: 2495 },
  { name: "Data Build Tool (dbt)", originalPrice: 2335, adjustedPrice: 1750 },
  { name: "Apache Airflow", originalPrice: 2445, adjustedPrice: 1825 },
  { name: "Anchor Modelling", originalPrice: 1860, adjustedPrice: 1395 },
  { name: "Data Management DAMA-DMBOK", originalPrice: 2505, adjustedPrice: 1875 },
  { name: "Big Data", originalPrice: 2940, adjustedPrice: 2025 },
  { name: "Apache Mahout", originalPrice: 2850, adjustedPrice: 2125 },
  { name: "Apache Pig", originalPrice: 1370, adjustedPrice: 1025 },
  { name: "Data Mining", originalPrice: 2105, adjustedPrice: 1575 },
  { name: "Qlik Sense", originalPrice: 2250, adjustedPrice: 1695 },
  { name: "Google Data Studio", originalPrice: 730, adjustedPrice: 550 },
  { name: "Business Objects", originalPrice: 2660, adjustedPrice: 1995 },
  { name: "Klipfolio", originalPrice: 2455, adjustedPrice: 1850 },
  { name: "RapidMiner", originalPrice: 1900, adjustedPrice: 1425 },
  { name: "Infographics", originalPrice: 765, adjustedPrice: 575 },
  { name: "SAS", originalPrice: 2550, adjustedPrice: 1900 },
  { name: "Splunk", originalPrice: 2130, adjustedPrice: 1595 },
  { name: "IBM Watson Analytics", originalPrice: 2930, adjustedPrice: 2195 },
  { name: "Kunstmatige Intelligentie", originalPrice: 1255, adjustedPrice: 950 },
  { name: "Machine Learning", originalPrice: 3865, adjustedPrice: 1800 },
  { name: "Machine Learning Studio (Azure)", originalPrice: 2380, adjustedPrice: 1050 },
  { name: "Machine Learning met DataRobot", originalPrice: 3215, adjustedPrice: 2400 },
  { name: "Azure Machine Learning", originalPrice: 3240, adjustedPrice: 3595 },
  { name: "TensorFlow", originalPrice: 2935, adjustedPrice: 2250 },
  { name: "AI Automation", originalPrice: 3075, adjustedPrice: 1350 },
  { name: "Hyperautomation", originalPrice: 2775, adjustedPrice: 2075 },
  { name: "Milvus (vector database)", originalPrice: 2275, adjustedPrice: 1700 },
  { name: "AWS Essentials", originalPrice: 2820, adjustedPrice: 2125 },
  { name: "AWS Cloud Development Kit (CDK)", originalPrice: 2660, adjustedPrice: 1995 },
  { name: "AWS Monitoring", originalPrice: 1815, adjustedPrice: 1350 },
  { name: "AWS Security", originalPrice: 2655, adjustedPrice: 1995 },
  { name: "Microsoft Azure", originalPrice: 4925, adjustedPrice: 2250 },
  { name: "Azure Kubernetes Service (AKS)", originalPrice: 2735, adjustedPrice: 1200 },
  { name: "Azure SQL Database", originalPrice: 3205, adjustedPrice: 1200 },
  { name: "Azure Data Factory", originalPrice: 2375, adjustedPrice: 1775 },
  { name: "Azure Synapse Analytics", originalPrice: 3110, adjustedPrice: 2325 },
  { name: "Azure DevOps", originalPrice: 2830, adjustedPrice: 2125 },
  { name: "Azure Test Plans", originalPrice: 1960, adjustedPrice: 1475 },
  { name: "Azure Logic Apps", originalPrice: 1305, adjustedPrice: 975 },
  { name: "Azure Monitor", originalPrice: 1420, adjustedPrice: 1075 },
  { name: "Azure Backup", originalPrice: 1325, adjustedPrice: 995 },
  { name: "Azure Arc", originalPrice: 3075, adjustedPrice: 2300 },
  { name: "Azure Security Technologies (AZ-500)", originalPrice: 3485, adjustedPrice: 2625 },
  { name: "Windows Virtual Desktop", originalPrice: 3310, adjustedPrice: 2475 },
  { name: "Microsoft 365 Copilot", originalPrice: 830, adjustedPrice: 625 },
  { name: "Microsoft 365 Security", originalPrice: 1210, adjustedPrice: 900 },
  { name: "Microsoft Sentinel", originalPrice: 2795, adjustedPrice: 2095 },
  { name: "SSIS (SQL Server Integration Services)", originalPrice: 2230, adjustedPrice: 1675 },
  { name: "Microsoft Fabric (end-to-end data platform)", originalPrice: 3120, adjustedPrice: 1875 },
  { name: "Microsoft Fabric met machine learning", originalPrice: 2805, adjustedPrice: 2100 },
  { name: "Microsoft Fabric Data Pipelines", originalPrice: 3175, adjustedPrice: 2375 },
  { name: "SQL", originalPrice: 2095, adjustedPrice: 1050 },
  { name: "Oracle SQL", originalPrice: 1990, adjustedPrice: 1495 },
  { name: "Oracle Apex Professional", originalPrice: 3020, adjustedPrice: 2275 },
  { name: "Oracle BPM Suite", originalPrice: 4645, adjustedPrice: 3475 },
  { name: "Oracle Spatial", originalPrice: 2765, adjustedPrice: 2075 },
  { name: "SQL Server Business Intelligence", originalPrice: 3580, adjustedPrice: 3225 },
  { name: "MongoDB", originalPrice: 1445, adjustedPrice: 3000 },
  { name: "Redis", originalPrice: 1445, adjustedPrice: 1075 },
  { name: "Performance Tuning in Oracle database", originalPrice: 3110, adjustedPrice: 2325 },
  { name: "Docker", originalPrice: 2165, adjustedPrice: 1200 },
  { name: "Docker Enterprise", originalPrice: 2555, adjustedPrice: 1200 },
  { name: "Kubernetes voor platform- en cloud engineers", originalPrice: 3180, adjustedPrice: 1200 },
  { name: "Kubernetes voor developers (CKAD)", originalPrice: 2805, adjustedPrice: 1275 },
  { name: "DevSecOps", originalPrice: 1175, adjustedPrice: 875 },
  { name: "PowerShell", originalPrice: 1035, adjustedPrice: 775 },
  { name: "API Development", originalPrice: 2140, adjustedPrice: 1600 },
  { name: "REST Services", originalPrice: 1360, adjustedPrice: 1025 },
  { name: "GraphQL", originalPrice: 2985, adjustedPrice: 2250 },
];

// Helper function to create slug from course name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/\//g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Category mapping based on course names
function getCategoryForCourse(name: string): string {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('python') || lowerName.includes('programmeren') || lowerName.includes('programming') || lowerName.includes('r programmeren')) {
    return 'Programmeren & Development';
  }
  if (lowerName.includes('data') || lowerName.includes('analytics') || lowerName.includes('bi') || lowerName.includes('qlik') || lowerName.includes('business objects') || lowerName.includes('klipfolio') || lowerName.includes('rapidminer') || lowerName.includes('infographics') || lowerName.includes('sas') || lowerName.includes('splunk')) {
    return 'Data & Data Science';
  }
  if (lowerName.includes('ai') || lowerName.includes('machine learning') || lowerName.includes('deep learning') || lowerName.includes('tensorflow') || lowerName.includes('kunstmatige intelligentie') || lowerName.includes('llm') || lowerName.includes('large language') || lowerName.includes('watson') || lowerName.includes('datarobot') || lowerName.includes('automation')) {
    return 'AI & Machine Learning';
  }
  if (lowerName.includes('aws') || lowerName.includes('azure') || lowerName.includes('microsoft 365') || lowerName.includes('windows virtual desktop') || lowerName.includes('cloud')) {
    return 'Cloud Computing';
  }
  if (lowerName.includes('docker') || lowerName.includes('kubernetes') || lowerName.includes('devops') || lowerName.includes('devsecops') || lowerName.includes('kafka') || lowerName.includes('airflow')) {
    return 'DevOps & Containers';
  }
  if (lowerName.includes('sql') || lowerName.includes('oracle') || lowerName.includes('mongodb') || lowerName.includes('redis') || lowerName.includes('database') || lowerName.includes('ssis') || lowerName.includes('fabric')) {
    return 'Databases';
  }
  if (lowerName.includes('security') || lowerName.includes('sentinel') || lowerName.includes('backup')) {
    return 'Beveiliging';
  }
  if (lowerName.includes('api') || lowerName.includes('rest') || lowerName.includes('graphql') || lowerName.includes('powershell')) {
    return 'APIs & Scripting';
  }

  return 'Overige';
}

// Generate duration based on price (rough estimate)
function getDuration(price: number): string {
  if (price < 800) return '1 dag';
  if (price < 1500) return '2 dagen';
  if (price < 2500) return '3 dagen';
  if (price < 3500) return '4 dagen';
  return '5 dagen';
}

console.log('Course data generated successfully!');
console.log(`Total courses: ${csvData.length}`);
console.log('\nCategories found:');
const categories = [...new Set(csvData.map(c => getCategoryForCourse(c.name)))];
console.log(categories);
