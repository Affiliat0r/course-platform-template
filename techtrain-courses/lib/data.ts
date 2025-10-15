import { Course } from "@/types";

export const courses: Course[] = [
  {
    id: '1',
    title: 'Advanced Cyber Security Architect',
    slug: 'advanced-cyber-security-architect',
    description: 'Master advanced cybersecurity architecture concepts and implement robust security solutions for enterprise environments.',
    shortDescription: 'Learn to design and implement enterprise-level security architectures.',
    price: 1399,
    duration: '3 days',
    language: 'en',
    format: 'classroom',
    category: 'Cyber Security',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    objectives: [
      'Implement security architectures',
      'Design threat mitigation strategies',
      'Secure enterprise environments',
      'Conduct security assessments'
    ],
    prerequisites: ['Basic networking knowledge', 'Understanding of security concepts'],
    targetAudience: ['Security Architects', 'IT Professionals', 'System Administrators'],
    syllabus: [
      {
        title: 'Security Architecture Fundamentals',
        topics: ['Architecture patterns', 'Security frameworks', 'Risk assessment']
      },
      {
        title: 'Advanced Threat Detection',
        topics: ['SIEM systems', 'Intrusion detection', 'Incident response']
      }
    ],
    instructor: {
      name: 'Dr. Sarah Johnson',
      bio: 'Certified Security Architect with 15+ years of experience in enterprise security.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
    },
    dates: [
      new Date('2025-11-10'),
      new Date('2025-11-17'),
      new Date('2025-12-01')
    ]
  },
  {
    id: '2',
    title: 'Cloud Native with Docker & Kubernetes',
    slug: 'cloud-native-docker-kubernetes',
    description: 'Build and deploy cloud-native applications using Docker containers and Kubernetes orchestration.',
    shortDescription: 'Master containerization and orchestration for modern cloud applications.',
    price: 1399,
    duration: '4 days',
    language: 'en',
    format: 'virtual',
    category: 'DevOps & Containers',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    objectives: [
      'Master Docker containerization',
      'Deploy applications with Kubernetes',
      'Implement CI/CD pipelines',
      'Manage microservices architecture'
    ],
    prerequisites: ['Linux basics', 'Command line experience'],
    targetAudience: ['DevOps Engineers', 'Developers', 'System Administrators'],
    syllabus: [
      {
        title: 'Docker Fundamentals',
        topics: ['Container basics', 'Docker images', 'Docker Compose']
      },
      {
        title: 'Kubernetes Essentials',
        topics: ['Pods and Services', 'Deployments', 'Scaling applications']
      }
    ],
    instructor: {
      name: 'Michael Chen',
      bio: 'Cloud architect and Kubernetes expert with extensive experience in enterprise deployments.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    },
    dates: [
      new Date('2025-11-12'),
      new Date('2025-11-25'),
      new Date('2025-12-10')
    ]
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    slug: 'data-science-fundamentals',
    description: 'Learn the foundations of data science including statistics, machine learning, and data visualization.',
    shortDescription: 'Start your journey in data science with practical, hands-on training.',
    price: 899,
    duration: '3 days',
    language: 'en',
    format: 'classroom',
    category: 'Data & Data Science',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    objectives: [
      'Understand data science workflows',
      'Apply statistical analysis',
      'Build machine learning models',
      'Create data visualizations'
    ],
    prerequisites: ['Basic Python knowledge', 'Mathematical fundamentals'],
    targetAudience: ['Data Analysts', 'Business Analysts', 'Aspiring Data Scientists'],
    syllabus: [
      {
        title: 'Data Analysis Basics',
        topics: ['Python for data science', 'Pandas and NumPy', 'Data cleaning']
      },
      {
        title: 'Machine Learning Intro',
        topics: ['Supervised learning', 'Model evaluation', 'Feature engineering']
      }
    ],
    instructor: {
      name: 'Dr. Emily Watson',
      bio: 'Data scientist with PhD in Statistics and 10 years of industry experience.',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
    },
    dates: [
      new Date('2025-11-15'),
      new Date('2025-12-05'),
      new Date('2025-12-20')
    ]
  },
  {
    id: '4',
    title: 'AWS Cloud Solutions Architect',
    slug: 'aws-cloud-solutions-architect',
    description: 'Design and deploy scalable, highly available systems on AWS cloud platform.',
    shortDescription: 'Become an AWS certified solutions architect.',
    price: 1299,
    duration: '4 days',
    language: 'en',
    format: 'virtual',
    category: 'Cloud Computing',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    objectives: [
      'Design AWS architectures',
      'Implement security best practices',
      'Optimize costs and performance',
      'Prepare for AWS certification'
    ],
    prerequisites: ['Basic cloud concepts', 'Networking fundamentals'],
    targetAudience: ['Cloud Engineers', 'System Architects', 'IT Professionals'],
    syllabus: [
      {
        title: 'AWS Core Services',
        topics: ['EC2, S3, VPC', 'IAM and security', 'Load balancing']
      },
      {
        title: 'Advanced Architecture',
        topics: ['High availability', 'Disaster recovery', 'Cost optimization']
      }
    ],
    instructor: {
      name: 'Robert Kumar',
      bio: 'AWS Certified Solutions Architect Professional with 8 years of cloud experience.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200'
    },
    dates: [
      new Date('2025-11-18'),
      new Date('2025-12-02'),
      new Date('2025-12-16')
    ]
  },
  {
    id: '5',
    title: 'Machine Learning with Python',
    slug: 'machine-learning-python',
    description: 'Build and deploy machine learning models using Python and popular ML frameworks.',
    shortDescription: 'Master machine learning algorithms and implementation.',
    price: 1009,
    duration: '5 days',
    language: 'en',
    format: 'classroom',
    category: 'AI & Machine Learning',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
    objectives: [
      'Implement ML algorithms',
      'Use scikit-learn and TensorFlow',
      'Deploy ML models',
      'Evaluate model performance'
    ],
    prerequisites: ['Python programming', 'Statistics basics'],
    targetAudience: ['Data Scientists', 'ML Engineers', 'Software Developers'],
    syllabus: [
      {
        title: 'ML Foundations',
        topics: ['Supervised learning', 'Unsupervised learning', 'Model selection']
      },
      {
        title: 'Deep Learning',
        topics: ['Neural networks', 'TensorFlow basics', 'Model deployment']
      }
    ],
    instructor: {
      name: 'Dr. Anna Petrov',
      bio: 'ML researcher and practitioner with publications in top AI conferences.',
      imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200'
    },
    dates: [
      new Date('2025-11-20'),
      new Date('2025-12-08'),
      new Date('2025-12-22')
    ]
  },
  {
    id: '6',
    title: 'Full-Stack Web Development',
    slug: 'full-stack-web-development',
    description: 'Learn modern web development from frontend to backend using React, Node.js, and databases.',
    shortDescription: 'Become a full-stack developer with modern technologies.',
    price: 1299,
    duration: '5 days',
    language: 'nl',
    format: 'classroom',
    category: 'Programming & Development',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    objectives: [
      'Build React applications',
      'Create REST APIs with Node.js',
      'Work with databases',
      'Deploy full-stack applications'
    ],
    prerequisites: ['JavaScript basics', 'HTML/CSS knowledge'],
    targetAudience: ['Web Developers', 'Software Engineers', 'Career Changers'],
    syllabus: [
      {
        title: 'Frontend Development',
        topics: ['React fundamentals', 'State management', 'UI components']
      },
      {
        title: 'Backend Development',
        topics: ['Node.js and Express', 'Database design', 'Authentication']
      }
    ],
    instructor: {
      name: 'Lars van Dijk',
      bio: 'Full-stack developer with 12 years experience building web applications.',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200'
    },
    dates: [
      new Date('2025-11-22'),
      new Date('2025-12-06'),
      new Date('2025-12-18')
    ]
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug);
}

export function getCoursesByCategory(category: string): Course[] {
  return courses.filter(course => course.category === category);
}

export function getFeaturedCourses(limit: number = 4): Course[] {
  return courses.slice(0, limit);
}

export const categories = [
  'Programming & Development',
  'Data & Data Science',
  'Cloud Computing',
  'AI & Machine Learning',
  'DevOps & Containers',
  'Cyber Security'
];
