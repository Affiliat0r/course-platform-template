/**
 * Unique course descriptions for all 82 courses
 *
 * This file replaces the generic template in lib/data.ts with specific,
 * SEO-optimized content for each course.
 *
 * Each course has:
 * - description: Full course description (150-250 words)
 * - shortDescription: Brief tagline (10-15 words)
 * - objectives: 4-6 specific learning outcomes
 * - prerequisites: Actual technical requirements
 * - targetAudience: Who should take this course
 * - syllabus: Detailed module breakdown
 */

export interface CourseDescription {
  description: string;
  shortDescription: string;
  objectives: string[];
  prerequisites: string[];
  targetAudience: string[];
  syllabus: {
    title: string;
    topics: string[];
  }[];
}

type CourseDescriptions = Record<string, CourseDescription>;

export const courseDescriptions: CourseDescriptions = {
  // ========================================
  // AI & MACHINE LEARNING COURSES (12)
  // ========================================

  'python-deep-learning': {
    description: 'Duik diep in de wereld van deep learning met Python en bouw geavanceerde neural networks voor beeldherkenning, natuurlijke taalverwerking en voorspellende modellen. Deze intensieve cursus combineert theorie met hands-on praktijk en leert je werken met TensorFlow, Keras en PyTorch. Je leert convolutional neural networks (CNNs) bouwen voor computer vision, recurrent neural networks (RNNs) voor sequentiedata, en transformer architecturen voor state-of-the-art NLP. De cursus behandelt ook praktische aspecten zoals model optimization, hyperparameter tuning, en deployment naar productie. Je werkt aan real-world projecten en leert hoe je deep learning modellen traint op GPU\'s en in de cloud.',
    shortDescription: 'Master deep learning met TensorFlow, Keras en PyTorch voor productie-klare AI',
    objectives: [
      'Bouw en train convolutional neural networks (CNNs) voor beeldherkenning en object detection',
      'Implementeer recurrent neural networks (RNNs) en LSTMs voor time series en NLP',
      'Werk met transformer architecturen en attention mechanisms',
      'Optimaliseer model performance met regularization, dropout en batch normalization',
      'Train modellen op GPU\'s en deploy naar productieomgevingen',
      'Pas transfer learning toe met pre-trained modellen zoals ResNet en BERT'
    ],
    prerequisites: [
      'Solide Python programmeerkennis',
      'Basiskennis machine learning (supervised learning, model evaluation)',
      'Kennis van numpy, pandas en matplotlib',
      'Begrip van lineaire algebra en calculus',
      'Ervaring met Jupyter notebooks aanbevolen'
    ],
    targetAudience: [
      'Data scientists die willen specialiseren in deep learning',
      'Machine learning engineers die neural networks willen bouwen',
      'Software developers die AI willen integreren in applicaties',
      'Researchers die state-of-the-art modellen willen gebruiken'
    ],
    syllabus: [
      {
        title: 'Deep Learning Fundamentals',
        topics: [
          'Neural network architecturen en forward/backward propagation',
          'Activation functions: ReLU, sigmoid, tanh, softmax',
          'Loss functions en optimization algorithms (SGD, Adam, RMSprop)',
          'Overfitting prevention: regularization, dropout, early stopping',
          'TensorFlow en Keras setup en basis operaties'
        ]
      },
      {
        title: 'Computer Vision met CNNs',
        topics: [
          'Convolutional layers, pooling en feature extraction',
          'Populaire architecturen: VGG, ResNet, Inception',
          'Image classification, object detection en segmentation',
          'Data augmentation technieken',
          'Transfer learning met pre-trained modellen'
        ]
      },
      {
        title: 'Sequence Models en NLP',
        topics: [
          'Recurrent Neural Networks (RNNs) en vanishing gradients',
          'Long Short-Term Memory (LSTM) en GRU networks',
          'Word embeddings: Word2Vec, GloVe',
          'Attention mechanisms en transformer architecturen',
          'BERT, GPT en praktische NLP toepassingen'
        ]
      },
      {
        title: 'Advanced Topics en Deployment',
        topics: [
          'Hyperparameter tuning met Keras Tuner',
          'Model interpretability en explainable AI',
          'Training op GPU\'s met CUDA',
          'Model deployment met TensorFlow Serving',
          'MLOps best practices voor deep learning'
        ]
      }
    ]
  },

  'werken-met-large-language-models-in-python': {
    description: 'Leer werken met Large Language Models (LLMs) zoals GPT-4, Claude en open-source alternatieven in Python. Deze praktische cursus leert je hoe je LLMs integreert in applicaties, prompt engineering technieken toepast, en intelligente chatbots en AI-assistenten bouwt. Je leert werken met de OpenAI API, LangChain framework, en vector databases voor semantic search. De cursus behandelt ook fine-tuning van modellen, retrieval-augmented generation (RAG), en kostenbeheer bij het werken met commercial APIs. Perfect voor developers die de kracht van generatieve AI willen benutten in hun projecten.',
    shortDescription: 'Bouw AI-applicaties met GPT-4, LangChain en vector databases',
    objectives: [
      'Integreer OpenAI, Anthropic en open-source LLMs in Python applicaties',
      'Master prompt engineering voor optimale model performance',
      'Bouw chatbots en AI-assistenten met memory en context',
      'Implementeer retrieval-augmented generation (RAG) met vector databases',
      'Fine-tune modellen voor specifieke use cases',
      'Beheer kosten en API rate limits in productie'
    ],
    prerequisites: [
      'Python programmeerkennis (OOP, async/await)',
      'Basiskennis API\'s en REST services',
      'Begrip van NLP concepten is een plus',
      'Geen machine learning expertise vereist'
    ],
    targetAudience: [
      'Software developers die LLMs willen integreren',
      'Product managers die AI-features willen bouwen',
      'Data scientists die willen werken met generatieve AI',
      'Entrepreneurs die AI-startups willen opzetten'
    ],
    syllabus: [
      {
        title: 'LLM Fundamentals en API Integratie',
        topics: [
          'Hoe werken Large Language Models? Architectuur en capabilities',
          'OpenAI API: GPT-4, embeddings en function calling',
          'Anthropic Claude API en open-source alternatieven (Llama 2, Mistral)',
          'Token management en kosten optimalisatie',
          'Best practices voor API error handling en retries'
        ]
      },
      {
        title: 'Prompt Engineering Mastery',
        topics: [
          'Prompt design principles: zero-shot, few-shot, chain-of-thought',
          'System prompts en role-based prompting',
          'Output formatting en structured data extraction',
          'Prompt injection prevention en security',
          'Testing en evaluatie van prompt performance'
        ]
      },
      {
        title: 'LangChain en Advanced Applications',
        topics: [
          'LangChain framework: chains, agents en tools',
          'Memory systems voor conversational AI',
          'Vector databases: Pinecone, Weaviate, ChromaDB',
          'Retrieval-Augmented Generation (RAG) implementaties',
          'Building chatbots met persistent memory'
        ]
      },
      {
        title: 'Fine-Tuning en Production Deployment',
        topics: [
          'Fine-tuning GPT modellen voor custom use cases',
          'Dataset preparation en training best practices',
          'Deployment naar productie met FastAPI',
          'Monitoring, logging en debugging LLM applicaties',
          'Scaling strategies en caching voor cost reduction'
        ]
      }
    ]
  },

  'apache-mahout': {
    description: 'Apache Mahout is een krachtig machine learning framework voor distributed computing op Hadoop en Spark. Deze cursus leert je hoe je schaalbare ML algoritmen implementeert voor clustering, classification en collaborative filtering op big data sets. Je leert werken met Mahout\'s vector-based algorithms, recommendation engines bouwen, en ML pipelines creëren die miljoenen records kunnen verwerken. Perfect voor data engineers en data scientists die machine learning willen toepassen op enterprise-scale datasets.',
    shortDescription: 'Schaalbare machine learning op Hadoop en Spark met Apache Mahout',
    objectives: [
      'Implementeer distributed machine learning algoritmen met Mahout',
      'Bouw recommendation engines voor e-commerce en content platforms',
      'Pas clustering algoritmen toe op grote datasets',
      'Creëer ML pipelines op Hadoop en Spark',
      'Optimaliseer performance van distributed ML jobs'
    ],
    prerequisites: [
      'Java programmeerkennis',
      'Basiskennis Hadoop en MapReduce',
      'Begrip van machine learning concepten',
      'Linux command line ervaring'
    ],
    targetAudience: [
      'Data engineers die ML willen schalen',
      'Big data developers',
      'Data scientists met grote datasets',
      'Platform engineers voor ML infrastructure'
    ],
    syllabus: [
      {
        title: 'Mahout Fundamentals',
        topics: [
          'Mahout architectuur en ecosystem',
          'Vector representation van data',
          'Distributed algorithms op Hadoop/Spark',
          'Setup en configuratie'
        ]
      },
      {
        title: 'Recommendation Engines',
        topics: [
          'Collaborative filtering algoritmen',
          'User-based en item-based recommendations',
          'Matrix factorization',
          'Evaluation metrics voor recommenders'
        ]
      },
      {
        title: 'Clustering en Classification',
        topics: [
          'K-means clustering op big data',
          'Naive Bayes classification',
          'Random forests implementation',
          'Feature engineering at scale'
        ]
      },
      {
        title: 'Production Deployment',
        topics: [
          'ML pipeline orchestration',
          'Performance tuning',
          'Integration met Spark MLlib',
          'Real-time vs batch processing'
        ]
      }
    ]
  },

  'ibm-watson-analytics': {
    description: 'IBM Watson Analytics brengt AI-powered data analytics naar business users zonder coding kennis. Deze cursus leert je hoe je Watson Analytics gebruikt voor automated data preparation, smart visualizations en predictive insights. Je leert patterns ontdekken in data, natural language queries gebruiken, en AI-driven forecasts maken. Perfect voor business analysts en data professionals die snel actionable insights willen genereren zonder complexe scripting.',
    shortDescription: 'AI-powered data analytics en visualisatie met IBM Watson',
    objectives: [
      'Gebruik Watson Analytics voor automated data discovery',
      'Creëer intelligente dashboards en visualisaties',
      'Stel vragen in natuurlijke taal aan je data',
      'Genereer predictive insights en forecasts',
      'Deel interactieve reports met stakeholders'
    ],
    prerequisites: [
      'Basiskennis data analyse',
      'Ervaring met Excel of BI tools',
      'Geen programmeer kennis vereist'
    ],
    targetAudience: [
      'Business analysts',
      'Marketing professionals',
      'Operations managers',
      'Data-driven decision makers'
    ],
    syllabus: [
      {
        title: 'Watson Analytics Basics',
        topics: [
          'Platform overview en interface',
          'Data upload en automated preparation',
          'Natural language query interface',
          'Smart data discovery'
        ]
      },
      {
        title: 'Visualizations en Dashboards',
        topics: [
          'AI-recommended visualizations',
          'Interactive charts en graphs',
          'Dashboard design best practices',
          'Storytelling met data'
        ]
      },
      {
        title: 'Predictive Analytics',
        topics: [
          'Forecasting met Watson',
          'Pattern detection en anomalies',
          'Driver analysis',
          'What-if scenarios'
        ]
      },
      {
        title: 'Collaboration en Sharing',
        topics: [
          'Report sharing en permissions',
          'Scheduled reports',
          'Integration met andere tools',
          'Best practices voor team collaboration'
        ]
      }
    ]
  },

  'kunstmatige-intelligentie': {
    description: 'Een breed overzicht van Kunstmatige Intelligentie voor professionals die AI willen begrijpen en toepassen. Deze introductiecursus behandelt de fundamenten van AI, machine learning, deep learning, natural language processing en computer vision. Je leert hoe AI werkt, welke problemen het kan oplossen, en hoe je AI strategisch inzet in organisaties. Met praktische demos en use cases krijg je inzicht in de mogelijkheden en beperkingen van AI technologieën. Perfect voor managers, consultants en professionals die AI-literacy willen opbouwen.',
    shortDescription: 'Fundamenten van AI, ML en praktische toepassingen voor professionals',
    objectives: [
      'Begrijp hoe machine learning en deep learning werken',
      'Herken AI use cases in verschillende industrieën',
      'Evalueer AI vendors en tools voor je organisatie',
      'Identificeer ethische en juridische AI vraagstukken',
      'Ontwikkel een AI strategie en roadmap'
    ],
    prerequisites: [
      'Geen technische achtergrond vereist',
      'Interesse in technologie en innovatie',
      'Basiskennis IT is een plus'
    ],
    targetAudience: [
      'Business executives en managers',
      'Product owners en project managers',
      'Consultants en adviseurs',
      'Iedereen die AI wil begrijpen zonder te coderen'
    ],
    syllabus: [
      {
        title: 'AI Fundamentals',
        topics: [
          'Geschiedenis en evolutie van AI',
          'Supervised vs unsupervised learning',
          'Neural networks uitgelegd',
          'AI vs machine learning vs deep learning'
        ]
      },
      {
        title: 'Praktische AI Toepassingen',
        topics: [
          'Computer vision en image recognition',
          'Natural language processing en chatbots',
          'Recommendation systems',
          'Predictive analytics en forecasting'
        ]
      },
      {
        title: 'AI Strategy en Implementation',
        topics: [
          'AI use case identification',
          'Build vs buy beslissingen',
          'Data requirements voor AI',
          'ROI berekening voor AI projecten'
        ]
      },
      {
        title: 'Ethics, Governance en Future',
        topics: [
          'AI bias en fairness',
          'Privacy en GDPR compliance',
          'Explainable AI (XAI)',
          'Toekomst van AI en impact op werk'
        ]
      }
    ]
  },

  'machine-learning': {
    description: 'Een complete introductie tot machine learning met focus op praktische implementatie. Deze cursus behandelt supervised learning (regression, classification), unsupervised learning (clustering, dimensionality reduction), en model evaluation. Je leert werken met scikit-learn, pandas en numpy, en bouwt end-to-end ML pipelines van data preparation tot model deployment. De cursus combineert theorie met hands-on labs waar je ML algoritmen toepast op real-world datasets. Perfect voor data professionals die willen starten met machine learning.',
    shortDescription: 'Complete machine learning cursus met Python en scikit-learn',
    objectives: [
      'Implementeer supervised learning algoritmen (linear regression, logistic regression, decision trees)',
      'Pas unsupervised learning toe (k-means clustering, PCA)',
      'Evalueer modellen met cross-validation en metrics',
      'Bouw complete ML pipelines met scikit-learn',
      'Voorkom overfitting met regularization technieken',
      'Deploy modellen naar productie'
    ],
    prerequisites: [
      'Python programmeerkennis',
      'Basiskennis statistiek',
      'Ervaring met numpy en pandas',
      'Calculus en lineaire algebra zijn een plus'
    ],
    targetAudience: [
      'Data analysts die willen starten met ML',
      'Software developers interested in AI',
      'Business intelligence professionals',
      'Studenten met Python achtergrond'
    ],
    syllabus: [
      {
        title: 'ML Fundamentals',
        topics: [
          'Supervised vs unsupervised learning',
          'Training, validation en test sets',
          'Feature engineering en data preprocessing',
          'Scikit-learn API en workflows'
        ]
      },
      {
        title: 'Supervised Learning',
        topics: [
          'Linear en polynomial regression',
          'Logistic regression voor classification',
          'Decision trees en random forests',
          'Support vector machines (SVM)',
          'Model evaluation metrics'
        ]
      },
      {
        title: 'Unsupervised Learning',
        topics: [
          'K-means en hierarchical clustering',
          'Principal Component Analysis (PCA)',
          'Anomaly detection',
          'Association rules mining'
        ]
      },
      {
        title: 'Advanced Topics',
        topics: [
          'Ensemble methods (bagging, boosting)',
          'Hyperparameter tuning met GridSearch',
          'Feature selection techniques',
          'Model deployment en monitoring'
        ]
      }
    ]
  },

  'machine-learning-studio-azure': {
    description: 'Azure Machine Learning Studio biedt een visual, drag-and-drop interface voor het bouwen van ML modellen zonder coding. Deze cursus leert je hoe je ML experimenten ontwerpt, datasets prepareert, en modellen traint met Azure\'s automated ML capabilities. Je leert ook hoe je modellen publiceert als web services en integreert in applicaties. Perfect voor data professionals die snel ML modellen willen bouwen en deployen in de cloud.',
    shortDescription: 'No-code machine learning met Azure ML Studio drag-and-drop interface',
    objectives: [
      'Bouw ML modellen met visual designer',
      'Gebruik Automated ML voor model selection',
      'Publiceer modellen als REST API endpoints',
      'Integreer ML in Azure pipelines',
      'Monitor model performance in productie'
    ],
    prerequisites: [
      'Basiskennis machine learning concepten',
      'Ervaring met Azure portal',
      'Geen programmeerkennis vereist'
    ],
    targetAudience: [
      'Citizen data scientists',
      'Business analysts',
      'Azure cloud professionals',
      'ML beginners'
    ],
    syllabus: [
      {
        title: 'Azure ML Studio Basics',
        topics: [
          'Studio interface en workspace setup',
          'Dataset import en management',
          'Visual designer components',
          'Experiment creation'
        ]
      },
      {
        title: 'Model Building',
        topics: [
          'Drag-and-drop ML pipelines',
          'Data transformation modules',
          'Algorithm selection',
          'Model training en tuning'
        ]
      },
      {
        title: 'Automated ML',
        topics: [
          'AutoML configuration',
          'Algorithm en hyperparameter search',
          'Model interpretability',
          'Best model selection'
        ]
      },
      {
        title: 'Deployment en Integration',
        topics: [
          'Web service deployment',
          'REST API consumption',
          'Azure integration',
          'Monitoring en retraining'
        ]
      }
    ]
  },

  'machine-learning-met-datarobot': {
    description: 'DataRobot is het toonaangevende enterprise AutoML platform dat het ML development proces automatiseert. Deze cursus leert je hoe je DataRobot gebruikt voor automated feature engineering, model selection, hyperparameter tuning en deployment. Je leert hoe DataRobot tientallen algoritmen test, modellen vergelijkt, en production-ready oplossingen genereert in fracties van de tijd van handmatig ML werk. Perfect voor data scientists en analysts die willen schalen met enterprise-grade AutoML.',
    shortDescription: 'Enterprise AutoML met DataRobot voor schaalbare ML development',
    objectives: [
      'Automatiseer feature engineering met DataRobot',
      'Laat DataRobot automatisch modellen trainen en vergelijken',
      'Interpreteer model predictions met explainable AI features',
      'Deploy modellen naar productie met één klik',
      'Monitor model drift en performance degradation',
      'Integreer DataRobot in bestaande workflows'
    ],
    prerequisites: [
      'Basiskennis machine learning',
      'Data analytics ervaring',
      'SQL kennis is een plus',
      'Geen coding vereist'
    ],
    targetAudience: [
      'Enterprise data scientists',
      'Analytics teams',
      'ML engineers die willen versnellen',
      'Business analysts met ML ambities'
    ],
    syllabus: [
      {
        title: 'DataRobot Platform Overview',
        topics: [
          'AutoML architectuur en workflow',
          'Dataset upload en validation',
          'Target variable selection',
          'Platform navigation'
        ]
      },
      {
        title: 'Automated Model Development',
        topics: [
          'Automated feature engineering',
          'Algorithm tournament en leaderboard',
          'Model comparison en selection',
          'Hyperparameter optimization'
        ]
      },
      {
        title: 'Model Insights en Explainability',
        topics: [
          'Feature importance analysis',
          'Prediction explanations',
          'Bias detection',
          'Compliance en documentation'
        ]
      },
      {
        title: 'Deployment en MLOps',
        topics: [
          'One-click deployment',
          'REST API generation',
          'Batch prediction jobs',
          'Model monitoring en retraining automation'
        ]
      }
    ]
  },

  'azure-machine-learning': {
    description: 'Azure Machine Learning is Microsoft\'s enterprise ML platform voor end-to-end model development, training en deployment. Deze intensieve cursus leert je hoe je Azure ML gebruikt voor distributed training op powerful compute clusters, MLOps pipelines bouwt, en modellen schaalt naar productie. Je leert werken met Azure ML SDK, designer, notebooks, en geautomatiseerde ML. De cursus behandelt ook model registratie, versioning, monitoring en responsible AI practices. Perfect voor ML engineers die enterprise-grade ML oplossingen willen bouwen.',
    shortDescription: 'Enterprise ML platform: training, deployment en MLOps met Azure ML',
    objectives: [
      'Bouw ML pipelines met Azure ML SDK en designer',
      'Train modellen op distributed compute clusters',
      'Implementeer MLOps met CI/CD voor modellen',
      'Deploy modellen als managed endpoints',
      'Monitor model performance en detecteer drift',
      'Pas responsible AI principes toe'
    ],
    prerequisites: [
      'Python programmeerkennis',
      'Machine learning fundamentals',
      'Azure ervaring aanbevolen',
      'Kennis van scikit-learn, TensorFlow of PyTorch'
    ],
    targetAudience: [
      'ML engineers',
      'Data scientists die willen schalen',
      'Azure cloud professionals',
      'MLOps engineers'
    ],
    syllabus: [
      {
        title: 'Azure ML Fundamentals',
        topics: [
          'Workspace setup en resource management',
          'Compute targets: clusters, instances',
          'Datastores en datasets',
          'Azure ML SDK v2 en CLI'
        ]
      },
      {
        title: 'Model Development',
        topics: [
          'Jupyter notebooks in Azure ML',
          'Experiment tracking en logging',
          'Distributed training op GPU clusters',
          'Automated ML voor rapid prototyping',
          'Designer voor no-code ML'
        ]
      },
      {
        title: 'MLOps en Deployment',
        topics: [
          'Model registratie en versioning',
          'ML pipelines voor training automation',
          'CI/CD integration met Azure DevOps',
          'Managed endpoints deployment',
          'Batch inference jobs'
        ]
      },
      {
        title: 'Monitoring en Responsible AI',
        topics: [
          'Model monitoring en drift detection',
          'Performance degradation alerts',
          'Fairness assessment',
          'Model interpretability',
          'Compliance en governance'
        ]
      }
    ]
  },

  'tensorflow': {
    description: 'TensorFlow is Google\'s deep learning framework dat de standaard is geworden voor productie ML. Deze cursus leert je TensorFlow 2.x van de grond af, van basis tensor operations tot geavanceerde neural network architecturen. Je leert werken met Keras API, custom layers bouwen, distributed training opzetten, en modellen deployen met TensorFlow Serving. De cursus behandelt ook TensorFlow Extended (TFX) voor production ML pipelines en TensorFlow Lite voor mobile deployment. Perfect voor ML engineers die production-ready deep learning willen bouwen.',
    shortDescription: 'Production deep learning met TensorFlow 2.x, Keras en TFX',
    objectives: [
      'Master TensorFlow 2.x API en eager execution',
      'Bouw neural networks met Keras functional en subclassing API',
      'Implementeer custom layers, losses en training loops',
      'Train modellen op multiple GPUs met distribution strategies',
      'Deploy modellen met TensorFlow Serving',
      'Bouw end-to-end ML pipelines met TFX'
    ],
    prerequisites: [
      'Python programmeerkennis',
      'Basiskennis machine learning en neural networks',
      'Numpy ervaring',
      'Deep learning concepten begrip'
    ],
    targetAudience: [
      'ML engineers',
      'Deep learning practitioners',
      'Research engineers',
      'AI product developers'
    ],
    syllabus: [
      {
        title: 'TensorFlow Fundamentals',
        topics: [
          'Tensors, variables en operations',
          'Automatic differentiation met GradientTape',
          'Keras Sequential en Functional API',
          'Custom layers en models',
          'Training loops en callbacks'
        ]
      },
      {
        title: 'Advanced Neural Networks',
        topics: [
          'Convolutional networks voor computer vision',
          'Recurrent networks voor sequences',
          'Transformer architectuur implementation',
          'Transfer learning met TensorFlow Hub',
          'Multi-input en multi-output modellen'
        ]
      },
      {
        title: 'Distributed Training',
        topics: [
          'Distribution strategies voor multi-GPU training',
          'Mixed precision training',
          'TPU training op Google Cloud',
          'Large model training techniques',
          'Performance optimization'
        ]
      },
      {
        title: 'Production Deployment',
        topics: [
          'Model export en SavedModel format',
          'TensorFlow Serving setup',
          'TensorFlow Lite voor mobile/embedded',
          'TensorFlow.js voor browser deployment',
          'TFX pipelines voor MLOps'
        ]
      }
    ]
  },

  'ai-automation': {
    description: 'AI Automation transformeert business processen met intelligente automatisering. Deze cursus leert je hoe je AI combineert met RPA (Robotic Process Automation) om repetitieve taken te automatiseren, documenten intelligent te verwerken, en beslissingen te automatiseren. Je leert werken met tools zoals UiPath, Blue Prism en Microsoft Power Automate, gecombineerd met AI capabilities voor document understanding, email classification en smart routing. Perfect voor process automation specialisten die AI willen integreren.',
    shortDescription: 'Combineer RPA met AI voor intelligente business process automation',
    objectives: [
      'Ontwerp AI-powered automation workflows',
      'Implementeer intelligent document processing',
      'Automatiseer email classification en routing',
      'Integreer AI APIs in RPA bots',
      'Meet ROI van automation projecten',
      'Schaal automation naar enterprise level'
    ],
    prerequisites: [
      'Basiskennis business processes',
      'Ervaring met RPA tools is een plus',
      'Geen programmeerkennis vereist'
    ],
    targetAudience: [
      'Process automation specialisten',
      'Business analysts',
      'Operations managers',
      'Digital transformation leads'
    ],
    syllabus: [
      {
        title: 'AI Automation Fundamentals',
        topics: [
          'RPA vs AI vs intelligent automation',
          'Use case identification',
          'Platform overview: UiPath, Power Automate',
          'Process discovery en mapping'
        ]
      },
      {
        title: 'Intelligent Document Processing',
        topics: [
          'OCR en document extraction',
          'AI-powered form recognition',
          'Invoice processing automation',
          'Document classification'
        ]
      },
      {
        title: 'NLP en Communication Automation',
        topics: [
          'Email classification en routing',
          'Chatbot integration',
          'Sentiment analysis',
          'Automated response generation'
        ]
      },
      {
        title: 'Enterprise Implementation',
        topics: [
          'Governance en compliance',
          'Exception handling',
          'Monitoring en analytics',
          'Change management en adoption'
        ]
      }
    ]
  },

  'hyperautomation': {
    description: 'Hyperautomation is Gartner\'s top technology trend die AI, ML, RPA en process mining combineert om end-to-end bedrijfsprocessen te automatiseren. Deze strategische cursus leert je hoe je een hyperautomation strategie ontwikkelt, tools selecteert, en enterprise-wide automation implementeert. Je leert werken met het complete automation ecosystem: process mining voor ontdekking, RPA voor uitvoering, AI voor intelligentie, en analytics voor optimalisatie. Perfect voor digital transformation leaders die grootschalige automation willen realiseren.',
    shortDescription: 'Enterprise-wide automation strategie met AI, RPA en process mining',
    objectives: [
      'Ontwikkel een hyperautomation roadmap',
      'Gebruik process mining voor automation opportunities',
      'Integreer RPA, AI en ML in unified workflows',
      'Implementeer digital workers en bot orchestration',
      'Meet business impact met automation analytics',
      'Schaal automation naar organization-wide adoption'
    ],
    prerequisites: [
      'Senior-level business ervaring',
      'Basiskennis RPA en AI concepten',
      'Process management achtergrond',
      'Strategic thinking capabilities'
    ],
    targetAudience: [
      'Chief Digital Officers',
      'Automation CoE leaders',
      'Enterprise architects',
      'Transformation consultants'
    ],
    syllabus: [
      {
        title: 'Hyperautomation Strategy',
        topics: [
          'Hyperautomation maturity model',
          'Technology landscape: RPA, AI, process mining',
          'Build vs buy beslissingen',
          'ROI berekening en business case development'
        ]
      },
      {
        title: 'Process Discovery en Mining',
        topics: [
          'Process mining tools: Celonis, UiPath Process Mining',
          'Bottleneck identification',
          'Automation opportunity assessment',
          'Continuous process improvement'
        ]
      },
      {
        title: 'Intelligent Automation Platforms',
        topics: [
          'Bot orchestration en management',
          'Digital worker design',
          'AI/ML model integration',
          'API economy en integration strategies'
        ]
      },
      {
        title: 'Enterprise Scaling',
        topics: [
          'Center of Excellence (CoE) setup',
          'Governance frameworks',
          'Change management en training',
          'Continuous optimization en innovation'
        ]
      }
    ]
  },

  'microsoft-fabric-met-machine-learning': {
    description: 'Microsoft Fabric met machine learning combineert data engineering, data science en AI in één geïntegreerd platform. Deze cursus leert je hoe je Fabric gebruikt voor end-to-end ML workflows: van data ingestion met Data Factory, feature engineering met Spark, model training met Azure ML integration, tot deployment en monitoring. Je leert werken met Fabric notebooks, AutoML, en MLflow voor experiment tracking. Perfect voor data professionals die het complete ML ecosysteem willen beheersen binnen Fabric.',
    shortDescription: 'End-to-end ML workflows in Microsoft Fabric analytics platform',
    objectives: [
      'Bouw data pipelines voor ML met Fabric Data Factory',
      'Gebruik Spark notebooks voor feature engineering',
      'Train modellen met Fabric geïntegreerde ML capabilities',
      'Track experimenten met MLflow in Fabric',
      'Deploy modellen als Fabric endpoints',
      'Orkestreer ML workflows met Fabric pipelines'
    ],
    prerequisites: [
      'Python en SQL kennis',
      'Basiskennis machine learning',
      'Ervaring met Azure of Power BI is een plus',
      'Databricks of Spark ervaring aanbevolen'
    ],
    targetAudience: [
      'Data engineers',
      'Data scientists',
      'Analytics professionals',
      'Azure ML gebruikers die naar Fabric migreren'
    ],
    syllabus: [
      {
        title: 'Fabric ML Fundamentals',
        topics: [
          'Microsoft Fabric architectuur overview',
          'Workspace en lakehouse setup',
          'OneLake data storage',
          'Fabric notebooks en Spark clusters'
        ]
      },
      {
        title: 'Data Preparation voor ML',
        topics: [
          'Data ingestion met Data Factory',
          'Feature engineering met PySpark',
          'Data transformation pipelines',
          'Delta Lake voor ML datasets'
        ]
      },
      {
        title: 'Model Development',
        topics: [
          'Scikit-learn, TensorFlow, PyTorch in Fabric',
          'MLflow experiment tracking',
          'Hyperparameter tuning',
          'Model versioning'
        ]
      },
      {
        title: 'MLOps in Fabric',
        topics: [
          'Model deployment als endpoints',
          'CI/CD voor ML met Fabric',
          'Model monitoring',
          'Integration met Power BI voor visualization'
        ]
      }
    ]
  },

  // ========================================
  // CLOUD COMPUTING COURSES (10)
  // ========================================

  'aws-essentials': {
    description: 'AWS Essentials biedt een complete introductie tot Amazon Web Services, \'s werelds meest gebruikte cloud platform. Deze cursus behandelt de belangrijkste AWS services: EC2 voor compute, S3 voor storage, RDS voor databases, VPC voor networking, en IAM voor security. Je leert cloud architectuur principes, cost optimization, en best practices voor beveiliging en high availability. Met hands-on labs bouw je complete cloud oplossingen van scratch. Perfect voor IT professionals die willen starten met AWS of voor certificering (AWS Cloud Practitioner, Solutions Architect Associate).',
    shortDescription: 'Complete AWS fundamentals: EC2, S3, RDS, VPC en IAM voor cloud professionals',
    objectives: [
      'Begrijp AWS global infrastructure: regions, availability zones, edge locations',
      'Lanceer en beheer EC2 instances met auto-scaling en load balancing',
      'Gebruik S3 voor object storage en CloudFront voor content delivery',
      'Configureer VPC networking met subnets, security groups en NACLs',
      'Implementeer IAM voor secure access management',
      'Optimaliseer kosten met Reserved Instances en Savings Plans'
    ],
    prerequisites: [
      'Basiskennis IT infrastructure',
      'Linux/Windows server ervaring',
      'Netwerk fundamentals (TCP/IP, DNS)',
      'Geen cloud ervaring vereist'
    ],
    targetAudience: [
      'System administrators die naar cloud migreren',
      'Developers die AWS willen leren',
      'IT managers die cloud strategie ontwikkelen',
      'Kandidaten voor AWS certificering'
    ],
    syllabus: [
      {
        title: 'AWS Fundamentals en Compute',
        topics: [
          'AWS global infrastructure en service overview',
          'EC2 instance types, pricing en lifecycle',
          'Elastic Load Balancing en Auto Scaling',
          'Lambda voor serverless computing',
          'Hands-on: Deploy scalable web application'
        ]
      },
      {
        title: 'Storage en Databases',
        topics: [
          'S3 storage classes, versioning en lifecycle policies',
          'EBS volumes en snapshots',
          'RDS voor relational databases (MySQL, PostgreSQL)',
          'DynamoDB voor NoSQL workloads',
          'Hands-on: Multi-tier storage architectuur'
        ]
      },
      {
        title: 'Networking en Security',
        topics: [
          'VPC design: subnets, route tables, internet/NAT gateways',
          'Security groups vs Network ACLs',
          'IAM users, groups, roles en policies',
          'CloudWatch monitoring en CloudTrail auditing',
          'Hands-on: Secure VPC met public/private subnets'
        ]
      },
      {
        title: 'Best Practices en Optimization',
        topics: [
          'Well-Architected Framework: 6 pillars',
          'Cost optimization strategies',
          'High availability en disaster recovery',
          'Infrastructure as Code met CloudFormation',
          'Certificering voorbereiding tips'
        ]
      }
    ]
  },

  'aws-cloud-development-kit-cdk': {
    description: 'AWS Cloud Development Kit (CDK) revolutioneert infrastructure as code door je CloudFormation templates te laten schrijven in Python, TypeScript of Java. Deze cursus leert je hoe je CDK gebruikt om AWS infrastructuur te definiëren met moderne programmeertalen, complete met abstractions, reusable constructs en type safety. Je leert CDK apps bouwen, stacks beheren, en best practices voor multi-environment deployments. Perfect voor developers die infrastructure as code willen benaderen met de kracht van algemene programmeertalen.',
    shortDescription: 'Infrastructure as Code met AWS CDK in Python, TypeScript of Java',
    objectives: [
      'Bouw AWS infrastructuur met CDK in TypeScript of Python',
      'Gebruik CDK constructs voor high-level abstractions',
      'Maak reusable CDK patterns en libraries',
      'Implementeer multi-environment deployments (dev, staging, prod)',
      'Integreer CDK in CI/CD pipelines',
      'Debug en test CDK applicaties'
    ],
    prerequisites: [
      'Python of TypeScript/JavaScript kennis',
      'AWS fundamentals (EC2, S3, Lambda, VPC)',
      'Basiskennis CloudFormation is een plus',
      'Git en command line ervaring'
    ],
    targetAudience: [
      'Cloud developers',
      'DevOps engineers',
      'Infrastructure engineers die willen coderen',
      'Teams die van CloudFormation YAML willen migreren'
    ],
    syllabus: [
      {
        title: 'CDK Fundamentals',
        topics: [
          'CDK architectuur: apps, stacks, constructs',
          'CDK vs CloudFormation vs Terraform',
          'Development environment setup',
          'CDK CLI: synth, diff, deploy',
          'Eerste CDK app: S3 bucket en Lambda'
        ]
      },
      {
        title: 'Constructs en Patterns',
        topics: [
          'L1, L2, L3 constructs uitgelegd',
          'Commonly used patterns: API Gateway + Lambda, ECS Fargate',
          'Custom constructs bouwen',
          'CDK Patterns library',
          'Hands-on: Serverless API met CDK'
        ]
      },
      {
        title: 'Advanced CDK Development',
        topics: [
          'Context en environment configuration',
          'Cross-stack references',
          'Asset handling: Lambda code, Docker images',
          'CDK Pipelines voor self-mutating CI/CD',
          'Testing CDK code met Jest/pytest'
        ]
      },
      {
        title: 'Best Practices en Production',
        topics: [
          'Multi-environment strategy',
          'Secrets management',
          'Tagging en cost allocation',
          'CDK diff en changeset review',
          'Troubleshooting en rollback strategies'
        ]
      }
    ]
  },

  'aws-monitoring': {
    description: 'AWS Monitoring leert je hoe je complete observability bouwt voor AWS workloads met CloudWatch, X-Ray en third-party tools. Deze cursus behandelt metrics collection, log aggregation, distributed tracing, alarming en automated incident response. Je leert dashboards bouwen, anomaly detection configureren, en proactive monitoring implementeren. Perfect voor DevOps engineers en SREs die production AWS omgevingen moeten monitoren.',
    shortDescription: 'Complete observability voor AWS met CloudWatch, X-Ray en dashboards',
    objectives: [
      'Verzamel custom metrics van applicaties en infrastructuur',
      'Aggregeer logs van EC2, Lambda, containers met CloudWatch Logs',
      'Trace requests door microservices met X-Ray',
      'Configureer CloudWatch Alarms met SNS notifications',
      'Bouw operationele dashboards voor 24/7 monitoring',
      'Automatiseer incident response met EventBridge en Lambda'
    ],
    prerequisites: [
      'AWS fundamentals (EC2, Lambda, VPC)',
      'Basiskennis Linux en networking',
      'Ervaring met applicatie deployment',
      'Python of Bash scripting is een plus'
    ],
    targetAudience: [
      'DevOps engineers',
      'Site Reliability Engineers (SREs)',
      'Cloud operations teams',
      'System administrators in AWS'
    ],
    syllabus: [
      {
        title: 'CloudWatch Fundamentals',
        topics: [
          'CloudWatch metrics: standard en custom',
          'CloudWatch agent installation en configuratie',
          'Metric math en statistics',
          'Dashboards bouwen',
          'Hands-on: Monitor EC2 fleet'
        ]
      },
      {
        title: 'Logging en Analysis',
        topics: [
          'CloudWatch Logs: ingestion en retention',
          'Log groups, streams en filters',
          'CloudWatch Logs Insights queries',
          'Lambda logs en container logging',
          'Hands-on: Centralized logging voor microservices'
        ]
      },
      {
        title: 'Distributed Tracing met X-Ray',
        topics: [
          'X-Ray daemon setup',
          'Application instrumentation',
          'Service map en trace analysis',
          'Performance bottleneck detection',
          'Integration met Lambda en ECS'
        ]
      },
      {
        title: 'Alerting en Automation',
        topics: [
          'CloudWatch Alarms en composite alarms',
          'SNS notifications en PagerDuty integration',
          'EventBridge rules voor event-driven automation',
          'Anomaly detection met CloudWatch',
          'Hands-on: Automated incident response'
        ]
      }
    ]
  },

  'microsoft-azure': {
    description: 'Microsoft Azure is \'s werelds tweede grootste cloud platform met enterprise-ready services voor compute, storage, AI en meer. Deze complete cursus leert je Azure van de grond af: van Virtual Machines en Storage Accounts tot Azure Functions, App Service, SQL Database en Active Directory. Je leert Azure architectuur principes, Resource Manager templates, en best practices voor security en governance. Met hands-on labs bouw je schaalbare cloud oplossingen. Perfect voor IT professionals die Azure willen leren of voorbereiden op AZ-900/AZ-104 certificering.',
    shortDescription: 'Complete Azure fundamentals: VMs, Storage, App Service, SQL en Active Directory',
    objectives: [
      'Begrijp Azure global infrastructure en service model',
      'Deploy Virtual Machines met availability sets en scale sets',
      'Gebruik Azure Storage: Blob, File, Queue, Table',
      'Bouw web apps met App Service en Azure Functions',
      'Configureer Azure SQL Database en Cosmos DB',
      'Implementeer Azure Active Directory en RBAC'
    ],
    prerequisites: [
      'IT fundamentals en server kennis',
      'Windows en Linux basics',
      'Netwerk kennis (TCP/IP, DNS, VPN)',
      'Geen cloud ervaring vereist'
    ],
    targetAudience: [
      'IT professionals die naar Azure migreren',
      'System administrators',
      'Developers die cloud willen leren',
      'Kandidaten voor Azure certificering (AZ-900, AZ-104)'
    ],
    syllabus: [
      {
        title: 'Azure Fundamentals',
        topics: [
          'Azure portal, CLI en PowerShell',
          'Resource Groups en subscriptions',
          'Azure Resource Manager (ARM) templates',
          'Regions en availability zones',
          'Cost management en budgets'
        ]
      },
      {
        title: 'Compute Services',
        topics: [
          'Virtual Machines: sizes, disks, extensions',
          'Availability sets en Virtual Machine Scale Sets',
          'App Service voor web apps',
          'Azure Functions serverless computing',
          'Container Instances en Kubernetes Service intro'
        ]
      },
      {
        title: 'Storage en Databases',
        topics: [
          'Storage Accounts: Blob, File, Queue, Table',
          'Managed Disks en snapshots',
          'Azure SQL Database en SQL Managed Instance',
          'Cosmos DB voor globally distributed NoSQL',
          'Backup en disaster recovery'
        ]
      },
      {
        title: 'Networking en Security',
        topics: [
          'Virtual Networks en subnets',
          'Network Security Groups en firewalls',
          'Azure Active Directory fundamentals',
          'Role-Based Access Control (RBAC)',
          'Azure Monitor en Log Analytics basics'
        ]
      }
    ]
  },

  'azure-logic-apps': {
    description: 'Azure Logic Apps is een low-code integration platform voor het automatiseren van workflows en integreren van apps, data en services. Deze cursus leert je hoe je Logic Apps gebruikt om business processen te automatiseren zonder code, met 400+ connectoren voor SaaS applicaties, on-premises systemen en APIs. Je leert triggers, actions, conditions en loops gebruiken, error handling implementeren, en enterprise integration patterns toepassen. Perfect voor IT professionals en citizen developers die integratie willen automatiseren.',
    shortDescription: 'Low-code workflow automation en integratie met Azure Logic Apps',
    objectives: [
      'Bouw geautomatiseerde workflows met visual designer',
      'Integreer 400+ services: Office 365, Salesforce, SAP, SQL',
      'Implementeer conditional logic en loops',
      'Gebruik custom connectors voor proprietary APIs',
      'Monitor en debug Logic App runs',
      'Deploy Logic Apps met ARM templates'
    ],
    prerequisites: [
      'Basiskennis Azure portal',
      'Begrip van APIs en webhooks',
      'Ervaring met business processes',
      'Geen programmeerkennis vereist'
    ],
    targetAudience: [
      'Integration specialists',
      'Business analysts',
      'Citizen developers',
      'IT professionals die willen automatiseren'
    ],
    syllabus: [
      {
        title: 'Logic Apps Fundamentals',
        topics: [
          'Logic Apps architectuur en pricing',
          'Triggers vs actions',
          'Built-in vs managed connectors',
          'Eerste Logic App: Email naar SharePoint',
          'Testing en debugging'
        ]
      },
      {
        title: 'Advanced Workflows',
        topics: [
          'Conditions, switches en loops',
          'Parallel branches en scopes',
          'Variables en compose actions',
          'JSON manipulation',
          'Error handling en retry policies'
        ]
      },
      {
        title: 'Enterprise Integration',
        topics: [
          'Custom connectors bouwen',
          'Integration Accounts voor B2B',
          'Batch processing',
          'Secure on-premises data gateway',
          'API Management integration'
        ]
      },
      {
        title: 'Deployment en Operations',
        topics: [
          'ARM templates voor Logic Apps',
          'Parameters en environment configuration',
          'Monitoring met Azure Monitor',
          'Run history en diagnostics',
          'Best practices voor production'
        ]
      }
    ]
  },

  'azure-monitor': {
    description: 'Azure Monitor is het centrale observability platform voor Azure en hybrid infrastructuur. Deze cursus leert je hoe je complete monitoring oplossingen bouwt met metrics, logs, alerts en workbooks. Je leert Application Insights gebruiken voor APM, Log Analytics voor log queries, en Azure Monitor Metrics voor time-series data. Perfect voor operations teams die proactive monitoring willen implementeren.',
    shortDescription: 'Complete Azure observability met Monitor, Log Analytics en Application Insights',
    objectives: [
      'Verzamel metrics en logs van Azure resources',
      'Schrijf KQL queries in Log Analytics',
      'Monitor applicatie performance met Application Insights',
      'Configureer action groups en alert rules',
      'Bouw Azure Monitor Workbooks voor dashboards',
      'Implementeer distributed tracing voor microservices'
    ],
    prerequisites: [
      'Azure fundamentals',
      'Basiskennis networking en applicaties',
      'Ervaring met applicatie deployment',
      'Query talen kennis is een plus'
    ],
    targetAudience: [
      'Cloud operations engineers',
      'DevOps professionals',
      'Site Reliability Engineers',
      'Azure administrators'
    ],
    syllabus: [
      {
        title: 'Azure Monitor Fundamentals',
        topics: [
          'Azure Monitor architectuur overview',
          'Metrics vs logs vs traces',
          'Data sources en agents',
          'Azure Monitor workspace setup',
          'Hands-on: Monitor VM en web app'
        ]
      },
      {
        title: 'Log Analytics en KQL',
        topics: [
          'Log Analytics workspace design',
          'Kusto Query Language (KQL) fundamentals',
          'Advanced queries: joins, aggregations, time-series',
          'Saved queries en query packs',
          'Hands-on: Troubleshooting met logs'
        ]
      },
      {
        title: 'Application Insights',
        topics: [
          'Application Insights instrumentation',
          'Dependency tracking en application map',
          'Performance profiling',
          'Availability tests',
          'Custom telemetry'
        ]
      },
      {
        title: 'Alerting en Visualization',
        topics: [
          'Metric en log alert rules',
          'Action groups: email, SMS, webhooks',
          'Azure Monitor Workbooks',
          'Grafana integration',
          'Hands-on: Complete monitoring solution'
        ]
      }
    ]
  },

  'azure-backup': {
    description: 'Azure Backup biedt enterprise backup-as-a-service voor Azure VMs, on-premises servers, SQL databases en meer. Deze cursus leert je hoe je Azure Backup configureert voor verschillende workloads, recovery strategies implementeert, en backup policies beheert. Je leert ook Azure Site Recovery voor disaster recovery. Perfect voor IT professionals verantwoordelijk voor data protection en business continuity.',
    shortDescription: 'Enterprise backup en disaster recovery met Azure Backup en Site Recovery',
    objectives: [
      'Configureer Azure Backup voor VMs, files en databases',
      'Implementeer backup policies en retention schedules',
      'Restore VMs, files en applicatie data',
      'Setup Azure Site Recovery voor DR',
      'Monitor backup health en compliance',
      'Optimaliseer backup kosten'
    ],
    prerequisites: [
      'Azure fundamentals',
      'Windows/Linux server kennis',
      'Begrip van backup concepten',
      'Database basics (SQL) is een plus'
    ],
    targetAudience: [
      'Backup administrators',
      'IT operations teams',
      'Cloud architects',
      'Compliance officers'
    ],
    syllabus: [
      {
        title: 'Azure Backup Fundamentals',
        topics: [
          'Azure Backup architectuur',
          'Recovery Services Vault setup',
          'Backup storage en replication',
          'Backup vs snapshot vs archive',
          'Hands-on: First VM backup'
        ]
      },
      {
        title: 'Workload Protection',
        topics: [
          'Azure VM backup en restore',
          'Azure Files share backup',
          'SQL Server in Azure VM backup',
          'On-premises backup met MARS agent',
          'Backup policies en scheduling'
        ]
      },
      {
        title: 'Disaster Recovery',
        topics: [
          'Azure Site Recovery overview',
          'VM replication setup',
          'Failover en failback procedures',
          'DR testing zonder impact',
          'Recovery plans en automation'
        ]
      },
      {
        title: 'Operations en Optimization',
        topics: [
          'Backup monitoring en reporting',
          'Retention policy optimization',
          'Cost management',
          'Security en RBAC',
          'Compliance en auditing'
        ]
      }
    ]
  },

  'azure-arc': {
    description: 'Azure Arc brengt Azure management en services naar any infrastructure: on-premises, multi-cloud en edge. Deze geavanceerde cursus leert je hoe je servers, Kubernetes clusters en data services onboards naar Azure Arc, centralized governance implementeert, en Azure services deployed op non-Azure infrastructuur. Je leert werken met Azure Arc-enabled servers, Arc-enabled Kubernetes, en Arc-enabled data services. Perfect voor hybrid cloud architecten en platform engineers.',
    shortDescription: 'Hybrid en multi-cloud management met Azure Arc voor servers en Kubernetes',
    objectives: [
      'Onboard on-premises en multi-cloud servers naar Azure Arc',
      'Manage Kubernetes clusters anywhere met Arc-enabled Kubernetes',
      'Deploy Azure data services on-premises met Arc',
      'Implementeer Azure Policy en RBAC across hybrid infrastructure',
      'Use Azure Monitor en Security Center voor Arc resources',
      'Automate deployments met GitOps'
    ],
    prerequisites: [
      'Azure fundamentals en ARM templates',
      'Kubernetes kennis voor Arc-enabled K8s',
      'Linux en Windows server ervaring',
      'PowerShell of Azure CLI kennis'
    ],
    targetAudience: [
      'Cloud architects',
      'Hybrid infrastructure engineers',
      'Platform engineers',
      'Multi-cloud specialists'
    ],
    syllabus: [
      {
        title: 'Azure Arc Fundamentals',
        topics: [
          'Azure Arc architectuur en use cases',
          'Arc-enabled servers overview',
          'Connected Machine agent deployment',
          'Resource organization met tags',
          'Hands-on: Onboard Linux en Windows servers'
        ]
      },
      {
        title: 'Arc-enabled Kubernetes',
        topics: [
          'Connect K8s clusters naar Azure Arc',
          'GitOps met Flux v2',
          'Azure Policy for Kubernetes',
          'Azure Monitor voor Arc K8s',
          'Hands-on: Multi-cluster management'
        ]
      },
      {
        title: 'Arc-enabled Data Services',
        topics: [
          'SQL Managed Instance op Arc',
          'PostgreSQL Hyperscale op Arc',
          'Data controller deployment',
          'Billing en licensing',
          'Backup en high availability'
        ]
      },
      {
        title: 'Governance en Automation',
        topics: [
          'Azure Policy at scale',
          'RBAC voor hybrid resources',
          'Azure Automation hybrid workers',
          'Update management',
          'Hands-on: Complete hybrid governance'
        ]
      }
    ]
  },

  'windows-virtual-desktop': {
    description: 'Azure Virtual Desktop (voorheen Windows Virtual Desktop) is Microsoft\'s Desktop-as-a-Service oplossing voor secure remote work. Deze cursus leert je hoe je AVD ontwerpt, implementeert en beheert: van host pools en session hosts tot FSLogix profiles, multi-session Windows 11, en optimalisatie. Je leert security best practices, cost optimization, en troubleshooting. Perfect voor IT professionals die moderne remote work infrastructuur willen bouwen.',
    shortDescription: 'Desktop-as-a-Service met Azure Virtual Desktop en FSLogix',
    objectives: [
      'Ontwerp Azure Virtual Desktop architectuur',
      'Deploy host pools met Windows 11 multi-session',
      'Configureer FSLogix profile containers',
      'Implement Conditional Access en MFA',
      'Optimize performance en user experience',
      'Monitor en troubleshoot AVD omgevingen'
    ],
    prerequisites: [
      'Azure fundamentals',
      'Windows Server en client kennis',
      'Active Directory basics',
      'Networking fundamentals'
    ],
    targetAudience: [
      'Desktop administrators',
      'Cloud infrastructure engineers',
      'IT professionals die remote work enablen',
      'Consultants voor digital workplace'
    ],
    syllabus: [
      {
        title: 'AVD Architecture en Planning',
        topics: [
          'AVD components: host pools, workspaces, application groups',
          'Personal vs pooled desktops',
          'Sizing en capacity planning',
          'Identity: Azure AD vs AD DS',
          'Hands-on: Deploy first AVD host pool'
        ]
      },
      {
        title: 'Image Management',
        topics: [
          'Custom image creation met Azure Image Builder',
          'Golden image best practices',
          'Microsoft 365 Apps optimization voor multi-session',
          'Image versioning en updates',
          'Hands-on: Build optimized Windows 11 image'
        ]
      },
      {
        title: 'User Profiles en Data',
        topics: [
          'FSLogix profile containers',
          'OneDrive en Teams optimization',
          'MSIX app attach',
          'Printer redirection',
          'Hands-on: FSLogix configuration'
        ]
      },
      {
        title: 'Security, Monitoring en Optimization',
        topics: [
          'Conditional Access policies',
          'Azure Firewall en network security',
          'AVD Insights monitoring',
          'Autoscaling host pools',
          'Cost optimization strategies'
        ]
      }
    ]
  },

  'microsoft-365-copilot': {
    description: 'Microsoft 365 Copilot brengt generatieve AI naar de Microsoft 365 suite (Word, Excel, PowerPoint, Outlook, Teams). Deze hands-on cursus leert je hoe je Copilot effectief gebruikt voor productiviteitswinst: documenten genereren, data analyseren, presentaties maken, emails schrijven, en meetings samenvatten. Je leert prompt engineering voor Copilot, privacy en security aspecten, en best practices voor adoption. Perfect voor knowledge workers, managers en IT professionals die AI-powered productivity willen maximaliseren.',
    shortDescription: 'Generatieve AI in Microsoft 365: Word, Excel, PowerPoint, Teams met Copilot',
    objectives: [
      'Master Copilot in Word voor document creatie en editing',
      'Gebruik Copilot in Excel voor data analyse en formulas',
      'Genereer presentaties met Copilot in PowerPoint',
      'Schrijf effectieve emails en samenvattingen in Outlook',
      'Gebruik Copilot in Teams voor meeting recaps',
      'Begrijp privacy, security en compliance aspecten'
    ],
    prerequisites: [
      'Ervaring met Microsoft 365 apps',
      'Basiskennis AI concepten is een plus',
      'Geen technische achtergrond vereist',
      'Microsoft 365 Copilot licentie'
    ],
    targetAudience: [
      'Knowledge workers en office professionals',
      'Managers en executives',
      'IT administrators die Copilot uitrollen',
      'Anyone die productiever wil werken'
    ],
    syllabus: [
      {
        title: 'Copilot Fundamentals',
        topics: [
          'Hoe werkt Copilot? Large Language Models uitgelegd',
          'Copilot in de Microsoft 365 ecosysteem',
          'Prompt engineering basics',
          'Privacy en data security',
          'Hands-on: First Copilot interactions'
        ]
      },
      {
        title: 'Copilot in Core Apps',
        topics: [
          'Word: Documenten schrijven, samenvatten, herschrijven',
          'Excel: Data analyse, formulas, visualisaties genereren',
          'PowerPoint: Presentaties maken from prompts',
          'Outlook: Email drafts en meeting summaries',
          'Hands-on labs voor elke applicatie'
        ]
      },
      {
        title: 'Copilot in Teams en Collaboration',
        topics: [
          'Meeting recaps en action items',
          'Chat summarization',
          'Copilot in Teams chats',
          'Integration met Planner en To Do',
          'Hands-on: Collaborative workflows'
        ]
      },
      {
        title: 'Advanced Usage en Adoption',
        topics: [
          'Effective prompts: specificity, context, iteration',
          'Use cases per department (Sales, HR, Finance)',
          'Limitations en wat Copilot niet kan',
          'Governance en compliance',
          'Change management voor Copilot rollout'
        ]
      }
    ]
  },

  // ========================================
  // DATA & DATA SCIENCE COURSES (21)
  // ========================================

  'data-analyse': {
    description: 'Data Analyse leert je hoe je data transformeert naar actionable insights voor betere business beslissingen. Deze praktische cursus behandelt het complete data analyse proces: van data verzameling en cleaning tot visualisatie en rapportage. Je leert werken met Excel Power Query, SQL, en introducties tot Python/R voor data analyse. De cursus combineert statistische concepten met praktische tools en leert je data storytelling. Perfect voor professionals die data-driven willen werken zonder complexe programming.',
    shortDescription: 'Transform data naar insights met Excel, SQL en visualisatie technieken',
    objectives: [
      'Verzamel en clean data uit diverse bronnen',
      'Voer exploratory data analysis (EDA) uit',
      'Creëer effectieve visualisaties en dashboards',
      'Pas statistische technieken toe voor analyse',
      'Communiceer insights naar stakeholders',
      'Gebruik Excel Power Query en Power Pivot'
    ],
    prerequisites: [
      'Sterke Excel vaardigheden',
      'Basiskennis statistiek',
      'Analytisch denkvermogen',
      'Geen programmeerkennis vereist'
    ],
    targetAudience: [
      'Business analysts',
      'Marketing professionals',
      'Financial analysts',
      'Operations managers'
    ],
    syllabus: [
      {
        title: 'Data Fundamentals',
        topics: [
          'Data types en structuren',
          'Data quality en cleaning technieken',
          'Descriptive statistics',
          'Data sampling methods'
        ]
      },
      {
        title: 'Data Analysis Tools',
        topics: [
          'Excel Power Query voor data transformatie',
          'SQL basics voor data retrieval',
          'Power Pivot en DAX formulas',
          'Introduction to Python/R'
        ]
      },
      {
        title: 'Visualization en Reporting',
        topics: [
          'Chart types en best practices',
          'Dashboard design principes',
          'Interactive visualizations',
          'Data storytelling techniques'
        ]
      },
      {
        title: 'Applied Analytics',
        topics: [
          'Trend analysis',
          'Customer segmentation',
          'A/B testing',
          'ROI berekening'
        ]
      }
    ]
  },

  'python-voor-data-science': {
    description: 'Python voor Data Science is een intensieve hands-on cursus die je leert werken met Python\'s data science ecosystem: NumPy, pandas, matplotlib, seaborn en scikit-learn. Je leert data manipulation, exploratory analysis, visualisatie en introductie machine learning. De cursus behandelt ook Jupyter notebooks, data cleaning technieken, en werken met APIs. Met praktische projecten op real-world datasets bouw je een complete data science skillset. Perfect voor analisten die willen upgraden naar Python-based workflows.',
    shortDescription: 'Complete Python data science: NumPy, pandas, visualization en ML basics',
    objectives: [
      'Master pandas voor data manipulation en analysis',
      'Gebruik NumPy voor numerieke computing',
      'Creëer visualisaties met matplotlib en seaborn',
      'Pas scikit-learn toe voor intro machine learning',
      'Work met Jupyter notebooks en version control',
      'Integreer met APIs en databases'
    ],
    prerequisites: [
      'Basiskennis Python programmeren',
      'Statistiek fundamentals',
      'Ervaring met data analyse',
      'SQL kennis is een plus'
    ],
    targetAudience: [
      'Data analysts die willen coderen',
      'Business intelligence professionals',
      'Excel power users',
      'Aspiring data scientists'
    ],
    syllabus: [
      {
        title: 'Python Fundamentals voor Data Science',
        topics: [
          'Python basics recap',
          'Jupyter notebooks en IPython',
          'NumPy arrays en vectorized operations',
          'Data structures: lists, dicts, sets'
        ]
      },
      {
        title: 'Data Manipulation met pandas',
        topics: [
          'DataFrames en Series',
          'Data loading: CSV, Excel, SQL, APIs',
          'Data cleaning en preprocessing',
          'Groupby, pivot tables, merging',
          'Time series analysis'
        ]
      },
      {
        title: 'Data Visualization',
        topics: [
          'Matplotlib fundamentals',
          'Seaborn statistical plots',
          'Interactive visualizations met Plotly',
          'Dashboard creation'
        ]
      },
      {
        title: 'Introduction to Machine Learning',
        topics: [
          'Scikit-learn basics',
          'Supervised learning: regression, classification',
          'Model evaluation',
          'Feature engineering'
        ]
      }
    ]
  },

  'data-science-management': {
    description: 'Data Science Management leert leiders hoe ze data science teams en projecten succesvol managen. Deze strategische cursus behandelt team structuren, hiring data talent, project scoping, en het overbruggen van de gap tussen data science en business. Je leert hoe je ROI meet, stakeholders managet, en data science integreert in organisatie processen. Perfect voor managers, product owners en executives die data science teams leiden of willen opzetten.',
    shortDescription: 'Lead data science teams en projecten met strategisch management',
    objectives: [
      'Bouw en manage effectieve data science teams',
      'Scope en prioriteer data science projecten',
      'Vertaal business problemen naar data science oplossingen',
      'Meet ROI en business impact van DS projecten',
      'Bridge communication tussen data scientists en business',
      'Implement ML operations en governance'
    ],
    prerequisites: [
      'Management ervaring',
      'Basiskennis data science concepten',
      'Business acumen',
      'Geen technische expertise vereist'
    ],
    targetAudience: [
      'Data science managers',
      'Product managers',
      'CTOs en technical executives',
      'Consultants'
    ],
    syllabus: [
      {
        title: 'Data Science Team Building',
        topics: [
          'Roles: data scientists, ML engineers, data engineers',
          'Hiring en interviewing data talent',
          'Team structure models',
          'Skill gap analysis'
        ]
      },
      {
        title: 'Project Management',
        topics: [
          'Data science project lifecycle',
          'Scoping en feasibility assessment',
          'Agile for data science',
          'Managing experimentation and failure'
        ]
      },
      {
        title: 'Business Integration',
        topics: [
          'Translating business to DS problems',
          'Stakeholder management',
          'ROI calculation frameworks',
          'Productionizing models'
        ]
      },
      {
        title: 'Operations en Governance',
        topics: [
          'MLOps en model lifecycle',
          'Data governance en ethics',
          'Tool selection and vendor management',
          'Scaling data science in organizations'
        ]
      }
    ]
  },

  'data-strategie': {
    description: 'Data Strategie leert executives hoe ze een complete data strategie ontwikkelen en implementeren. Deze strategische cursus behandelt data governance, data architecture, analytics roadmaps, en het bouwen van data-driven cultuur. Je leert hoe je data als strategic asset benut, modern data stacks selecteert, en organisaties transformeert. Perfect voor C-level executives, CIOs en senior managers verantwoordelijk voor digitale transformatie.',
    shortDescription: 'Ontwikkel enterprise data strategie en drive digital transformation',
    objectives: [
      'Ontwikkel een comprehensive data strategie',
      'Design data governance frameworks',
      'Select modern data stack technologies',
      'Build data-driven organizational culture',
      'Create analytics en AI roadmaps',
      'Measure data strategy success'
    ],
    prerequisites: [
      'Executive-level ervaring',
      'Strategic thinking capabilities',
      'Basiskennis data en analytics',
      'Business strategy achtergrond'
    ],
    targetAudience: [
      'C-level executives (CDO, CIO, CEO)',
      'Senior IT managers',
      'Digital transformation leaders',
      'Strategy consultants'
    ],
    syllabus: [
      {
        title: 'Data Strategy Fundamentals',
        topics: [
          'Data als strategic asset',
          'Current state assessment',
          'Vision en objectives definition',
          'Stakeholder alignment'
        ]
      },
      {
        title: 'Data Governance en Architecture',
        topics: [
          'Data governance frameworks (DAMA-DMBOK)',
          'Data quality management',
          'Master data management',
          'Data security en compliance'
        ]
      },
      {
        title: 'Modern Data Stack',
        topics: [
          'Cloud data platforms comparison',
          'Data warehouse vs data lake vs lakehouse',
          'ETL/ELT tools landscape',
          'BI en analytics tools selection'
        ]
      },
      {
        title: 'Implementation en Change Management',
        topics: [
          'Roadmap development',
          'Building data-driven culture',
          'Change management',
          'Measuring success en KPIs'
        ]
      }
    ]
  },

  'data-modeling': {
    description: 'Data Modeling leert je hoe je effectieve data modellen ontwerpt voor databases en data warehouses. Deze cursus behandelt conceptual, logical en physical data modeling, normalisatie, dimensional modeling (star/snowflake schemas), en modern data vault technieken. Je leert werken met ERwin, PowerDesigner of draw.io, en best practices voor performance en maintainability. Perfect voor data engineers, database designers en data architects.',
    shortDescription: 'Ontwerp effectieve data modellen voor databases en data warehouses',
    objectives: [
      'Creëer conceptual, logical en physical data modellen',
      'Pas normalisatie toe voor OLTP databases',
      'Design dimensional models voor data warehouses',
      'Implementeer Data Vault 2.0 methodologie',
      'Gebruik modeling tools effectief',
      'Optimize voor query performance'
    ],
    prerequisites: [
      'SQL kennis',
      'Database fundamentals',
      'Begrip van business processes',
      'ER diagram basis'
    ],
    targetAudience: [
      'Data engineers',
      'Database administrators',
      'Data architects',
      'BI developers'
    ],
    syllabus: [
      {
        title: 'Data Modeling Fundamentals',
        topics: [
          'Conceptual vs logical vs physical models',
          'Entity-relationship diagrams',
          'Normalization (1NF through 5NF)',
          'Denormalization strategies'
        ]
      },
      {
        title: 'Dimensional Modeling',
        topics: [
          'Star schema design',
          'Snowflake schemas',
          'Fact tables en dimension tables',
          'Slowly Changing Dimensions (SCD)',
          'Kimball methodology'
        ]
      },
      {
        title: 'Advanced Techniques',
        topics: [
          'Data Vault 2.0 modeling',
          'Anchor modeling basics',
          'Temporal data modeling',
          'Handling hierarchies'
        ]
      },
      {
        title: 'Tools en Best Practices',
        topics: [
          'Modeling tools: ERwin, PowerDesigner',
          'Version control voor models',
          'Documentation standards',
          'Performance considerations'
        ]
      }
    ]
  },

  'data-build-tool-dbt': {
    description: 'dbt (data build tool) revolutioneert analytics engineering door SQL transformaties te behandelen als software development. Deze hands-on cursus leert je hoe je dbt gebruikt voor modular SQL transformations, testing, documentation, en version control. Je leert werken met models, snapshots, seeds, en hooks, en integreert dbt in moderne data stacks (Snowflake, BigQuery, Redshift). Perfect voor analytics engineers en data engineers die modern data transformation willen implementeren.',
    shortDescription: 'Modern analytics engineering met dbt voor data transformations',
    objectives: [
      'Bouw modular SQL transformations met dbt models',
      'Implementeer data tests en quality checks',
      'Generate automatic documentation',
      'Use Jinja templating voor DRY SQL',
      'Integrate dbt met version control en CI/CD',
      'Deploy dbt op cloud data warehouses'
    ],
    prerequisites: [
      'Sterke SQL vaardigheden',
      'Data warehouse concepten',
      'Git basics',
      'Python basics aanbevolen'
    ],
    targetAudience: [
      'Analytics engineers',
      'Data engineers',
      'BI developers',
      'Data analysts met SQL skills'
    ],
    syllabus: [
      {
        title: 'dbt Fundamentals',
        topics: [
          'dbt architectuur en workflow',
          'Project setup en structure',
          'Models: views, tables, incremental',
          'Sources en refs',
          'dbt CLI commands'
        ]
      },
      {
        title: 'Advanced dbt Features',
        topics: [
          'Jinja templating en macros',
          'Snapshots voor SCD Type 2',
          'Seeds voor reference data',
          'Hooks en operations',
          'Packages en dependencies'
        ]
      },
      {
        title: 'Testing en Documentation',
        topics: [
          'Schema tests (unique, not_null, relationships)',
          'Custom data tests',
          'Automatic documentation generation',
          'dbt docs serve',
          'Freshness checks'
        ]
      },
      {
        title: 'Production Deployment',
        topics: [
          'dbt Cloud vs dbt Core',
          'CI/CD integration',
          'Scheduling met Airflow of Prefect',
          'Environment management',
          'Performance optimization'
        ]
      }
    ]
  },

  'anchor-modelling': {
    description: 'Anchor Modelling is een agile data modeling techniek geoptimaliseerd voor data warehouses die frequent veranderen. Deze gespecialiseerde cursus leert je de zes normale vormen van Anchor Modeling, hoe je anchors, attributes, ties en knots ontwerpt, en timevariant data modelleert. Je leert het verschil met Data Vault en Dimensional Modeling. Perfect voor data modelers en architects die flexibele, auditeerbare data warehouses willen bouwen.',
    shortDescription: 'Agile data warehouse modeling met Anchor Modeling methodologie',
    objectives: [
      'Pas de zes Anchor Modeling normal forms toe',
      'Ontwerp anchors, attributes, ties en knots',
      'Model bitemporal data (transaction time en valid time)',
      'Vergelijk Anchor Modeling met Data Vault en Kimball',
      'Genereer automatisch SQL uit Anchor models',
      'Implement agile data warehouse changes'
    ],
    prerequisites: [
      'Data modeling basics',
      'SQL en data warehouse kennis',
      'Dimensional modeling begrip',
      'Database normalisatie'
    ],
    targetAudience: [
      'Data architects',
      'Data warehouse developers',
      'Data modelers',
      'BI architects'
    ],
    syllabus: [
      {
        title: 'Anchor Modeling Fundamentals',
        topics: [
          'Anchor Modeling philosophy',
          'The six normal forms (6NF)',
          'Anchors: business entities',
          'Attributes: descriptive properties'
        ]
      },
      {
        title: 'Advanced Constructs',
        topics: [
          'Ties: relationships tussen anchors',
          'Knots: shared attributes',
          'Historization: timevariant data',
          'Bitemporal modeling'
        ]
      },
      {
        title: 'Implementation',
        topics: [
          'Anchor Modeling tools',
          'SQL generation',
          'ETL patterns voor Anchor models',
          'Query optimization'
        ]
      },
      {
        title: 'Comparison en Best Practices',
        topics: [
          'Anchor vs Data Vault vs Dimensional',
          'When to use Anchor Modeling',
          'Agile data warehouse development',
          'Schema evolution strategies'
        ]
      }
    ]
  },

  'data-management-dama-dmbok': {
    description: 'DAMA-DMBOK (Data Management Body of Knowledge) is de internationale standaard voor data management. Deze cursus behandelt alle 11 knowledge areas: data governance, architecture, modeling, storage, security, integration, master data, warehouse/BI, metadata, quality en ethics. Je leert frameworks implementeren voor enterprise data management en best practices uit het DAMA-DMBOK2 boek. Perfect voor data management professionals die willen certificeren of governance frameworks willen opzetten.',
    shortDescription: 'Enterprise data management met DAMA-DMBOK framework en best practices',
    objectives: [
      'Master alle 11 DAMA knowledge areas',
      'Implement data governance frameworks',
      'Design enterprise data architecture',
      'Setup data quality management',
      'Establish metadata management',
      'Prepare voor CDMP certificering'
    ],
    prerequisites: [
      'Data management ervaring',
      'Basiskennis databases en BI',
      'Organisational awareness',
      'Geen certificering vereist'
    ],
    targetAudience: [
      'Data governance professionals',
      'Enterprise architects',
      'CDO office medewerkers',
      'CDMP certification candidates'
    ],
    syllabus: [
      {
        title: 'Data Governance',
        topics: [
          'Data governance operating model',
          'Data policies en standards',
          'Data stewardship',
          'Regulatory compliance (GDPR, etc.)'
        ]
      },
      {
        title: 'Core Data Management',
        topics: [
          'Data architecture frameworks (TOGAF, Zachman)',
          'Data modeling en design',
          'Data storage en operations',
          'Data security management',
          'Data integration en interoperability'
        ]
      },
      {
        title: 'Analytics en Quality',
        topics: [
          'Master data management',
          'Data warehousing en BI',
          'Data quality management',
          'Metadata management'
        ]
      },
      {
        title: 'Emerging Topics',
        topics: [
          'Reference data management',
          'Data ethics',
          'Big data management',
          'CDMP exam preparation'
        ]
      }
    ]
  },

  'big-data': {
    description: 'Big Data leert je werken met datasets die te groot zijn voor traditionele databases. Deze cursus behandelt het Hadoop ecosystem (HDFS, MapReduce, YARN), Spark voor distributed processing, en NoSQL databases (HBase, Cassandra). Je leert big data architecturen ontwerpen, data pipelines bouwen, en distributed computing principles toepassen. Met hands-on labs op cloud platforms (AWS EMR, Azure HDInsight) werk je met terabytes aan data. Perfect voor data engineers die big data willen schalen.',
    shortDescription: 'Hadoop, Spark en NoSQL voor enterprise big data processing',
    objectives: [
      'Begrijp distributed computing fundamentals',
      'Werk met Hadoop HDFS en MapReduce',
      'Use Apache Spark voor data processing',
      'Query big data met Hive en Impala',
      'Implement NoSQL databases',
      'Design scalable big data architectures'
    ],
    prerequisites: [
      'Java of Python kennis',
      'SQL basics',
      'Linux command line',
      'Data engineering fundamentals'
    ],
    targetAudience: [
      'Data engineers',
      'Big data developers',
      'Data architects',
      'Platform engineers'
    ],
    syllabus: [
      {
        title: 'Big Data Fundamentals',
        topics: [
          'CAP theorem en distributed systems',
          'Hadoop ecosystem overview',
          'HDFS architecture',
          'MapReduce programming model',
          'YARN resource management'
        ]
      },
      {
        title: 'Apache Spark',
        topics: [
          'Spark architecture: RDDs, DataFrames, Datasets',
          'Spark SQL voor structured data',
          'Spark Streaming',
          'MLlib machine learning',
          'Performance tuning'
        ]
      },
      {
        title: 'Data Storage',
        topics: [
          'Hive data warehouse',
          'HBase columnar database',
          'Cassandra distributed NoSQL',
          'Parquet en ORC file formats'
        ]
      },
      {
        title: 'Big Data Pipelines',
        topics: [
          'Data ingestion met Kafka, Flume',
          'Workflow orchestration (Airflow, Oozie)',
          'Cloud big data: AWS EMR, Azure HDInsight',
          'Data lake architectures'
        ]
      }
    ]
  },

  'apache-pig': {
    description: 'Apache Pig is een high-level platform voor het maken van MapReduce programma\'s met Pig Latin scripting language. Deze cursus leert je hoe je Pig gebruikt voor ETL workflows op Hadoop zonder Java te schrijven. Je leert Pig Latin syntax, data transformaties, user-defined functions, en performance tuning. Perfect voor data engineers die willen werken met Hadoop zonder complexe MapReduce code.',
    shortDescription: 'ETL op Hadoop met Apache Pig Latin scripting',
    objectives: [
      'Schrijf Pig Latin scripts voor data processing',
      'Transform big data met Pig operators',
      'Create user-defined functions (UDFs)',
      'Optimize Pig job performance',
      'Integrate Pig met Hadoop ecosystem'
    ],
    prerequisites: [
      'Hadoop basics',
      'SQL kennis',
      'Linux command line',
      'Scripting ervaring'
    ],
    targetAudience: [
      'Data engineers',
      'ETL developers',
      'Hadoop developers',
      'Data analysts'
    ],
    syllabus: [
      {
        title: 'Pig Fundamentals',
        topics: [
          'Pig architectuur',
          'Pig Latin basics',
          'Loading en storing data',
          'Pig vs Hive vs MapReduce'
        ]
      },
      {
        title: 'Data Transformation',
        topics: [
          'Filter, foreach, group, join operators',
          'Nested operations',
          'Built-in functions',
          'Complex data types'
        ]
      },
      {
        title: 'Advanced Features',
        topics: [
          'User-defined functions (UDFs) in Java/Python',
          'Macros voor herbruikbaarheid',
          'Parameter substitution',
          'Streaming met external programs'
        ]
      },
      {
        title: 'Production Usage',
        topics: [
          'Performance tuning',
          'Debugging Pig scripts',
          'Integration met Oozie workflows',
          'Best practices'
        ]
      }
    ]
  },

  'data-mining': {
    description: 'Data Mining leert je hoe je patterns, trends en insights ontdekt in grote datasets. Deze cursus behandelt clustering algoritmen, association rules mining, classification trees, en anomaly detection. Je leert werken met tools zoals RapidMiner, KNIME of Weka, en pas technieken toe op business cases: customer segmentation, market basket analysis, fraud detection. Perfect voor analisten die automatisch patterns willen ontdekken in data.',
    shortDescription: 'Discover patterns in data met clustering, classification en association rules',
    objectives: [
      'Pas clustering algoritmen toe (k-means, hierarchical)',
      'Ontdek association rules voor market basket analysis',
      'Bouw classification models (decision trees, random forests)',
      'Detect anomalies en outliers',
      'Use data mining tools (RapidMiner, KNIME)',
      'Apply to business use cases'
    ],
    prerequisites: [
      'Statistiek basics',
      'Data analyse ervaring',
      'SQL kennis',
      'Geen programmeren vereist'
    ],
    targetAudience: [
      'Business analysts',
      'Data scientists',
      'Marketing analysts',
      'Fraud analysts'
    ],
    syllabus: [
      {
        title: 'Data Mining Fundamentals',
        topics: [
          'CRISP-DM methodology',
          'Data preprocessing en cleaning',
          'Feature selection',
          'Overfitting prevention'
        ]
      },
      {
        title: 'Clustering',
        topics: [
          'K-means clustering',
          'Hierarchical clustering',
          'DBSCAN voor density-based clustering',
          'Customer segmentation use case'
        ]
      },
      {
        title: 'Classification',
        topics: [
          'Decision trees (CART, C4.5)',
          'Random forests',
          'Naive Bayes classifier',
          'Model evaluation metrics'
        ]
      },
      {
        title: 'Pattern Discovery',
        topics: [
          'Association rules mining (Apriori algorithm)',
          'Market basket analysis',
          'Anomaly detection',
          'Text mining basics'
        ]
      }
    ]
  },

  'qlik-sense': {
    description: 'Qlik Sense is een modern self-service BI platform met associative analytics engine. Deze cursus leert je hoe je interactieve dashboards bouwt, data laadt met scripting, en geavanceerde visualisaties maakt. Je leert werken met set analysis, master items, en Qlik\'s unique associative model dat gebruikers laat exploreren zonder queries. Perfect voor BI developers en analysts die krachtige, gebruiksvriendelijke analytics willen bouwen.',
    shortDescription: 'Self-service BI en interactive dashboards met Qlik Sense',
    objectives: [
      'Bouw interactive dashboards met Qlik Sense',
      'Load data met Qlik scripting',
      'Master set analysis expressions',
      'Create advanced visualizations',
      'Understand associative data model',
      'Publish en deel apps'
    ],
    prerequisites: [
      'BI concepten basics',
      'SQL kennis aanbevolen',
      'Data analyse ervaring',
      'Geen programmeren vereist'
    ],
    targetAudience: [
      'BI developers',
      'Data analysts',
      'Business intelligence teams',
      'Self-service BI users'
    ],
    syllabus: [
      {
        title: 'Qlik Sense Basics',
        topics: [
          'Qlik associative model',
          'Interface en navigation',
          'First app creation',
          'Sheets en visualizations'
        ]
      },
      {
        title: 'Data Loading',
        topics: [
          'Data connections',
          'Load script basics',
          'Transformations en joins',
          'Incremental loads'
        ]
      },
      {
        title: 'Advanced Analytics',
        topics: [
          'Set analysis expressions',
          'Master items en variables',
          'Advanced charts',
          'Extensions en custom visualizations'
        ]
      },
      {
        title: 'Deployment',
        topics: [
          'App optimization',
          'Publishing en security',
          'Qlik Sense Cloud vs Enterprise',
          'Best practices'
        ]
      }
    ]
  },

  'google-data-studio': {
    description: 'Google Data Studio (nu Looker Studio) is Google\'s gratis BI tool voor het maken van interactieve dashboards en reports. Deze praktische cursus leert je hoe je Data Studio verbindt met Google Analytics, Sheets, BigQuery en andere databronnen, visuele reports maakt, en dashboards deelt. Perfect voor marketing teams, analysts en small businesses die snel professionele dashboards willen maken zonder kostbare BI tools.',
    shortDescription: 'Free BI dashboards met Google Data Studio en Google Analytics',
    objectives: [
      'Connect Data Studio met Google Analytics, Sheets, BigQuery',
      'Build interactive dashboards',
      'Create calculated fields',
      'Design professional reports',
      'Share en embed dashboards',
      'Setup scheduled email reports'
    ],
    prerequisites: [
      'Google account',
      'Basiskennis data',
      'Ervaring met spreadsheets',
      'Geen technische kennis vereist'
    ],
    targetAudience: [
      'Marketing analysts',
      'Small business owners',
      'Digital marketers',
      'Web analysts'
    ],
    syllabus: [
      {
        title: 'Data Studio Basics',
        topics: [
          'Interface overview',
          'Data sources en connectors',
          'First report creation',
          'Chart types'
        ]
      },
      {
        title: 'Data Connections',
        topics: [
          'Google Analytics integration',
          'Google Sheets as data source',
          'BigQuery connection',
          'Third-party connectors',
          'Blending data sources'
        ]
      },
      {
        title: 'Advanced Features',
        topics: [
          'Calculated fields',
          'Date range controls',
          'Filters en segments',
          'Community visualizations'
        ]
      },
      {
        title: 'Sharing en Collaboration',
        topics: [
          'Report sharing',
          'Embedding reports',
          'Scheduled emails',
          'Template creation'
        ]
      }
    ]
  },

  'business-objects': {
    description: 'SAP BusinessObjects is een enterprise BI platform voor reporting, analytics en dashboards. Deze cursus leert je werken met de BusinessObjects suite: Web Intelligence voor ad-hoc queries, Crystal Reports voor pixel-perfect reporting, en Dashboards voor visualisatie. Je leert universes gebruiken, formulas schrijven, en reports schedules. Perfect voor BI professionals in SAP omgevingen en enterprise reporting teams.',
    shortDescription: 'Enterprise BI met SAP BusinessObjects, Web Intelligence en Crystal Reports',
    objectives: [
      'Build reports met Web Intelligence',
      'Create Crystal Reports',
      'Work met BusinessObjects universes',
      'Write complex formulas en variables',
      'Schedule en distribute reports',
      'Design executive dashboards'
    ],
    prerequisites: [
      'SQL basics',
      'BI concepten',
      'Database knowledge',
      'Reporting ervaring aanbevolen'
    ],
    targetAudience: [
      'BI developers',
      'Report developers',
      'SAP consultants',
      'Enterprise BI teams'
    ],
    syllabus: [
      {
        title: 'BusinessObjects Platform',
        topics: [
          'BI Launch Pad overview',
          'Universe concepts',
          'Security en permissions',
          'Document management'
        ]
      },
      {
        title: 'Web Intelligence',
        topics: [
          'Query panel en report design',
          'Sections en breaks',
          'Formulas en variables',
          'Alerters en conditional formatting'
        ]
      },
      {
        title: 'Crystal Reports',
        topics: [
          'Crystal Reports designer',
          'Subreports en cross-tabs',
          'Parameters en prompts',
          'Exporting en distribution'
        ]
      },
      {
        title: 'Dashboards en Administration',
        topics: [
          'Dashboard design (formerly Xcelsius)',
          'Report scheduling',
          'Publication automation',
          'Performance tuning'
        ]
      }
    ]
  },

  'klipfolio': {
    description: 'Klipfolio is een cloud-based dashboard platform dat data uit 100+ services combineert in real-time dashboards. Deze cursus leert je hoe je Klipfolio gebruikt om marketing, sales en operational dashboards te bouwen met data uit Google Analytics, Salesforce, social media, databases en spreadsheets. Je leert Kliq formulas schrijven, custom metrics maken, en TV dashboards ontwerpen. Perfect voor digital marketing teams en business analysts.',
    shortDescription: 'Real-time cloud dashboards met Klipfolio en 100+ data sources',
    objectives: [
      'Connect 100+ data sources naar Klipfolio',
      'Build real-time dashboards',
      'Write Kliq formulas voor custom metrics',
      'Design voor desktop, mobile en TV displays',
      'Share dashboards met teams',
      'Setup alerts en scheduled reports'
    ],
    prerequisites: [
      'Basiskennis metrics en KPIs',
      'Data analyse ervaring',
      'API basics helpen maar niet vereist',
      'Geen programmeren nodig'
    ],
    targetAudience: [
      'Digital marketing managers',
      'Sales operations analysts',
      'Business intelligence analysts',
      'Dashboard designers'
    ],
    syllabus: [
      {
        title: 'Klipfolio Basics',
        topics: [
          'Platform overview',
          'Data source connections',
          'First dashboard creation',
          'Klip types en templates'
        ]
      },
      {
        title: 'Data Integration',
        topics: [
          'Pre-built connectors (Google Analytics, Salesforce, etc.)',
          'REST API connections',
          'File uploads (Excel, CSV)',
          'Database connections',
          'Data refresh scheduling'
        ]
      },
      {
        title: 'Advanced Dashboards',
        topics: [
          'Kliq formula language',
          'Calculated metrics',
          'Dynamic filters',
          'Multi-source data blending',
          'Conditional formatting'
        ]
      },
      {
        title: 'Sharing en Collaboration',
        topics: [
          'Dashboard sharing',
          'TV mode voor wallboards',
          'Mobile app',
          'Scheduled snapshots',
          'User permissions'
        ]
      }
    ]
  },

  'rapidminer': {
    description: 'RapidMiner is een visual data science platform voor het bouwen van machine learning modellen zonder coding. Deze cursus leert je hoe je RapidMiner\'s drag-and-drop interface gebruikt voor data prep, modeling, evaluation en deployment. Je leert workflows bouwen met operators, AutoModel gebruiken, en modellen deployen als APIs. Perfect voor citizen data scientists en analysts die ML willen toepassen zonder te programmeren.',
    shortDescription: 'No-code machine learning platform met RapidMiner visual workflows',
    objectives: [
      'Build ML workflows met drag-and-drop operators',
      'Prepare data met RapidMiner Turbo Prep',
      'Use AutoModel voor automatic ML',
      'Evaluate model performance',
      'Deploy models als REST APIs',
      'Integrate met databases en cloud'
    ],
    prerequisites: [
      'Machine learning concepten basics',
      'Data analyse ervaring',
      'Statistiek fundamentals',
      'Geen programmeerkennis vereist'
    ],
    targetAudience: [
      'Citizen data scientists',
      'Business analysts',
      'Data analysts',
      'ML beginners'
    ],
    syllabus: [
      {
        title: 'RapidMiner Fundamentals',
        topics: [
          'Studio interface en navigation',
          'Process design en operators',
          'Repository management',
          'Data connections'
        ]
      },
      {
        title: 'Data Preparation',
        topics: [
          'Turbo Prep voor data cleaning',
          'Missing value handling',
          'Feature engineering operators',
          'Data transformations'
        ]
      },
      {
        title: 'Machine Learning',
        topics: [
          'AutoModel automated ML',
          'Supervised learning operators',
          'Unsupervised learning',
          'Model validation en tuning',
          'Ensemble methods'
        ]
      },
      {
        title: 'Deployment en Integration',
        topics: [
          'Model deployment als web service',
          'Scoring new data',
          'Integration met BI tools',
          'Scheduled processes'
        ]
      }
    ]
  },

  'infographics': {
    description: 'Infographics leert je hoe je complexe data en informatie visueel aantrekkelijk en begrijpelijk maakt. Deze creatieve cursus behandelt design principles, storytelling met data, tools (Canva, Adobe Illustrator, Piktochart), en best practices voor verschillende media. Je leert wanneer welk chart type te gebruiken, kleuren effectief inzetten, en impactvolle visuele verhalen maken. Perfect voor communicatie professionals, marketeers en analisten die data visueel willen presenteren.',
    shortDescription: 'Design impactvolle infographics en data visualisaties voor communicatie',
    objectives: [
      'Master design principles voor data visualisatie',
      'Kies de juiste chart types voor je data',
      'Use tools: Canva, Piktochart, Adobe Illustrator',
      'Tell stories met data visueel',
      'Design voor verschillende platforms (web, print, social)',
      'Create accessible en inclusive visualizations'
    ],
    prerequisites: [
      'Geen design ervaring vereist',
      'Basiskennis data en grafieken',
      'Creatieve instelling',
      'Computer literacy'
    ],
    targetAudience: [
      'Marketing professionals',
      'Communicatie specialisten',
      'Content creators',
      'Data analysts',
      'Journalists'
    ],
    syllabus: [
      {
        title: 'Visual Design Fundamentals',
        topics: [
          'Design principles: contrast, alignment, repetition, proximity',
          'Color theory voor data viz',
          'Typography voor readability',
          'Visual hierarchy'
        ]
      },
      {
        title: 'Data Visualization Types',
        topics: [
          'Chart types: bar, line, pie, scatter, etc.',
          'When to use which visualization',
          'Common mistakes to avoid',
          'Interactive vs static'
        ]
      },
      {
        title: 'Infographic Creation',
        topics: [
          'Storytelling structure',
          'Tools: Canva, Piktochart, Venngage',
          'Icon libraries en imagery',
          'Template customization',
          'Brand consistency'
        ]
      },
      {
        title: 'Advanced Techniques',
        topics: [
          'Adobe Illustrator voor custom infographics',
          'Animated infographics',
          'Interactive web infographics',
          'Accessibility guidelines (WCAG)',
          'Portfolio building'
        ]
      }
    ]
  },

  'sas': {
    description: 'SAS (Statistical Analysis System) is industry-standard software voor advanced analytics, multivariate analyses en predictive modeling. Deze intensieve cursus leert je SAS programmeren met Base SAS, data manipulation, statistical procedures (PROC), en macro language. Je leert datasets verwerken, statistische analyses uitvoeren, en automated reporting bouwen. Perfect voor statisticians, data analysts en researchers in pharma, finance en healthcare.',
    shortDescription: 'Professional statistical analysis en reporting met SAS programming',
    objectives: [
      'Write SAS programs met DATA steps en PROCs',
      'Manipulate data met SAS functions',
      'Perform statistical analyses (regression, ANOVA, etc.)',
      'Create automated reports met ODS',
      'Use SAS macro language',
      'Import/export data from various sources'
    ],
    prerequisites: [
      'Statistiek kennis',
      'Programming logic begrip',
      'Data analyse ervaring',
      'SQL basics helpen'
    ],
    targetAudience: [
      'Statisticians',
      'Clinical data analysts',
      'Financial analysts',
      'Research analysts',
      'Pharma data professionals'
    ],
    syllabus: [
      {
        title: 'SAS Programming Fundamentals',
        topics: [
          'SAS environment en syntax',
          'DATA step processing',
          'Reading external data',
          'SAS datasets en libraries',
          'Basic PROCs (PRINT, CONTENTS, FREQ)'
        ]
      },
      {
        title: 'Data Manipulation',
        topics: [
          'Subsetting en filtering',
          'Merging en joining datasets',
          'Data transformations',
          'BY-group processing',
          'Arrays en DO loops'
        ]
      },
      {
        title: 'Statistical Procedures',
        topics: [
          'Descriptive statistics (PROC MEANS, UNIVARIATE)',
          'Correlation en regression (PROC REG, PROC CORR)',
          'ANOVA en GLM',
          'Logistic regression',
          'Time series analysis'
        ]
      },
      {
        title: 'Advanced SAS',
        topics: [
          'Macro language fundamentals',
          'Macro variables en functions',
          'ODS (Output Delivery System)',
          'SQL in SAS (PROC SQL)',
          'SAS graphs en reporting'
        ]
      }
    ]
  },

  'splunk': {
    description: 'Splunk is het toonaangevende platform voor machine data analytics, security monitoring en operational intelligence. Deze cursus leert je Splunk Search Processing Language (SPL), dashboards bouwen, alerts configureren, en data onboarden. Je leert log analysis, security use cases (SIEM), en applicatie monitoring. Met hands-on labs werk je aan real-world scenarios. Perfect voor DevOps engineers, security analysts en operations teams.',
    shortDescription: 'Machine data analytics en SIEM met Splunk en SPL queries',
    objectives: [
      'Master Splunk Search Processing Language (SPL)',
      'Onboard data sources naar Splunk',
      'Build dashboards en visualizations',
      'Configure alerts en scheduled searches',
      'Use Splunk voor security monitoring (SIEM)',
      'Troubleshoot applications met logs'
    ],
    prerequisites: [
      'Linux basics',
      'Log files begrip',
      'Networking fundamentals',
      'Regex kennis is een plus'
    ],
    targetAudience: [
      'DevOps engineers',
      'Security analysts (SOC)',
      'Site Reliability Engineers',
      'System administrators',
      'Application support teams'
    ],
    syllabus: [
      {
        title: 'Splunk Fundamentals',
        topics: [
          'Splunk architectuur: indexers, search heads, forwarders',
          'Data input en onboarding',
          'Search basics en field extraction',
          'Time range selection',
          'Search modes: fast, smart, verbose'
        ]
      },
      {
        title: 'SPL - Search Processing Language',
        topics: [
          'Search commands: search, stats, timechart, top, rare',
          'Transforming commands',
          'Filtering en subsearches',
          'Lookups en joins',
          'Transaction en session analysis'
        ]
      },
      {
        title: 'Visualization en Dashboards',
        topics: [
          'Chart types en formatting',
          'Dashboard creation',
          'Drilldowns en dynamic dashboards',
          'Dashboard Studio',
          'Form inputs'
        ]
      },
      {
        title: 'Alerting en Use Cases',
        topics: [
          'Alert creation en actions',
          'Scheduled searches',
          'Security use cases (failed logins, anomalies)',
          'Application performance monitoring',
          'Compliance reporting'
        ]
      }
    ]
  },

  'azure-data-factory': {
    description: 'Azure Data Factory is Microsoft\'s cloud ETL service voor data integratie en orchestration. Deze cursus leert je hoe je pipelines bouwt voor data movement en transformation, connected met 90+ data sources, en workflows orchestreert. Je leert werken met copy activities, data flows, triggers, en integration runtimes. Perfect voor data engineers die cloud data pipelines willen bouwen.',
    shortDescription: 'Cloud ETL pipelines en orchestration met Azure Data Factory',
    objectives: [
      'Build data pipelines met ADF visual designer',
      'Connect 90+ data sources (on-prem en cloud)',
      'Transform data met mapping data flows',
      'Orchestrate workflows met triggers',
      'Implement CI/CD voor data pipelines',
      'Monitor pipeline runs en troubleshoot'
    ],
    prerequisites: [
      'Azure fundamentals',
      'ETL concepten',
      'SQL kennis',
      'Data engineering basics'
    ],
    targetAudience: [
      'Data engineers',
      'BI developers',
      'Cloud data architects',
      'ETL developers migreren naar cloud'
    ],
    syllabus: [
      {
        title: 'ADF Fundamentals',
        topics: [
          'ADF architectuur en components',
          'Linked services en datasets',
          'Integration runtimes',
          'Copy activity basics'
        ]
      },
      {
        title: 'Data Transformation',
        topics: [
          'Mapping data flows',
          'Wrangling data flows',
          'Data flow debug mode',
          'Parameterization'
        ]
      },
      {
        title: 'Orchestration',
        topics: [
          'Control flow activities',
          'Triggers: schedule, tumbling window, event',
          'Pipeline dependencies',
          'Error handling en retry'
        ]
      },
      {
        title: 'Advanced Topics',
        topics: [
          'CI/CD met Azure DevOps',
          'Monitoring met Azure Monitor',
          'Security en managed identity',
          'Performance optimization'
        ]
      }
    ]
  },

  'azure-synapse-analytics': {
    description: 'Azure Synapse Analytics is een unified analytics service die data warehousing en big data combineert. Deze geavanceerde cursus leert je hoe je Synapse gebruikt voor SQL pools (dedicated/serverless), Spark pools, pipelines en Power BI integration. Je leert PolyBase voor external data, security met row-level security, en optimization. Perfect voor data engineers en analysts die complete analytics oplossingen willen bouwen.',
    shortDescription: 'Unified analytics met Azure Synapse: SQL, Spark en integrated pipelines',
    objectives: [
      'Design data warehouse met dedicated SQL pools',
      'Query data lakes met serverless SQL',
      'Use Spark pools voor big data processing',
      'Build pipelines met Synapse Studio',
      'Integrate met Power BI',
      'Implement security en optimize performance'
    ],
    prerequisites: [
      'SQL expertise',
      'Azure fundamentals',
      'Data warehousing concepten',
      'Spark/Python kennis is een plus'
    ],
    targetAudience: [
      'Data engineers',
      'Data warehouse developers',
      'Data architects',
      'BI professionals'
    ],
    syllabus: [
      {
        title: 'Synapse Fundamentals',
        topics: [
          'Synapse workspace en studio',
          'Dedicated SQL pools (formerly SQL DW)',
          'Serverless SQL pools',
          'Spark pools',
          'Synapse Link'
        ]
      },
      {
        title: 'Data Warehousing',
        topics: [
          'Star schema design',
          'Distribution strategies: hash, round-robin, replicate',
          'Columnstore indexes',
          'Partitioning',
          'Workload management'
        ]
      },
      {
        title: 'Big Data Integration',
        topics: [
          'PolyBase external tables',
          'Data lake querying',
          'Spark notebooks',
          'Delta Lake format',
          'Data flow transformations'
        ]
      },
      {
        title: 'Security en Performance',
        topics: [
          'Row-level security',
          'Column-level security',
          'Dynamic data masking',
          'Query optimization',
          'Cost management'
        ]
      }
    ]
  },

  'microsoft-fabric-end-to-end-data-platform': {
    description: 'Microsoft Fabric is een complete SaaS data platform dat data engineering, warehousing, science, real-time analytics en BI unificeert. Deze comprehensive cursus behandelt alle Fabric workloads: Data Factory voor ETL, Synapse voor warehousing, Data Science notebooks, Real-Time analytics en Power BI integration. Je leert OneLake gebruiken, Lakehouse architectuur, en end-to-end workflows bouwen. Perfect voor data professionals die Microsoft\'s next-gen platform willen masteren.',
    shortDescription: 'Complete SaaS data platform: OneLake, Lakehouse, Synapse en Power BI',
    objectives: [
      'Understand Fabric architectuur en OneLake',
      'Build Lakehouse architectures',
      'Create data pipelines met Data Factory',
      'Query met Synapse SQL en Spark',
      'Implement real-time analytics',
      'Integrate Power BI voor visualization'
    ],
    prerequisites: [
      'SQL en Python basics',
      'Azure of Power BI ervaring helpt',
      'Data engineering concepten',
      'Analytics fundamentals'
    ],
    targetAudience: [
      'Data engineers',
      'BI developers',
      'Data architects',
      'Analytics professionals',
      'Azure users migreren naar Fabric'
    ],
    syllabus: [
      {
        title: 'Fabric Fundamentals',
        topics: [
          'Fabric architectuur en SaaS model',
          'OneLake data lake',
          'Workspaces en capacities',
          'Lakehouse vs Warehouse',
          'Delta tables'
        ]
      },
      {
        title: 'Data Engineering',
        topics: [
          'Data Factory pipelines in Fabric',
          'Dataflows Gen2',
          'Notebook development',
          'Spark job definitions',
          'Data orchestration'
        ]
      },
      {
        title: 'Analytics en BI',
        topics: [
          'Synapse Data Warehouse',
          'SQL analytics endpoint',
          'Power BI Direct Lake mode',
          'Real-Time Analytics (KQL)',
          'Semantic models'
        ]
      },
      {
        title: 'Advanced Topics',
        topics: [
          'Data Science met Fabric notebooks',
          'MLflow integration',
          'Git integration',
          'Security en governance',
          'Migration strategies'
        ]
      }
    ]
  },

  'microsoft-fabric-data-pipelines': {
    description: 'Microsoft Fabric Data Pipelines brengt Azure Data Factory capabilities naar het Fabric platform met added integration. Deze cursus leert je hoe je Fabric pipelines bouwt voor data movement en transformation, connected met Fabric workloads (Lakehouse, Warehouse, KQL database). Je leert copy activities, dataflows, Notebook activities, en orchestration binnen het Fabric ecosysteem. Perfect voor data engineers in Microsoft Fabric omgevingen.',
    shortDescription: 'ETL pipelines in Microsoft Fabric met Lakehouse integration',
    objectives: [
      'Build data pipelines in Fabric Studio',
      'Connect met Lakehouse, Warehouse, KQL databases',
      'Use dataflows voor low-code transformations',
      'Orchestrate Notebook en Spark activities',
      'Implement pipeline monitoring',
      'Setup CI/CD met Git integration'
    ],
    prerequisites: [
      'Basiskennis Microsoft Fabric',
      'ETL concepten',
      'SQL basics',
      'Azure Data Factory ervaring helpt'
    ],
    targetAudience: [
      'Data engineers in Fabric',
      'ETL developers',
      'BI developers',
      'Azure Data Factory users migreren naar Fabric'
    ],
    syllabus: [
      {
        title: 'Fabric Pipelines Basics',
        topics: [
          'Pipeline designer interface',
          'Activities overview',
          'Copy activity naar Lakehouse/Warehouse',
          'Parameters en variables',
          'Pipeline runs monitoring'
        ]
      },
      {
        title: 'Data Transformation',
        topics: [
          'Dataflows Gen2 integration',
          'Notebook activity voor Spark',
          'Stored procedure activity',
          'Data flow activity',
          'Transformation patterns'
        ]
      },
      {
        title: 'Orchestration',
        topics: [
          'Control flow activities',
          'ForEach en Until loops',
          'If condition activities',
          'Execute pipeline activity',
          'Triggers setup'
        ]
      },
      {
        title: 'Production Best Practices',
        topics: [
          'Error handling strategies',
          'Logging en monitoring',
          'Git integration voor version control',
          'Deployment pipelines',
          'Performance optimization'
        ]
      }
    ]
  },

  // ========================================
  // DEVOPS & CONTAINERS COURSES (10)
  // ========================================

  'apache-kafka-voor-python': {
    description: 'Apache Kafka is het leading distributed streaming platform voor real-time data pipelines en stream processing. Deze cursus leert je Kafka gebruiken vanuit Python met confluent-kafka en kafka-python libraries. Je leert producers en consumers bouwen, topics en partitions configureren, en stream processing implementeren met Kafka Streams. Perfect voor Python developers die real-time data processing willen implementeren.',
    shortDescription: 'Real-time stream processing met Kafka en Python',
    objectives: [
      'Bouw Kafka producers en consumers in Python',
      'Configureer topics, partitions en replication',
      'Implement stream processing patterns',
      'Handle schema evolution met Avro',
      'Monitor Kafka clusters',
      'Deploy Kafka in productie'
    ],
    prerequisites: [
      'Python programmeerkennis',
      'Distributed systems basics',
      'Async programming begrip',
      'Message queues kennis helpt'
    ],
    targetAudience: [
      'Python developers',
      'Data engineers',
      'Backend engineers',
      'Real-time systems architects'
    ],
    syllabus: [
      {
        title: 'Kafka Fundamentals',
        topics: ['Kafka architecture', 'Topics en partitions', 'Producers en consumers', 'Python client libraries']
      },
      {
        title: 'Advanced Kafka',
        topics: ['Consumer groups', 'Offset management', 'Schema registry met Avro', 'Exactly-once semantics']
      },
      {
        title: 'Stream Processing',
        topics: ['Kafka Streams basics', 'Windowing en aggregations', 'Stateful processing', 'Integration met databases']
      },
      {
        title: 'Production Deployment',
        topics: ['Cluster setup', 'Performance tuning', 'Monitoring met Prometheus', 'Troubleshooting']
      }
    ]
  },

  'apache-airflow': {
    description: 'Apache Airflow is de industry-standard voor workflow orchestration en data pipeline scheduling. Deze cursus leert je DAGs (Directed Acyclic Graphs) bouwen in Python, tasks orchestreren, en complexe dependencies managen. Je leert werken met operators, sensors, hooks, en Airflow op Kubernetes deployen. Perfect voor data engineers die ETL/ELT pipelines willen automatiseren en orchestreren.',
    shortDescription: 'Workflow orchestration en scheduling met Apache Airflow DAGs',
    objectives: [
      'Build DAGs in Python voor data pipelines',
      'Use operators, sensors en hooks',
      'Implement task dependencies en triggers',
      'Schedule workflows met cron expressions',
      'Deploy Airflow op Kubernetes',
      'Monitor pipeline health'
    ],
    prerequisites: [
      'Python programmeerkennis',
      'ETL/data pipeline concepten',
      'Docker basics',
      'SQL kennis'
    ],
    targetAudience: [
      'Data engineers',
      'ML engineers',
      'DevOps engineers',
      'Data platform teams'
    ],
    syllabus: [
      {
        title: 'Airflow Basics',
        topics: ['DAG structure', 'Tasks en operators', 'Scheduling basics', 'Airflow UI']
      },
      {
        title: 'Advanced Workflows',
        topics: ['Complex dependencies', 'Dynamic DAGs', 'Sub-DAGs', 'XComs voor data passing']
      },
      {
        title: 'Production Deployment',
        topics: ['Executor types (Local, Celery, Kubernetes)', 'Airflow on K8s', 'High availability', 'Monitoring']
      },
      {
        title: 'Best Practices',
        topics: ['Testing DAGs', 'Error handling', 'SLA management', 'Performance optimization']
      }
    ]
  },

  'azure-kubernetes-service-aks': {
    description: 'Azure Kubernetes Service (AKS) is Microsoft\'s managed Kubernetes voor container orchestration. Deze cursus leert je AKS clusters deployen, applications draaien in containers, auto-scaling configureren, en integreren met Azure services. Je leert Kubernetes fundamentals binnen Azure context, Helm charts, Azure DevOps integration, en monitoring. Perfect voor cloud engineers die containerized workloads op Azure willen draaien.',
    shortDescription: 'Managed Kubernetes op Azure met AKS voor container orchestration',
    objectives: [
      'Deploy en manage AKS clusters',
      'Run containerized applications op AKS',
      'Implement auto-scaling (HPA, cluster autoscaler)',
      'Use Azure CNI networking',
      'Integrate met ACR, Key Vault, Monitor',
      'Setup CI/CD pipelines naar AKS'
    ],
    prerequisites: [
      'Azure fundamentals',
      'Docker basics',
      'Kubernetes concepten',
      'Linux basics'
    ],
    targetAudience: [
      'Cloud engineers',
      'DevOps engineers',
      'Platform engineers',
      'K8s administrators'
    ],
    syllabus: [
      {
        title: 'AKS Fundamentals',
        topics: ['AKS architectuur', 'Cluster creation', 'Node pools', 'Kubernetes basics review']
      },
      {
        title: 'Application Deployment',
        topics: ['Deployments en Services', 'Ingress controllers', 'Helm package manager', 'StatefulSets']
      },
      {
        title: 'Azure Integration',
        topics: ['Azure Container Registry', 'Azure AD integration', 'Key Vault secrets', 'Azure Monitor']
      },
      {
        title: 'Operations',
        topics: ['Scaling strategies', 'Upgrades en maintenance', 'Backup en DR', 'Cost optimization']
      }
    ]
  },

  'azure-devops': {
    description: 'Azure DevOps is Microsoft\'s complete DevOps platform voor planning, development, delivery en operations. Deze cursus behandelt alle components: Azure Boards voor agile planning, Repos voor Git source control, Pipelines voor CI/CD, Test Plans, en Artifacts. Je leert complete DevOps workflows implementeren, YAML pipelines bouwen, en release management. Perfect voor development teams die end-to-end DevOps willen implementeren op Azure.',
    shortDescription: 'Complete DevOps met Azure Boards, Repos, Pipelines en Artifacts',
    objectives: [
      'Manage work met Azure Boards (Scrum/Kanban)',
      'Use Azure Repos voor Git workflows',
      'Build CI/CD pipelines met YAML',
      'Implement multi-stage deployments',
      'Use Azure Artifacts voor package management',
      'Integrate met Azure services'
    ],
    prerequisites: [
      'Software development ervaring',
      'Git basics',
      'CI/CD concepten',
      'Azure basics helpen'
    ],
    targetAudience: [
      'DevOps engineers',
      'Software developers',
      'Release managers',
      'Scrum masters'
    ],
    syllabus: [
      {
        title: 'Azure DevOps Overview',
        topics: ['Platform components', 'Organizations en projects', 'Azure Boards basics', 'Work item tracking']
      },
      {
        title: 'Source Control',
        topics: ['Azure Repos Git', 'Branch policies', 'Pull requests', 'Code reviews']
      },
      {
        title: 'CI/CD Pipelines',
        topics: ['Build pipelines', 'Release pipelines', 'YAML pipelines', 'Multi-stage deployments', 'Environments']
      },
      {
        title: 'Advanced DevOps',
        topics: ['Azure Test Plans', 'Azure Artifacts feeds', 'Service connections', 'Security en compliance']
      }
    ]
  },

  'azure-test-plans': {
    description: 'Azure Test Plans biedt test management, exploratory testing en automated test execution binnen Azure DevOps. Deze cursus leert je test plans ontwerpen, manual en automated tests uitvoeren, en test results rapporteren. Je leert werken met test suites, test cases, en integration met CI/CD pipelines. Perfect voor QA engineers en testers die gestructureerd testen willen implementeren.',
    shortDescription: 'Test management en execution met Azure Test Plans',
    objectives: [
      'Create test plans en test suites',
      'Execute manual tests',
      'Run automated tests in pipelines',
      'Track bugs en defects',
      'Generate test reports',
      'Implement exploratory testing'
    ],
    prerequisites: [
      'Software testing basics',
      'Azure DevOps fundamentals',
      'Agile/Scrum kennis',
      'Test automation begrip'
    ],
    targetAudience: [
      'QA engineers',
      'Test managers',
      'Scrum teams',
      'DevOps engineers'
    ],
    syllabus: [
      {
        title: 'Test Planning',
        topics: ['Test plans creation', 'Test suites organization', 'Test case design', 'Test configurations']
      },
      {
        title: 'Test Execution',
        topics: ['Manual testing', 'Exploratory testing', 'Test runs', 'Bug reporting']
      },
      {
        title: 'Automated Testing',
        topics: ['Integration met Selenium, Playwright', 'Test automation in pipelines', 'Continuous testing']
      },
      {
        title: 'Reporting',
        topics: ['Test progress tracking', 'Dashboards', 'Traceability', 'Quality metrics']
      }
    ]
  },

  'docker': {
    description: 'Docker revolutioneerde software delivery met containers. Deze complete cursus leert je Docker van scratch: images bouwen met Dockerfiles, containers draaien, networking, volumes, en Docker Compose voor multi-container apps. Je leert best practices voor production containers, security, en optimization. Met hands-on labs bouw je containerized applications. Perfect voor developers en operations teams die containers willen adopteren.',
    shortDescription: 'Complete containerization met Docker, Dockerfile en Docker Compose',
    objectives: [
      'Build Docker images met Dockerfiles',
      'Run en manage containers',
      'Use Docker networking en volumes',
      'Orchestrate met Docker Compose',
      'Implement multi-stage builds',
      'Secure en optimize containers'
    ],
    prerequisites: [
      'Linux basics',
      'Command line ervaring',
      'Software development fundamentals',
      'Geen Docker ervaring vereist'
    ],
    targetAudience: [
      'Software developers',
      'DevOps engineers',
      'System administrators',
      'Cloud engineers'
    ],
    syllabus: [
      {
        title: 'Docker Fundamentals',
        topics: ['Container vs VM', 'Docker architecture', 'Images en containers', 'Docker CLI basics']
      },
      {
        title: 'Building Images',
        topics: ['Dockerfile syntax', 'Layering en caching', 'Multi-stage builds', 'Best practices']
      },
      {
        title: 'Container Operations',
        topics: ['Networking modes', 'Volumes en bind mounts', 'Environment variables', 'Logging']
      },
      {
        title: 'Docker Compose',
        topics: ['Compose YAML syntax', 'Multi-container apps', 'Service dependencies', 'Development workflows']
      }
    ]
  },

  'docker-enterprise': {
    description: 'Docker Enterprise (nu Mirantis Container Runtime) biedt enterprise features voor production container deployments: security scanning, image signing, role-based access control, en enterprise support. Deze cursus leert je Docker Enterprise Edition gebruiken, Universal Control Plane (UCP) managen, Docker Trusted Registry (DTR), en enterprise security implementeren. Perfect voor enterprise teams die production-grade container platforms willen runnen.',
    shortDescription: 'Enterprise container platform met security, RBAC en image management',
    objectives: [
      'Deploy Docker Enterprise platform',
      'Use Universal Control Plane (UCP)',
      'Manage Docker Trusted Registry (DTR)',
      'Implement RBAC en access control',
      'Setup image scanning en signing',
      'Configure high availability'
    ],
    prerequisites: [
      'Docker fundamentals',
      'Linux system administration',
      'Networking basics',
      'Security awareness'
    ],
    targetAudience: [
      'Enterprise platform teams',
      'Security engineers',
      'DevOps leads',
      'Infrastructure architects'
    ],
    syllabus: [
      {
        title: 'Docker Enterprise Overview',
        topics: ['EE vs CE comparison', 'Architecture', 'Installation', 'Licensing']
      },
      {
        title: 'Universal Control Plane',
        topics: ['UCP deployment', 'Web UI management', 'Node management', 'Service deployment']
      },
      {
        title: 'Docker Trusted Registry',
        topics: ['DTR setup', 'Image repositories', 'Image scanning', 'Content trust']
      },
      {
        title: 'Enterprise Features',
        topics: ['RBAC configuration', 'LDAP/AD integration', 'HA setup', 'Backup en recovery']
      }
    ]
  },

  'kubernetes-voor-platform-en-cloud-engineers': {
    description: 'Kubernetes is de standard voor container orchestration. Deze cursus voor platform en cloud engineers leert je K8s clusters deployen (bare metal, cloud), architectuur begrijpen, networking (CNI plugins), storage (CSI), en production operations. Je leert cluster upgrades, backup/restore, security hardening, en multi-tenancy. Perfect voor platform engineers die K8s infrastructure ownen.',
    shortDescription: 'Kubernetes cluster management en operations voor platform engineers',
    objectives: [
      'Deploy Kubernetes clusters (kubeadm, managed K8s)',
      'Understand K8s architectuur diep',
      'Configure networking met CNI plugins',
      'Manage storage met CSI drivers',
      'Implement security hardening',
      'Perform cluster upgrades en disaster recovery'
    ],
    prerequisites: [
      'Linux system administration',
      'Networking en storage fundamentals',
      'Container basics (Docker)',
      'Infrastructure as Code begrip'
    ],
    targetAudience: [
      'Platform engineers',
      'Cloud engineers',
      'Site Reliability Engineers',
      'Infrastructure architects'
    ],
    syllabus: [
      {
        title: 'K8s Architecture',
        topics: ['Control plane components', 'Node components', 'etcd cluster', 'API server deep dive']
      },
      {
        title: 'Cluster Deployment',
        topics: ['Kubeadm installation', 'Managed K8s (EKS, AKS, GKE)', 'HA cluster setup', 'Node management']
      },
      {
        title: 'Networking en Storage',
        topics: ['CNI plugins (Calico, Cilium)', 'Network policies', 'CSI drivers', 'Persistent volumes']
      },
      {
        title: 'Operations',
        topics: ['Cluster upgrades', 'Backup met Velero', 'Security hardening (CIS benchmarks)', 'Multi-tenancy']
      }
    ]
  },

  'kubernetes-voor-developers-ckad': {
    description: 'Deze cursus bereidt developers voor op het Certified Kubernetes Application Developer (CKAD) examen. Je leert applicaties deployen op K8s, Pods configureren, ConfigMaps en Secrets gebruiken, multi-container patterns, en troubleshooting. Met hands-on labs en exam-style oefeningen bouw je de skills voor CKAD certificering. Perfect voor developers die K8s willen masteren en certificeren.',
    shortDescription: 'Kubernetes voor developers en CKAD certificering voorbereiding',
    objectives: [
      'Deploy applications op Kubernetes',
      'Configure Pods, Deployments, Services',
      'Use ConfigMaps, Secrets, en volumes',
      'Implement health checks (liveness, readiness)',
      'Troubleshoot container applications',
      'Pass CKAD exam'
    ],
    prerequisites: [
      'Container basics',
      'Application development ervaring',
      'YAML syntax kennis',
      'Linux command line'
    ],
    targetAudience: [
      'Application developers',
      'Cloud developers',
      'DevOps engineers',
      'CKAD certification candidates'
    ],
    syllabus: [
      {
        title: 'Core Concepts',
        topics: ['Pods en containers', 'Deployments en ReplicaSets', 'Services en endpoints', 'Namespaces']
      },
      {
        title: 'Configuration',
        topics: ['ConfigMaps en Secrets', 'Environment variables', 'Security contexts', 'Resource requests/limits']
      },
      {
        title: 'Multi-Container Patterns',
        topics: ['Sidecar pattern', 'Ambassador pattern', 'Adapter pattern', 'Init containers']
      },
      {
        title: 'CKAD Exam Prep',
        topics: ['Exam format en tips', 'Practice labs', 'Time management', 'Kubectl efficiency']
      }
    ]
  },

  'devsecops': {
    description: 'DevSecOps integreert security in elke fase van de DevOps lifecycle. Deze cursus leert je security-as-code implementeren, SAST/DAST tools gebruiken, container security, secret management, en compliance automation. Je leert threat modeling, secure pipelines bouwen, en security testing automatiseren. Perfect voor security engineers en DevOps teams die "shift left" security willen implementeren.',
    shortDescription: 'Security integration in DevOps met automated security testing',
    objectives: [
      'Implement security in CI/CD pipelines',
      'Use SAST tools (SonarQube, Snyk)',
      'Perform DAST en vulnerability scanning',
      'Secure containers en K8s deployments',
      'Manage secrets met HashiCorp Vault',
      'Automate compliance checks'
    ],
    prerequisites: [
      'DevOps ervaring',
      'CI/CD kennis',
      'Security awareness',
      'Infrastructure as Code basics'
    ],
    targetAudience: [
      'Security engineers',
      'DevOps engineers',
      'Platform teams',
      'Compliance officers'
    ],
    syllabus: [
      {
        title: 'DevSecOps Fundamentals',
        topics: ['Shift-left security', 'Threat modeling', 'Security in SDLC', 'DevSecOps culture']
      },
      {
        title: 'Security Testing Automation',
        topics: ['SAST met SonarQube', 'DAST tools', 'Dependency scanning (Snyk, Dependabot)', 'Container scanning']
      },
      {
        title: 'Secure Infrastructure',
        topics: ['Infrastructure as Code security', 'K8s security policies', 'Secret management (Vault)', 'Network security']
      },
      {
        title: 'Compliance en Monitoring',
        topics: ['Compliance as Code', 'Security monitoring', 'Incident response automation', 'Security metrics']
      }
    ]
  },

  // ========================================
  // DATABASES COURSES (11)
  // ========================================

  'milvus-vector-database': {
    description: 'Milvus is een open-source vector database voor AI applications, semantic search, en recommendation systems. Deze gespecialiseerde cursus leert je hoe je Milvus gebruikt voor embedding storage, similarity search met billions of vectors, en integration met machine learning models. Je leert indexing strategies, query optimization, en productie deployment. Perfect voor AI engineers die vector search willen implementeren.',
    shortDescription: 'Vector database voor AI applications en semantic search',
    objectives: [
      'Store en query vector embeddings',
      'Perform similarity search at scale',
      'Choose indexing strategies (FLAT, IVF, HNSW)',
      'Integrate met ML models (BERT, GPT)',
      'Optimize query performance',
      'Deploy Milvus in production'
    ],
    prerequisites: [
      'Basiskennis machine learning',
      'Python programming',
      'Embeddings concepten',
      'Database basics'
    ],
    targetAudience: [
      'AI/ML engineers',
      'Search engineers',
      'Data scientists',
      'Backend developers'
    ],
    syllabus: [
      {
        title: 'Vector Database Basics',
        topics: ['What are embeddings', 'Vector similarity metrics', 'Milvus architectuur', 'Collections en fields']
      },
      {
        title: 'Indexing en Search',
        topics: ['Index types (FLAT, IVF_FLAT, HNSW)', 'Search parameters tuning', 'Filtering', 'Hybrid search']
      },
      {
        title: 'ML Integration',
        topics: ['Generate embeddings met BERT/Sentence Transformers', 'Integration met LangChain', 'RAG patterns', 'Real-time indexing']
      },
      {
        title: 'Production Deployment',
        topics: ['Milvus cluster setup', 'Scaling strategies', 'Monitoring', 'Backup en migration']
      }
    ]
  },

  'azure-sql-database': {
    description: 'Azure SQL Database is Microsoft\'s managed relational database in the cloud. Deze cursus leert je Azure SQL deployen, databases migreren, performance tunen, en high availability configureren. Je leert werken met elastic pools, geo-replication, security features, en cost optimization. Perfect voor database administrators en developers die naar cloud databases migreren.',
    shortDescription: 'Managed SQL Server in Azure met HA, security en performance',
    objectives: [
      'Deploy en configure Azure SQL databases',
      'Migrate on-premises databases naar Azure',
      'Implement high availability en disaster recovery',
      'Tune performance met indexing en query optimization',
      'Configure security (TDE, Always Encrypted, firewall)',
      'Optimize costs met reserved capacity'
    ],
    prerequisites: [
      'SQL Server kennis',
      'T-SQL programming',
      'Azure basics',
      'Database administration fundamentals'
    ],
    targetAudience: [
      'Database administrators',
      'Cloud database engineers',
      'Application developers',
      'Data architects'
    ],
    syllabus: [
      {
        title: 'Azure SQL Fundamentals',
        topics: ['Deployment options', 'Service tiers (DTU vs vCore)', 'Elastic pools', 'Serverless']
      },
      {
        title: 'Migration',
        topics: ['Database Migration Service', 'Schema comparison', 'Data sync', 'Cutover strategies']
      },
      {
        title: 'Performance',
        topics: ['Query performance insights', 'Automatic tuning', 'Indexing strategies', 'In-memory OLTP']
      },
      {
        title: 'Security en HA',
        topics: ['Geo-replication', 'Auto-failover groups', 'TDE en Always Encrypted', 'Azure AD authentication']
      }
    ]
  },

  'ssis-sql-server-integration-services': {
    description: 'SSIS (SQL Server Integration Services) is Microsoft\'s ETL tool voor data integration. Deze cursus leert je SSIS packages bouwen in Visual Studio, data transformations implementeren, control flow en data flow ontwerpen, en packages deployen. Je leert werken met alle SSIS components: transformations, containers, event handlers. Perfect voor BI developers en data engineers in Microsoft ecosystemen.',
    shortDescription: 'ETL development met SSIS packages en transformations',
    objectives: [
      'Build SSIS packages in Visual Studio',
      'Design control flow en data flow',
      'Use transformations (Lookup, Merge, Aggregate, etc.)',
      'Implement error handling',
      'Deploy packages naar SSIS catalog',
      'Schedule met SQL Server Agent'
    ],
    prerequisites: [
      'SQL Server kennis',
      'T-SQL programming',
      'ETL concepten',
      'Visual Studio basics'
    ],
    targetAudience: [
      'BI developers',
      'Data engineers',
      'ETL developers',
      'Database developers'
    ],
    syllabus: [
      {
        title: 'SSIS Fundamentals',
        topics: ['SSIS architectuur', 'Control flow vs data flow', 'Variables en expressions', 'Connections']
      },
      {
        title: 'Data Flow Transformations',
        topics: ['Source en destination adapters', 'Lookup transformation', 'Conditional split', 'Merge en Union All']
      },
      {
        title: 'Advanced Features',
        topics: ['Foreach en For Loop containers', 'Event handlers', 'Logging', 'Parameterization']
      },
      {
        title: 'Deployment',
        topics: ['Project deployment model', 'SSIS catalog (SSISDB)', 'Environment configuration', 'Scheduling']
      }
    ]
  },

  'sql': {
    description: 'SQL is de universal taal voor databases. Deze complete introductiecursus leert je SQL van scratch: SELECT queries, JOINs, subqueries, aggregate functions, en data manipulation (INSERT, UPDATE, DELETE). Je leert werken met multiple tables, indexes, en query optimization basics. Met hands-on oefeningen op real databases bouw je solide SQL skills. Perfect voor beginners en analysts die databases willen bevragen.',
    shortDescription: 'Complete SQL fundamentals: queries, JOINs, aggregations en DML',
    objectives: [
      'Write SELECT queries met WHERE, ORDER BY, GROUP BY',
      'Join multiple tables (INNER, LEFT, RIGHT, FULL)',
      'Use aggregate functions (COUNT, SUM, AVG)',
      'Write subqueries en CTEs',
      'Insert, Update en Delete data',
      'Understand indexes en performance basics'
    ],
    prerequisites: [
      'Basiskennis computers',
      'Logisch denkvermogen',
      'Geen programmeerkennis vereist'
    ],
    targetAudience: [
      'Data analysts',
      'Business analysts',
      'Developers',
      'Anyone working with data'
    ],
    syllabus: [
      {
        title: 'SQL Basics',
        topics: ['SELECT statement', 'WHERE clause en filtering', 'Sorting met ORDER BY', 'DISTINCT']
      },
      {
        title: 'Multiple Tables',
        topics: ['INNER JOIN', 'LEFT/RIGHT/FULL OUTER JOIN', 'Self joins', 'UNION']
      },
      {
        title: 'Aggregations',
        topics: ['GROUP BY', 'COUNT, SUM, AVG, MIN, MAX', 'HAVING clause', 'Window functions intro']
      },
      {
        title: 'Advanced SQL',
        topics: ['Subqueries', 'CTEs (Common Table Expressions)', 'INSERT/UPDATE/DELETE', 'Transactions basics']
      }
    ]
  },

  'oracle-sql': {
    description: 'Oracle SQL leert je werken met Oracle Database, de enterprise database gebruikt door Fortune 500 companies. Deze cursus behandelt Oracle-specific SQL syntax, PL/SQL basics, Oracle functions, en performance tuning. Je leert queries schrijven voor Oracle, stored procedures bouwen, en Oracle-specific features gebruiken. Perfect voor developers en DBAs die Oracle databases moeten bevragen en beheren.',
    shortDescription: 'Oracle Database SQL queries en PL/SQL programming',
    objectives: [
      'Write Oracle SQL queries',
      'Use Oracle-specific functions (DECODE, NVL)',
      'Write PL/SQL stored procedures',
      'Work met packages en triggers',
      'Understand Oracle execution plans',
      'Tune query performance'
    ],
    prerequisites: [
      'SQL basics',
      'Database fundamentals',
      'Programming logic begrip'
    ],
    targetAudience: [
      'Oracle developers',
      'Database administrators',
      'Data analysts in Oracle environments',
      'PL/SQL programmers'
    ],
    syllabus: [
      {
        title: 'Oracle SQL Fundamentals',
        topics: ['Oracle-specific syntax', 'DUAL table', 'Oracle functions (DECODE, NVL, NVL2)', 'Hierarchical queries']
      },
      {
        title: 'PL/SQL Basics',
        topics: ['PL/SQL blocks', 'Variables en datatypes', 'Control structures', 'Exception handling']
      },
      {
        title: 'Stored Procedures',
        topics: ['Procedures en functions', 'Packages', 'Cursors', 'Triggers']
      },
      {
        title: 'Performance',
        topics: ['Execution plans (EXPLAIN PLAN)', 'Indexes in Oracle', 'Hints', 'Query tuning']
      }
    ]
  },

  'oracle-apex-professional': {
    description: 'Oracle APEX (Application Express) is een low-code platform voor het bouwen van enterprise web applications op Oracle Database. Deze cursus leert je complete APEX applications bouwen: interactive reports, forms, charts, en dashboards. Je leert werken met APEX components, dynamic actions, en RESTful services. Perfect voor developers die snel database-driven web apps willen bouwen zonder veel front-end coding.',
    shortDescription: 'Low-code web application development op Oracle Database',
    objectives: [
      'Build APEX applications from scratch',
      'Create interactive reports en forms',
      'Design responsive UI met Universal Theme',
      'Implement dynamic actions',
      'Integrate RESTful Web Services',
      'Deploy en secure APEX apps'
    ],
    prerequisites: [
      'SQL kennis',
      'Oracle Database basics',
      'Web development begrip helpt',
      'PL/SQL basics aanbevolen'
    ],
    targetAudience: [
      'Oracle developers',
      'Database developers',
      'Business application developers',
      'Citizen developers'
    ],
    syllabus: [
      {
        title: 'APEX Fundamentals',
        topics: ['APEX architecture', 'Workspace setup', 'Application Builder', 'SQL Workshop']
      },
      {
        title: 'Building Applications',
        topics: ['Pages en regions', 'Interactive reports', 'Forms', 'Charts en dashboards']
      },
      {
        title: 'Advanced Features',
        topics: ['Dynamic actions', 'Computations en validations', 'Processes', 'RESTful Web Services']
      },
      {
        title: 'Deployment',
        topics: ['Authentication en authorization', 'Themes en templates', 'Packaging', 'Performance tuning']
      }
    ]
  },

  'oracle-spatial': {
    description: 'Oracle Spatial (nu Oracle Spatial and Graph) brengt geographic information system (GIS) capabilities naar Oracle Database. Deze gespecialiseerde cursus leert je spatial data types gebruiken, geographic queries schrijven, spatial indexing, en integration met mapping tools. Je leert werken met coordinates, polygons, en spatial analysis. Perfect voor GIS developers en analysts die location-based applications bouwen.',
    shortDescription: 'GIS en spatial data analysis in Oracle Database',
    objectives: [
      'Store spatial data in Oracle',
      'Write spatial queries (SDO_GEOMETRY)',
      'Perform spatial analysis (distance, intersection)',
      'Use spatial indexes',
      'Integrate met mapping tools',
      'Build location-based applications'
    ],
    prerequisites: [
      'Oracle SQL kennis',
      'GIS concepten basics',
      'Database fundamentals',
      'Coordinate systems begrip'
    ],
    targetAudience: [
      'GIS developers',
      'Spatial data analysts',
      'Oracle developers',
      'Location-based app builders'
    ],
    syllabus: [
      {
        title: 'Spatial Data Fundamentals',
        topics: ['SDO_GEOMETRY datatype', 'Coordinate systems', 'Points, lines, polygons', 'Spatial metadata']
      },
      {
        title: 'Spatial Queries',
        topics: ['Distance queries', 'Intersection en overlap', 'Within en contains', 'Buffering']
      },
      {
        title: 'Indexing en Performance',
        topics: ['R-tree spatial index', 'Query optimization', 'Bulk operations', 'Performance tuning']
      },
      {
        title: 'Applications',
        topics: ['Integration met ArcGIS, QGIS', 'Web mapping', 'Geocoding', 'Network analysis']
      }
    ]
  },

  'mongodb': {
    description: 'MongoDB is de leading document database voor modern applications. Deze intensieve cursus leert je MongoDB van scratch: document model, CRUD operations, aggregation framework, indexing, en replica sets. Je leert schema design voor NoSQL, sharding voor horizontal scaling, en integration met Node.js/Python. Perfect voor developers die schaalbare, flexible databases willen bouwen.',
    shortDescription: 'Document database met MongoDB: CRUD, aggregation en scaling',
    objectives: [
      'Work met MongoDB document model',
      'Perform CRUD operations',
      'Master aggregation framework',
      'Design efficient schemas',
      'Implement replica sets voor HA',
      'Scale met sharding'
    ],
    prerequisites: [
      'Programming ervaring (JavaScript, Python)',
      'Database basics',
      'JSON begrip',
      'Command line basics'
    ],
    targetAudience: [
      'Backend developers',
      'Full-stack developers',
      'Database engineers',
      'NoSQL beginners'
    ],
    syllabus: [
      {
        title: 'MongoDB Fundamentals',
        topics: ['Document model vs relational', 'CRUD operations', 'Query operators', 'mongosh basics']
      },
      {
        title: 'Aggregation',
        topics: ['Aggregation pipeline', '$match, $group, $project', 'Pipeline optimization', 'Lookup joins']
      },
      {
        title: 'Schema Design',
        topics: ['Embedding vs referencing', 'One-to-many patterns', 'Polymorphic schemas', 'Indexing strategies']
      },
      {
        title: 'Scaling',
        topics: ['Replica sets', 'Read preferences', 'Sharding architecture', 'Cluster management']
      }
    ]
  },

  'redis': {
    description: 'Redis is een in-memory data structure store gebruikt voor caching, session storage, pub/sub, en real-time analytics. Deze hands-on cursus leert je Redis data structures (strings, hashes, lists, sets, sorted sets), caching patterns, pub/sub messaging, en Redis Cluster voor high availability. Perfect voor backend developers die application performance willen boosten.',
    shortDescription: 'In-memory data store voor caching, sessions en real-time data',
    objectives: [
      'Use Redis data structures',
      'Implement caching patterns',
      'Build pub/sub messaging',
      'Configure persistence (RDB, AOF)',
      'Setup Redis Cluster',
      'Integrate met applications (Python, Node.js)'
    ],
    prerequisites: [
      'Programming ervaring',
      'Backend development basics',
      'Database concepten',
      'Linux command line'
    ],
    targetAudience: [
      'Backend developers',
      'DevOps engineers',
      'Full-stack developers',
      'Performance engineers'
    ],
    syllabus: [
      {
        title: 'Redis Basics',
        topics: ['In-memory storage model', 'Data structures: strings, hashes, lists', 'Sets en sorted sets', 'Redis CLI']
      },
      {
        title: 'Caching Patterns',
        topics: ['Cache-aside pattern', 'Write-through cache', 'TTL en expiration', 'Cache invalidation']
      },
      {
        title: 'Advanced Features',
        topics: ['Pub/sub messaging', 'Transactions', 'Lua scripting', 'Streams']
      },
      {
        title: 'Production Deployment',
        topics: ['Persistence (RDB vs AOF)', 'Redis Sentinel voor HA', 'Redis Cluster', 'Monitoring']
      }
    ]
  },

  'performance-tuning-in-oracle-database': {
    description: 'Deze geavanceerde cursus leert je Oracle Database performance systematisch tunen. Je leert execution plans lezen, query optimization, indexing strategies, SQL tuning, memory management, en I/O optimization. Met real-world scenarios learn je bottlenecks identificeren en oplossen. Perfect voor senior DBAs en performance engineers die Oracle databases moeten optimaliseren.',
    shortDescription: 'Advanced Oracle performance tuning en query optimization',
    objectives: [
      'Analyze execution plans met EXPLAIN PLAN',
      'Tune SQL queries voor optimal performance',
      'Design indexing strategies',
      'Configure SGA en PGA memory',
      'Optimize I/O en storage',
      'Use AWR en ASH reports'
    ],
    prerequisites: [
      'Oracle SQL expertise',
      'PL/SQL kennis',
      'Oracle architecture begrip',
      'Database administration ervaring'
    ],
    targetAudience: [
      'Senior Oracle DBAs',
      'Performance engineers',
      'Database architects',
      'Oracle consultants'
    ],
    syllabus: [
      {
        title: 'Performance Methodology',
        topics: ['Wait events analysis', 'AWR reports', 'ASH (Active Session History)', 'Performance baseline']
      },
      {
        title: 'SQL Tuning',
        topics: ['Execution plan analysis', 'Query transformations', 'Hints', 'SQL Tuning Advisor']
      },
      {
        title: 'Indexing',
        topics: ['B-tree vs bitmap indexes', 'Index design strategies', 'Partitioned indexes', 'Index monitoring']
      },
      {
        title: 'Memory en I/O',
        topics: ['SGA sizing (buffer cache, shared pool)', 'PGA configuration', 'I/O optimization', 'Storage tuning']
      }
    ]
  },

  'sql-server-business-intelligence': {
    description: 'SQL Server Business Intelligence cursus behandelt de complete Microsoft BI stack: SSIS voor ETL, SSAS voor OLAP cubes, SSRS voor reporting, en integration met Power BI. Je leert data warehouses bouwen, cubes ontwerpen, en enterprise reporting implementeren. Perfect voor BI developers die end-to-end Microsoft BI oplossingen willen bouwen.',
    shortDescription: 'Complete Microsoft BI stack: SSIS, SSAS, SSRS en Power BI integration',
    objectives: [
      'Build ETL pipelines met SSIS',
      'Design OLAP cubes met SSAS',
      'Create reports met SSRS',
      'Integrate met Power BI',
      'Implement data warehouses',
      'Deploy BI solutions'
    ],
    prerequisites: [
      'SQL Server kennis',
      'T-SQL programming',
      'Data warehousing concepten',
      'BI basics'
    ],
    targetAudience: [
      'BI developers',
      'Data warehouse developers',
      'SQL Server professionals',
      'Enterprise BI teams'
    ],
    syllabus: [
      {
        title: 'Data Warehousing',
        topics: ['Star schema design', 'Slowly Changing Dimensions', 'Fact tables', 'ETL best practices']
      },
      {
        title: 'SSIS (Integration Services)',
        topics: ['Package development', 'Data flow transformations', 'Deployment', 'Performance']
      },
      {
        title: 'SSAS (Analysis Services)',
        topics: ['Tabular vs Multidimensional', 'Cube design', 'DAX formulas', 'MDX queries']
      },
      {
        title: 'SSRS en Power BI',
        topics: ['SSRS report development', 'Subscriptions', 'Power BI integration', 'Mobile BI']
      }
    ]
  },

  // ========================================
  // PROGRAMMEREN & DEVELOPMENT (4)
  // ========================================

  'basisprincipes-programmeren': {
    description: 'Leer programmeren van scratch met deze beginner-friendly cursus. Je leert fundamentele programming concepten: variables, data types, control structures (if/else, loops), functions, en basic algorithms. De cursus gebruikt Python voor hands-on exercises maar concepten zijn taal-onafhankelijk. Met praktische oefeningen bouw je een solide programming foundation. Perfect voor complete beginners die willen leren coderen.',
    shortDescription: 'Programming fundamentals voor beginners met Python',
    objectives: [
      'Begrijp variables, data types en operators',
      'Use control structures (if/else, loops)',
      'Write functions en understand scope',
      'Work met lists, dictionaries en strings',
      'Debug code systematically',
      'Solve problems met algorithms'
    ],
    prerequisites: [
      'Geen programmeerkennis vereist',
      'Computer basics',
      'Logisch denkvermogen',
      'Motivatie om te leren'
    ],
    targetAudience: [
      'Programming beginners',
      'Career switchers',
      'Students',
      'Anyone interested in coding'
    ],
    syllabus: [
      {
        title: 'Programming Basics',
        topics: ['What is programming?', 'Variables en data types', 'Input/output', 'Basic operators']
      },
      {
        title: 'Control Flow',
        topics: ['If/else statements', 'While loops', 'For loops', 'Boolean logic']
      },
      {
        title: 'Functions en Data Structures',
        topics: ['Defining functions', 'Parameters en return values', 'Lists en dictionaries', 'String manipulation']
      },
      {
        title: 'Problem Solving',
        topics: ['Debugging techniques', 'Basic algorithms', 'Code organization', 'Best practices']
      }
    ]
  },

  'python-met-chatgpt': {
    description: 'Leer Python programmeren met hulp van ChatGPT als je AI coding assistant. Deze moderne cursus combineert Python fundamentals met AI-assisted development: gebruik ChatGPT voor code generation, debugging, learning nieuwe libraries, en code review. Je leert effectieve prompts schrijven voor programming tasks en AI output evalueren. Perfect voor beginners die Python willen leren met moderne AI tools.',
    shortDescription: 'Python programming met ChatGPT als AI coding assistant',
    objectives: [
      'Learn Python basics (syntax, data types, control flow)',
      'Use ChatGPT voor code generation',
      'Debug code met AI assistance',
      'Write effective prompts voor programming',
      'Evaluate en improve AI-generated code',
      'Build Python projects with AI help'
    ],
    prerequisites: [
      'Geen programmeerkennis vereist',
      'Computer basics',
      'ChatGPT account (free tier OK)',
      'Motivation to learn'
    ],
    targetAudience: [
      'Programming beginners',
      'Python learners',
      'AI-curious developers',
      'Career switchers'
    ],
    syllabus: [
      {
        title: 'Python + AI Basics',
        topics: ['Python setup', 'ChatGPT for learning', 'Variables en functions', 'Prompting techniques']
      },
      {
        title: 'AI-Assisted Development',
        topics: ['Code generation with ChatGPT', 'Debugging strategies', 'Explaining code', 'Code refactoring']
      },
      {
        title: 'Python Libraries',
        topics: ['Learning libraries with AI', 'Pandas, NumPy basics', 'Web scraping', 'API integration']
      },
      {
        title: 'Projects',
        topics: ['Build calculator app', 'Data analysis project', 'Web scraper', 'API client']
      }
    ]
  },

  'r-programmeren': {
    description: 'R is de taal voor statistiek en data science. Deze cursus leert je R van scratch: data structures (vectors, data frames), data manipulation met tidyverse, visualisatie met ggplot2, en statistical analysis. Je leert werken in RStudio, reproducible research met R Markdown, en packages gebruiken. Perfect voor statisticians, data analysts en researchers.',
    shortDescription: 'Statistical programming met R, tidyverse en ggplot2',
    objectives: [
      'Master R syntax en data structures',
      'Manipulate data met dplyr en tidyr',
      'Create visualizations met ggplot2',
      'Perform statistical analyses',
      'Write R Markdown reports',
      'Use R packages effectively'
    ],
    prerequisites: [
      'Statistiek basics',
      'Data analyse begrip',
      'Geen programmeerkennis vereist',
      'Logisch denkvermogen'
    ],
    targetAudience: [
      'Statisticians',
      'Data analysts',
      'Researchers',
      'Scientists in any domain'
    ],
    syllabus: [
      {
        title: 'R Fundamentals',
        topics: ['RStudio environment', 'Vectors, matrices, data frames', 'Functions', 'Packages']
      },
      {
        title: 'Tidyverse',
        topics: ['dplyr for data manipulation', 'tidyr for reshaping', 'Pipe operator %>%', 'Reading data']
      },
      {
        title: 'Visualization',
        topics: ['ggplot2 grammar of graphics', 'Common plot types', 'Customization', 'Themes']
      },
      {
        title: 'Statistical Analysis',
        topics: ['Descriptive statistics', 'Hypothesis testing', 'Linear regression', 'R Markdown']
      }
    ]
  },

  'oracle-bpm-suite': {
    description: 'Oracle BPM Suite is een enterprise platform voor business process management en workflow automation. Deze geavanceerde cursus leert je BPMN 2.0 processes modelleren, workflows implementeren, business rules definiëren, en integration met Oracle applications. Je leert Oracle JDeveloper gebruiken voor BPM development. Perfect voor enterprise architects en BPM developers in Oracle ecosystemen.',
    shortDescription: 'Enterprise business process management met Oracle BPM Suite',
    objectives: [
      'Model processes met BPMN 2.0',
      'Develop BPM applications in JDeveloper',
      'Implement human workflows',
      'Define business rules',
      'Integrate met Oracle SOA Suite',
      'Monitor process analytics'
    ],
    prerequisites: [
      'Java basics',
      'Oracle fundamentals',
      'BPMN concepten',
      'Enterprise architecture begrip'
    ],
    targetAudience: [
      'BPM developers',
      'Enterprise architects',
      'Oracle consultants',
      'Workflow developers'
    ],
    syllabus: [
      {
        title: 'BPM Fundamentals',
        topics: ['BPMN 2.0 notation', 'Oracle BPM architecture', 'JDeveloper setup', 'Process modeling']
      },
      {
        title: 'Process Development',
        topics: ['Human tasks', 'Service tasks', 'Gateways en events', 'Data objects']
      },
      {
        title: 'Business Rules en Forms',
        topics: ['Decision tables', 'Business rules', 'Web forms design', 'UI customization']
      },
      {
        title: 'Integration en Deployment',
        topics: ['SOA Suite integration', 'Web services', 'Deployment', 'Process monitoring']
      }
    ]
  },

  // ========================================
  // BEVEILIGING (4)
  // ========================================

  'aws-security': {
    description: 'AWS Security leert je hoe je AWS omgevingen beveiligt volgens best practices en prepareert voor AZ-500 certificering. Deze cursus behandelt IAM in detail, network security (VPC, Security Groups, NACLs), encryption, GuardDuty, Security Hub, en compliance. Je leert security automation, incident response, en AWS security services. Perfect voor security engineers en cloud architects.',
    shortDescription: 'Complete AWS security en voorbereiding voor AWS Security Specialty',
    objectives: [
      'Implement least privilege met IAM',
      'Secure VPC networking',
      'Encrypt data at rest en in transit',
      'Use GuardDuty en Security Hub',
      'Automate security compliance',
      'Respond to security incidents'
    ],
    prerequisites: [
      'AWS fundamentals',
      'Networking basics',
      'Security awareness',
      'Linux en scripting helpen'
    ],
    targetAudience: [
      'Security engineers',
      'Cloud security architects',
      'DevSecOps engineers',
      'AWS certification candidates'
    ],
    syllabus: [
      {
        title: 'IAM en Identity',
        topics: ['IAM policies deep dive', 'Role assumption', 'STS tokens', 'SSO integration']
      },
      {
        title: 'Network Security',
        topics: ['VPC security design', 'Security Groups vs NACLs', 'AWS WAF', 'Shield voor DDoS']
      },
      {
        title: 'Data Protection',
        topics: ['KMS encryption', 'S3 bucket security', 'RDS encryption', 'Secrets Manager']
      },
      {
        title: 'Security Operations',
        topics: ['CloudTrail logging', 'GuardDuty threat detection', 'Security Hub', 'Incident response']
      }
    ]
  },

  'azure-security-technologies-az-500': {
    description: 'Deze cursus bereidt je voor op het AZ-500 Azure Security Technologies examen. Je leert Azure identity en access management, platform protection, security operations, en data/application security. Met hands-on labs implementeer je security controls, configureer Azure Security Center, en automatiseer compliance. Perfect voor Azure security professionals die willen certificeren.',
    shortDescription: 'Azure security en AZ-500 certificering voorbereiding',
    objectives: [
      'Manage Azure AD identities en access',
      'Implement platform protection (network, host, container)',
      'Configure Azure Security Center',
      'Monitor security met Sentinel',
      'Secure data en applications',
      'Pass AZ-500 exam'
    ],
    prerequisites: [
      'Azure fundamentals (AZ-900)',
      'Azure administration ervaring',
      'Security basics',
      'Networking kennis'
    ],
    targetAudience: [
      'Azure security engineers',
      'Cloud security architects',
      'Azure administrators',
      'AZ-500 certification candidates'
    ],
    syllabus: [
      {
        title: 'Identity en Access',
        topics: ['Azure AD features', 'Conditional Access', 'MFA', 'PIM (Privileged Identity Management)']
      },
      {
        title: 'Platform Protection',
        topics: ['Network security', 'VM security', 'Container security', 'Azure Firewall']
      },
      {
        title: 'Security Operations',
        topics: ['Azure Security Center', 'Azure Sentinel SIEM', 'Log Analytics', 'Security playbooks']
      },
      {
        title: 'Data en Apps',
        topics: ['Azure Key Vault', 'Storage security', 'SQL Database security', 'App Service security']
      }
    ]
  },

  'microsoft-365-security': {
    description: 'Microsoft 365 Security leert je hoe je Microsoft 365 tenant beveiligt: identity protection, threat protection, information protection, en compliance. Je leert werken met Defender for Office 365, DLP policies, Conditional Access, en compliance tools. Perfect voor IT administrators en security teams die Microsoft 365 omgevingen moeten beveiligen.',
    shortDescription: 'Secure Microsoft 365 met Defender, DLP en compliance tools',
    objectives: [
      'Implement identity protection met Azure AD',
      'Configure Defender for Office 365',
      'Setup DLP (Data Loss Prevention)',
      'Manage information protection labels',
      'Configure compliance policies',
      'Investigate security incidents'
    ],
    prerequisites: [
      'Microsoft 365 basics',
      'Azure AD fundamentals',
      'Security awareness',
      'Compliance begrip'
    ],
    targetAudience: [
      'Microsoft 365 administrators',
      'Security administrators',
      'Compliance officers',
      'IT security teams'
    ],
    syllabus: [
      {
        title: 'Identity Security',
        topics: ['Azure AD security features', 'Conditional Access policies', 'MFA enforcement', 'Identity Protection']
      },
      {
        title: 'Threat Protection',
        topics: ['Defender for Office 365', 'Anti-phishing policies', 'Safe Attachments/Links', 'Attack simulation']
      },
      {
        title: 'Information Protection',
        topics: ['Sensitivity labels', 'DLP policies', 'Encryption (AIP)', 'Insider risk management']
      },
      {
        title: 'Compliance',
        topics: ['Compliance Manager', 'eDiscovery', 'Retention policies', 'Audit logs']
      }
    ]
  },

  'microsoft-sentinel': {
    description: 'Microsoft Sentinel is Azure\'s cloud-native SIEM en SOAR solution. Deze cursus leert je Sentinel deployen, data sources onboarden, KQL queries schrijven voor threat hunting, analytics rules configureren, en security playbooks bouwen voor automated response. Je leert threat investigation en incident management. Perfect voor SOC analysts en security engineers.',
    shortDescription: 'Cloud-native SIEM/SOAR met Microsoft Sentinel en threat hunting',
    objectives: [
      'Deploy en configure Sentinel workspace',
      'Onboard data sources (Azure, on-prem, third-party)',
      'Write KQL queries voor threat hunting',
      'Create analytics rules',
      'Build automated playbooks met Logic Apps',
      'Investigate en respond to incidents'
    ],
    prerequisites: [
      'Azure fundamentals',
      'Security operations basics',
      'Log analysis ervaring',
      'KQL kennis is een plus'
    ],
    targetAudience: [
      'SOC analysts',
      'Security engineers',
      'Threat hunters',
      'Incident responders'
    ],
    syllabus: [
      {
        title: 'Sentinel Setup',
        topics: ['Workspace creation', 'Data connectors', 'Log ingestion', 'Cost management']
      },
      {
        title: 'Threat Detection',
        topics: ['KQL query language', 'Analytics rules', 'Machine learning detections', 'Threat intelligence']
      },
      {
        title: 'Investigation',
        topics: ['Incident investigation', 'Entity behavior analytics', 'Investigation graphs', 'Notebooks']
      },
      {
        title: 'Automation',
        topics: ['Playbooks met Logic Apps', 'Automated response', 'SOAR workflows', 'Integration met ITSM']
      }
    ]
  },

  // ========================================
  // APIS & SCRIPTING (4)
  // ========================================

  'powershell': {
    description: 'PowerShell is Microsoft\'s automation framework voor Windows, Azure en cloud management. Deze cursus leert je PowerShell scripting van scratch: cmdlets, pipelines, objects, functions, en automation. Je leert Active Directory beheren, Azure resources managen, en repetitive tasks automatiseren. Perfect voor Windows administrators en DevOps engineers.',
    shortDescription: 'Windows en Azure automation met PowerShell scripting',
    objectives: [
      'Master PowerShell syntax en cmdlets',
      'Work met objects en pipelines',
      'Write functions en modules',
      'Automate Windows administration',
      'Manage Azure resources met Azure PowerShell',
      'Handle errors en debugging'
    ],
    prerequisites: [
      'Windows basics',
      'System administration kennis',
      'Command line ervaring',
      'Scripting concepten helpen'
    ],
    targetAudience: [
      'Windows administrators',
      'Azure administrators',
      'DevOps engineers',
      'System engineers'
    ],
    syllabus: [
      {
        title: 'PowerShell Fundamentals',
        topics: ['Cmdlets en syntax', 'Pipeline', 'Objects', 'Help system', 'Get, Set, New, Remove patterns']
      },
      {
        title: 'Scripting',
        topics: ['Variables en data types', 'Control flow (if, switch, loops)', 'Functions', 'Error handling']
      },
      {
        title: 'Administration',
        topics: ['Active Directory management', 'File system operations', 'Registry', 'WMI/CIM']
      },
      {
        title: 'Azure Automation',
        topics: ['Azure PowerShell module', 'Resource management', 'Runbooks', 'Automation scenarios']
      }
    ]
  },

  'api-development': {
    description: 'API Development leert je RESTful APIs bouwen van scratch. Deze hands-on cursus behandelt API design principles, HTTP methods, authentication (OAuth, JWT), documentation met OpenAPI/Swagger, versioning, en testing. Je bouwt APIs met Node.js/Express of Python/FastAPI. Perfect voor backend developers die professional APIs willen bouwen.',
    shortDescription: 'RESTful API development met authentication, documentation en testing',
    objectives: [
      'Design RESTful APIs volgens best practices',
      'Implement authentication (JWT, OAuth2)',
      'Document APIs met OpenAPI/Swagger',
      'Handle errors en validation',
      'Version APIs properly',
      'Test APIs met Postman/automated tests'
    ],
    prerequisites: [
      'Programming kennis (JavaScript of Python)',
      'HTTP basics',
      'Database fundamentals',
      'JSON begrip'
    ],
    targetAudience: [
      'Backend developers',
      'Full-stack developers',
      'API engineers',
      'Integration specialists'
    ],
    syllabus: [
      {
        title: 'API Fundamentals',
        topics: ['REST principles', 'HTTP methods (GET, POST, PUT, DELETE)', 'Status codes', 'Headers']
      },
      {
        title: 'API Development',
        topics: ['Framework setup (Express/FastAPI)', 'Routing', 'Request validation', 'Error handling']
      },
      {
        title: 'Security',
        topics: ['Authentication strategies', 'JWT tokens', 'OAuth2 flow', 'API keys', 'Rate limiting']
      },
      {
        title: 'Documentation en Testing',
        topics: ['OpenAPI/Swagger', 'API documentation', 'Postman testing', 'Unit en integration tests']
      }
    ]
  },

  'rest-services': {
    description: 'REST Services leert je RESTful web services consumeren en bouwen. Deze cursus behandelt REST architectuur, HTTP protocol in detail, JSON/XML, CRUD operations, en client-side API consumption. Je leert APIs integreren in applicaties, error handling, en authentication flows. Perfect voor developers die APIs moeten gebruiken in hun applicaties.',
    shortDescription: 'RESTful web services: consumption, integration en best practices',
    objectives: [
      'Understand REST architectural style',
      'Consume REST APIs met HTTP clients',
      'Handle JSON en XML responses',
      'Implement authentication flows',
      'Handle errors gracefully',
      'Build simple REST services'
    ],
    prerequisites: [
      'Programming basics',
      'HTTP basics',
      'JSON begrip',
      'Web development fundamentals'
    ],
    targetAudience: [
      'Application developers',
      'Frontend developers',
      'Integration developers',
      'API users'
    ],
    syllabus: [
      {
        title: 'REST Fundamentals',
        topics: ['REST principles', 'Resources en URIs', 'HTTP methods', 'Statelessness']
      },
      {
        title: 'API Consumption',
        topics: ['HTTP clients (fetch, axios, requests)', 'Parsing JSON/XML', 'Query parameters', 'Headers']
      },
      {
        title: 'Authentication',
        topics: ['API keys', 'Bearer tokens', 'OAuth flow', 'Token refresh']
      },
      {
        title: 'Building REST APIs',
        topics: ['Simple API with Flask/Express', 'CRUD endpoints', 'Error responses', 'Testing']
      }
    ]
  },

  'graphql': {
    description: 'GraphQL is een modern query language voor APIs dat clients laat specificeren exact welke data ze nodig hebben. Deze cursus leert je GraphQL schema\'s ontwerpen, resolvers implementeren, queries en mutations schrijven, en GraphQL servers bouwen met Apollo Server. Je leert ook client-side GraphQL met Apollo Client. Perfect voor developers die flexible, efficient APIs willen bouwen.',
    shortDescription: 'Modern API development met GraphQL, Apollo Server en schema design',
    objectives: [
      'Design GraphQL schemas',
      'Implement resolvers',
      'Write queries, mutations en subscriptions',
      'Build GraphQL server met Apollo',
      'Use Apollo Client voor frontend',
      'Handle authentication en authorization'
    ],
    prerequisites: [
      'JavaScript/TypeScript kennis',
      'Backend development basics',
      'REST APIs begrip',
      'Database fundamentals'
    ],
    targetAudience: [
      'Backend developers',
      'Full-stack developers',
      'API developers',
      'Frontend developers interested in GraphQL'
    ],
    syllabus: [
      {
        title: 'GraphQL Fundamentals',
        topics: ['GraphQL vs REST', 'Schema Definition Language', 'Types: Object, Scalar, Enum', 'Queries en mutations']
      },
      {
        title: 'Server Development',
        topics: ['Apollo Server setup', 'Resolvers', 'Data sources', 'Context en dataloaders']
      },
      {
        title: 'Advanced Features',
        topics: ['Subscriptions voor real-time', 'Authentication', 'Authorization', 'Error handling']
      },
      {
        title: 'Client Integration',
        topics: ['Apollo Client setup', 'Queries en mutations in React', 'Caching', 'Optimistic UI']
      }
    ]
  }
};

/**
 * Get course description by slug
 * Falls back to improved generic template if specific description not found
 */
export function getCourseDescription(slug: string, courseName: string, category: string): CourseDescription {
  if (courseDescriptions[slug]) {
    return courseDescriptions[slug];
  }

  // Improved fallback - better than current generic template
  return {
    description: `Professionele ${courseName} training voor IT professionals en developers. In deze hands-on cursus leer je de essentiële vaardigheden en best practices voor ${courseName}. De training combineert theorie met praktijk en leert je direct toepasbare technieken die je meteen in je werk kunt gebruiken. Je werkt aan realistische oefeningen en cases uit de praktijk.`,
    shortDescription: `Master ${courseName} met praktische hands-on training`,
    objectives: [
      `Begrijp de kernconcepten van ${courseName}`,
      `Implementeer best practices voor ${category.toLowerCase()}`,
      `Los praktische problemen op met ${courseName}`,
      `Bouw productie-klare oplossingen`
    ],
    prerequisites: [
      'Basiskennis IT en programmeren',
      'Ervaring met gerelateerde technologieën aanbevolen',
      'Laptop met admin rechten voor hands-on labs'
    ],
    targetAudience: [
      'Software developers',
      'IT professionals',
      'Technical leads en architects',
      'DevOps engineers'
    ],
    syllabus: [
      {
        title: `${courseName} Fundamentals`,
        topics: [
          'Kernconcepten en architectuur',
          'Setup en configuratie',
          'Best practices en design patterns',
          'Hands-on lab: Eerste project'
        ]
      },
      {
        title: 'Advanced Topics',
        topics: [
          'Geavanceerde technieken',
          'Performance optimization',
          'Security en compliance',
          'Productie deployment'
        ]
      }
    ]
  };
}
