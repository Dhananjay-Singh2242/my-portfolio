// Source of truth: Resume_Dhananjay11.pdf — keep claims in sync with the resume.
export const profile = {
  name: 'Dhananjay Singh',
  role: 'Java Backend Developer',
  location: 'Gurugram',
  phone: '+91 95174 06111',
  email: 'dhananjay.ansh2242@gmail.com',
  tagline:
    'Building scalable microservices with Java, Spring Boot, and event-driven systems.',
  summary:
    'Java Backend Developer with 1+ year of experience building Spring Boot microservices for a production real-time consultation platform. I improved API performance by 30% with Redis caching and query optimization, raised message throughput by 25% with RabbitMQ, and cut manual release effort by ~40% through CI/CD automation on Kubernetes.',
  resumeUrl: '/resume.pdf',
  links: {
    github: 'https://github.com/Dhananjay-Singh2242',
    linkedin: 'https://www.linkedin.com/in/dhananjaysingh2004/',
    product: 'https://www.astrowain.com/home',
  },
}

export const experience = [
  {
    company: 'Amplied Technologies LLP',
    role: 'Java Developer',
    period: 'Aug 2025 — Present',
    product: 'AstroWain',
    productUrl: 'https://www.astrowain.com/home',
    impact: [
      { value: '−30%', label: 'p95 API latency' },
      { value: '+25%', label: 'message throughput' },
      { value: '−40%', label: 'manual release effort' },
    ],
    groups: [
      {
        title: 'Architecture & payments',
        icon: 'architecture',
        items: [
          'Contributed to a 23-service Spring Boot microservices architecture within a 2-engineer team, developing backend functionality across authentication, user management, wallet, payments, subscriptions, and notifications.',
          'Contributed to payment-service workflows involving server notifications, refunds, and recurring subscription charges.',
        ],
      },
      {
        title: 'Performance',
        icon: 'performance',
        items: [
          'Improved p95 latency of high-traffic REST APIs by 30% using Redis caching, PostgreSQL query optimization, and database indexing.',
        ],
      },
      {
        title: 'Messaging & reliability',
        icon: 'messaging',
        items: [
          'Integrated RabbitMQ-based asynchronous messaging across 19 modules, reducing service coupling and improving message throughput by 25%.',
          'Improved reliability under concurrent workloads through retry mechanisms with exponential backoff, dead-letter handling, and idempotent message processing.',
        ],
      },
      {
        title: 'Security',
        icon: 'security',
        items: [
          'Secured REST APIs using Spring Security, JWT access and refresh tokens, Keycloak, and role-based access control (RBAC).',
        ],
      },
      {
        title: 'Deployment & CI/CD',
        icon: 'devops',
        items: [
          'Containerized and deployed Spring Boot services using Docker, AWS ECR, Kubernetes, and Helm, with readiness probes and environment-specific deployment configurations.',
          'Automated CI/CD workflows using GitHub Actions and ArgoCD for image builds, ECR publishing, and Helm configuration updates, reducing manual release effort by approximately 40%.',
        ],
      },
      {
        title: 'Testing',
        icon: 'testing',
        items: [
          'Contributed to JUnit and Mockito testing for payment, subscription, and pricing logic.',
        ],
      },
    ],
  },
]

export const caseStudy = {
  product: 'AstroWain',
  productUrl: 'https://www.astrowain.com/home',
  role: 'Java Backend Developer',
  company: 'Amplied Technologies LLP',
  headline: 'From consultation requests to reliable production APIs.',
  summary:
    'A walkthrough of the backend I work on — a real-time consultation platform built as Spring Boot microservices, with async messaging, caching, and automated deployments.',
  steps: [
    {
      id: 'overview',
      label: 'Overview',
      title: 'The platform',
      explanation:
        'A real-time consultation platform delivered as a 23-service Spring Boot microservices architecture, covering authentication, user management, wallet, payments, subscriptions, and notifications.',
      ownership:
        'Contributed backend functionality across these domains within a 2-engineer team.',
      points: [
        '23 Spring Boot services in a 2-engineer team',
        'Payment workflows: server notifications, refunds, recurring subscription charges',
        'JUnit and Mockito tests for payment, subscription, and pricing logic',
      ],
      image: 'overview',
      images: ['overview', 'overviewServices'],
      imageAlt: 'AstroWain product homepage and services',
      tags: ['Java', 'Spring Boot', 'Microservices', 'REST'],
    },
    {
      id: 'architecture',
      label: 'Architecture',
      title: 'Secure service boundaries',
      explanation:
        'Client traffic reaches independent services for auth, users, payments, and subscriptions. REST APIs are secured end to end, and each workload uses the data store that fits it.',
      ownership:
        'Secured REST APIs with Spring Security, JWT, Keycloak, and RBAC.',
      points: [
        'JWT access and refresh tokens',
        'Keycloak + role-based access control (RBAC)',
        'Redis, PostgreSQL, and MongoDB across services',
      ],
      diagram: 'architecture',
      tags: ['Spring Security', 'JWT', 'Keycloak', 'RBAC'],
    },
    {
      id: 'events',
      label: 'Events',
      title: 'Async when sync is too slow',
      explanation:
        'Cross-service work moves through RabbitMQ so requests are not blocked. Consumers process events in the background and deliver results onward.',
      ownership:
        'Integrated RabbitMQ across 19 modules and hardened message handling.',
      points: [
        '+25% message throughput, with lower service coupling',
        'Retries with exponential backoff and dead-letter handling',
        'Idempotent message processing',
      ],
      diagram: 'events',
      tags: ['RabbitMQ', 'Event-driven', 'Retries', 'Idempotency'],
    },
    {
      id: 'performance',
      label: 'Performance',
      title: 'Caching you can measure',
      explanation:
        'Hot paths get Redis caching, PostgreSQL query optimization, and indexing — aimed at the REST APIs with the most traffic.',
      ownership:
        'Optimized high-traffic REST APIs and measured the result at p95.',
      points: [
        '30% better p95 latency on high-traffic REST APIs',
        'Redis caching for frequently read data',
        'Query optimization and indexing in PostgreSQL',
      ],
      image: null,
      tags: ['Redis', 'PostgreSQL', 'Indexing', 'p95 latency'],
    },
    {
      id: 'deploy',
      label: 'Deploy',
      title: 'Ship safely, recover quickly',
      explanation:
        'Services are containerized with Docker, published to AWS ECR, and deployed to Kubernetes with Helm. GitHub Actions and ArgoCD automate image builds, ECR publishing, and Helm configuration updates.',
      ownership:
        'Automated the release workflow and environment-specific deployment configs.',
      points: [
        '~40% less manual release effort',
        'Readiness probes and per-environment Helm configs',
        'GitHub Actions + ArgoCD pipeline',
      ],
      image: 'deploy',
      imageAlt: 'Backend CI/CD pipeline run in GitHub Actions',
      tags: ['Docker', 'Kubernetes', 'Helm', 'GitHub Actions', 'ArgoCD'],
    },
  ],
}

export const projects = [
  {
    title: 'Attendance Management System',
    subtitle: 'Backend · Role-based access',
    description:
      'A role-based attendance system with RESTful APIs, organized into reusable service and repository layers.',
    features: [
      {
        title: 'Auth & RBAC',
        text: 'Authentication and authorization with Keycloak, enforcing RBAC for Admin and User roles.',
        tech: ['Keycloak'],
      },
      {
        title: 'Data storage',
        text: 'Attendance and user data in MySQL; audit logs in MongoDB to track application activity.',
        tech: ['MySQL', 'MongoDB'],
      },
      {
        title: 'Caching',
        text: 'Redis caching for frequently accessed data to reduce repeated database queries.',
        tech: ['Redis'],
      },
      {
        title: 'Async processing',
        text: 'RabbitMQ for asynchronous processing, decoupling application components.',
        tech: ['RabbitMQ'],
      },
    ],
    tags: ['Java', 'Spring Boot', 'Keycloak', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ'],
    url: '',
    urlLabel: '',
  },
]

export const skills = [
  {
    group: 'Languages & Frameworks',
    items: ['Java', 'Spring Boot', 'Spring Security'],
  },
  {
    group: 'Architecture & APIs',
    items: [
      'Microservices',
      'REST APIs',
      'Event-Driven Architecture',
      'Distributed Systems',
    ],
  },
  {
    group: 'Security',
    items: ['JWT (Access & Refresh)', 'Keycloak', 'RBAC'],
  },
  {
    group: 'Databases & Caching',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    group: 'Messaging & Testing',
    items: ['RabbitMQ', 'JUnit', 'Mockito'],
  },
  {
    group: 'Cloud & DevOps',
    items: [
      'AWS (EC2, S3, RDS, ECR)',
      'Docker',
      'Kubernetes',
      'Helm',
      'ArgoCD',
      'GitHub Actions',
    ],
  },
  {
    group: 'Tools',
    items: ['Git', 'GitHub', 'Postman', 'Swagger', 'OpenAPI'],
  },
  {
    group: 'CS Fundamentals',
    items: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
  },
]

export const education = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'IAMR Group of Institutions',
    period: '2022 — 2025',
  },
]

export const highlights = [
  { value: '23', label: 'Microservices' },
  { value: '30%', label: 'Better p95 latency' },
  { value: '25%', label: 'Higher message throughput' },
  { value: '~40%', label: 'Less manual release effort' },
]
