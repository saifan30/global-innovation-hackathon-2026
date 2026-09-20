import { CareerRole, SkillItem, LearningResource, ProjectRecommendation } from "../../src/types/index.ts";

export const INITIAL_SKILLS: SkillItem[] = [
  // Core Technical & Languages
  {
    id: "python",
    name: "Python 3 & Data Structures",
    category: "core_technical",
    description: "Object-oriented scripting, asynchronous concurrency, NumPy/Pandas data manipulation, and clean algorithmic design.",
    demandScore: 98,
    globalTrending: true,
    marketIndexRationale: "Calculated benchmark index reflecting universal adoption in AI/ML runtimes, backend services, and data tooling."
  },
  {
    id: "typescript",
    name: "TypeScript & Modern JavaScript",
    category: "core_technical",
    description: "Static type systems, ESNext asynchronous concurrency, generics, and enterprise web application architecture.",
    demandScore: 96,
    globalTrending: true,
    marketIndexRationale: "Calculated benchmark index reflecting standard enterprise adoption across browser runtimes and Node.js backend services."
  },
  {
    id: "golang",
    name: "Go (Golang) Systems Programming",
    category: "core_technical",
    description: "High-throughput concurrent services, goroutines, channels, and cloud-native microservice frameworks.",
    demandScore: 91,
    globalTrending: true,
    marketIndexRationale: "Calculated benchmark index driven by Kubernetes ecosystem tooling, Docker internals, and microservice infrastructure."
  },
  {
    id: "rust",
    name: "Rust Memory Safety & Concurrency",
    category: "core_technical",
    description: "Ownership model, zero-cost abstractions, WebAssembly compilation, and embedded/systems engineering.",
    demandScore: 93,
    globalTrending: true,
    marketIndexRationale: "Calculated benchmark index driven by memory-safety initiatives in systems software and high-performance web tooling."
  },
  {
    id: "sql",
    name: "Relational Database Design & SQL",
    category: "core_technical",
    description: "ACID transactions, query execution planning, indexing strategies, PostgreSQL & MySQL database internals.",
    demandScore: 95,
    globalTrending: false,
    marketIndexRationale: "Calculated foundational competency required across all modern data persistence, warehousing, and transactional systems."
  },

  // AI & Data
  {
    id: "machine_learning",
    name: "Applied Machine Learning & Scikit-Learn",
    category: "domain_expertise",
    description: "Supervised/unsupervised models, feature engineering, loss optimization, cross-validation, and performance metrics.",
    demandScore: 97,
    globalTrending: true,
    marketIndexRationale: "Calculated demand index reflecting enterprise predictive analytics and baseline data science capabilities."
  },
  {
    id: "deep_learning_pytorch",
    name: "Deep Learning with PyTorch",
    category: "frameworks_tools",
    description: "Neural network backpropagation, PyTorch tensors, CNNs, Transformers, and custom training/fine-tuning loops.",
    demandScore: 96,
    globalTrending: true,
    marketIndexRationale: "Calculated demand index reflecting PyTorch dominance in cutting-edge AI research and foundation model engineering."
  },
  {
    id: "llm_rag_agents",
    name: "LLM Fine-Tuning, RAG & AI Agents",
    category: "domain_expertise",
    description: "Retrieval-Augmented Generation, vector embeddings, Gemini API integrations, function calling, and multi-agent workflows.",
    demandScore: 99,
    globalTrending: true,
    marketIndexRationale: "Calculated demand index reflecting high industry investment in generative AI interfaces and grounded enterprise copilots."
  },
  {
    id: "data_engineering_pipelines",
    name: "Data Pipelines & ETL Architecture",
    category: "architecture_cloud",
    description: "Apache Kafka, Spark, dbt, Airflow, stream processing, schema registries, and Lakehouse architectures.",
    demandScore: 92,
    globalTrending: true,
    marketIndexRationale: "Calculated demand index driven by the need for reliable, high-volume real-time and batch data processing."
  },

  // Fullstack & Web
  {
    id: "react_nextjs",
    name: "React & Next.js Ecosystem",
    category: "frameworks_tools",
    description: "Server components, reactive hooks, SSR/SSG rendering patterns, Tailwind CSS, and resilient state architectures.",
    demandScore: 95,
    globalTrending: true,
    marketIndexRationale: "Calculated demand index based on frontend framework market share in production commercial web apps."
  },
  {
    id: "backend_api_design",
    name: "REST, GraphQL & gRPC API Design",
    category: "architecture_cloud",
    description: "Idempotent HTTP interfaces, schema definitions, protocol buffers, rate limiting, and caching layers.",
    demandScore: 94,
    globalTrending: false,
    marketIndexRationale: "Calculated core engineering requirement for reliable inter-service and client-server communications."
  },
  {
    id: "distributed_systems",
    name: "Distributed Systems & Event-Driven Architecture",
    category: "architecture_cloud",
    description: "CAP theorem, consensus mechanisms, message queues, event sourcing, and eventual consistency.",
    demandScore: 96,
    globalTrending: true,
    marketIndexRationale: "Calculated architectural metric for building fault-tolerant, horizontally scalable global services."
  },

  // Cloud & DevOps
  {
    id: "docker_kubernetes",
    name: "Containerization (Docker & Kubernetes)",
    category: "frameworks_tools",
    description: "OCI image multi-stage builds, Pod scheduling, Ingress controllers, Helm charts, and service meshes.",
    demandScore: 97,
    globalTrending: true,
    marketIndexRationale: "Calculated industry benchmark based on container orchestration standardization across all cloud providers."
  },
  {
    id: "cloud_platforms",
    name: "Cloud Infrastructure (GCP / AWS / Azure)",
    category: "architecture_cloud",
    description: "Cloud Run, IAM policies, VPC networking, Cloud SQL, serverless execution, and cost optimization.",
    demandScore: 98,
    globalTrending: true,
    marketIndexRationale: "Calculated universal requirement for deploying production workloads to managed cloud providers."
  },
  {
    id: "cicd_automation",
    name: "CI/CD & Infrastructure as Code (Terraform)",
    category: "frameworks_tools",
    description: "GitHub Actions workflows, Terraform HCL provisioning, automated regression testing, and blue/green rollouts.",
    demandScore: 93,
    globalTrending: false,
    marketIndexRationale: "Calculated operational metric for automated, repeatable, zero-downtime release engineering."
  },

  // Cybersecurity
  {
    id: "app_security_owasp",
    name: "Application Security & OWASP Top 10",
    category: "domain_expertise",
    description: "Threat modeling, authentication flows (OAuth2/OIDC), cryptography, XSS/CSRF mitigations, and secure code review.",
    demandScore: 94,
    globalTrending: true,
    marketIndexRationale: "Calculated defense metric aligned with OWASP Foundation global cybersecurity risk priorities."
  },
  {
    id: "cloud_security_zero_trust",
    name: "Cloud Security & Zero-Trust Architecture",
    category: "architecture_cloud",
    description: "Zero-trust network access, least-privilege IAM, audit logging, runtime threat detection, and compliance.",
    demandScore: 92,
    globalTrending: true,
    marketIndexRationale: "Calculated enterprise security metric for securing hybrid and multi-cloud perimeter defenses."
  },

  // Product, Design & Soft Skills
  {
    id: "system_design",
    name: "High-Level System Design & Scalability",
    category: "architecture_cloud",
    description: "Scalability patterns, sharding, load balancing, microservices vs monolith tradeoffs, and latency optimization.",
    demandScore: 97,
    globalTrending: true,
    marketIndexRationale: "Calculated senior engineering competency for architecting large-scale technical systems."
  },
  {
    id: "borderless_collaboration",
    name: "Borderless Global Collaboration & Open Source",
    category: "soft_skills",
    description: "Asynchronous communication, Git branching standards, remote pair programming, and cross-cultural technical documentation.",
    demandScore: 95,
    globalTrending: true,
    marketIndexRationale: "Calculated collaboration metric aligned with Global Innovation Hackathon 2026 theme 'Innovate Without Borders'."
  },
  {
    id: "product_analytics_uiux",
    name: "Product Discovery & User Experience Thinking",
    category: "domain_expertise",
    description: "User journey mapping, design systems, heuristic evaluation, product telemetry, and rapid prototyping.",
    demandScore: 89,
    globalTrending: false,
    marketIndexRationale: "Calculated product design metric for ensuring software usability, accessibility, and user-centric value."
  }
];

export const INITIAL_CAREER_ROLES: CareerRole[] = [
  {
    id: "ai_engineer",
    title: "AI & LLM Solutions Engineer",
    domain: "ai_data",
    domainLabel: "Artificial Intelligence & LLMs",
    summary: "Architects and deploys generative AI pipelines, RAG systems, autonomous agent workflows, and fine-tunes foundation models for global enterprise products.",
    globalMarketDemand: "Very High",
    averageTimelineMonths: 6,
    borderlessRemoteReadiness: 95,
    sourceInfo: {
      benchmarkFramework: "Google Cloud Professional ML Engineer & DeepLearning.AI Curricula",
      curriculumStandard: "Generative AI Systems, RAG Architectures & Foundation Model Alignment",
      sourceUrl: "https://cloud.google.com/learn/certification/machine-learning-engineer",
      lastAudited: "2026-Q1"
    },
    typicalResponsibilities: [
      "Design and deploy production-grade RAG architectures with hybrid vector search and citations",
      "Fine-tune and evaluate open-source foundation models on domain-specific datasets",
      "Build agentic tool-use pipelines integrating real-time external APIs and databases",
      "Optimize inference latency and token economics using streaming and quantized weights"
    ],
    certificationsRecommended: [
      "Google Cloud Professional Machine Learning Engineer",
      "DeepLearning.AI Generative AI for Everyone / Specialization",
      "AWS Certified Machine Learning - Specialty"
    ],
    requiredSkills: [
      {
        skillId: "python",
        skillName: "Python 3 & Data Structures",
        category: "core_technical",
        requiredLevel: 4,
        importance: "critical",
        weight: 10,
        rationale: "Foundational language for all modern machine learning frameworks, vector pipelines, and AI SDKs."
      },
      {
        skillId: "llm_rag_agents",
        skillName: "LLM Fine-Tuning, RAG & AI Agents",
        category: "domain_expertise",
        requiredLevel: 4,
        importance: "critical",
        weight: 10,
        rationale: "Core competency for building grounded generative AI and autonomous agent systems."
      },
      {
        skillId: "deep_learning_pytorch",
        skillName: "Deep Learning with PyTorch",
        category: "frameworks_tools",
        requiredLevel: 3,
        importance: "critical",
        weight: 9,
        rationale: "Essential for model fine-tuning, embeddings generation, and tensor computations."
      },
      {
        skillId: "backend_api_design",
        skillName: "REST, GraphQL & gRPC API Design",
        category: "architecture_cloud",
        requiredLevel: 3,
        importance: "important",
        weight: 7,
        rationale: "Needed to expose AI services cleanly to client applications and external microservices."
      },
      {
        skillId: "cloud_platforms",
        skillName: "Cloud Infrastructure (GCP / AWS / Azure)",
        category: "architecture_cloud",
        requiredLevel: 3,
        importance: "important",
        weight: 8,
        rationale: "Required to host vector databases and serverless AI endpoints on scalable infrastructure."
      },
      {
        skillId: "borderless_collaboration",
        skillName: "Borderless Global Collaboration & Open Source",
        category: "soft_skills",
        requiredLevel: 4,
        importance: "important",
        weight: 6,
        rationale: "AI engineering heavily leverages open source communities and distributed international teams."
      }
    ]
  },
  {
    id: "fullstack_cloud_architect",
    title: "Full-Stack Cloud Architect",
    domain: "fullstack_web",
    domainLabel: "Full-Stack & Distributed Web",
    summary: "Architects modern, resilient web applications end-to-end, pairing responsive TypeScript frontends with scalable serverless cloud backends.",
    globalMarketDemand: "Very High",
    averageTimelineMonths: 5,
    borderlessRemoteReadiness: 98,
    sourceInfo: {
      benchmarkFramework: "Google Cloud Associate Cloud Engineer & W3C/MDN Full-Stack Curriculum",
      curriculumStandard: "Modern TypeScript Full-Stack, Reactive UI, and Distributed Cloud Services",
      sourceUrl: "https://cloud.google.com/learn/certification/cloud-engineer",
      lastAudited: "2026-Q1"
    },
    typicalResponsibilities: [
      "Develop responsive client interfaces using React, Next.js, and modern state architectures",
      "Build high-concurrency API servers and microservices with TypeScript or Go",
      "Design relational and NoSQL database schemas with high availability",
      "Deploy containerized workloads to Cloud Run and Kubernetes with automated CI/CD"
    ],
    certificationsRecommended: [
      "Google Cloud Associate Cloud Engineer",
      "AWS Certified Solutions Architect - Associate",
      "Meta Front-End / Back-End Developer Professional Certificate"
    ],
    requiredSkills: [
      {
        skillId: "typescript",
        skillName: "TypeScript & Modern JavaScript",
        category: "core_technical",
        requiredLevel: 4,
        importance: "critical",
        weight: 10,
        rationale: "Standard language across modern frontend and server-side runtimes."
      },
      {
        skillId: "react_nextjs",
        skillName: "React & Next.js Ecosystem",
        category: "frameworks_tools",
        requiredLevel: 4,
        importance: "critical",
        weight: 9,
        rationale: "Primary framework for delivering rich, accessible web user experiences."
      },
      {
        skillId: "backend_api_design",
        skillName: "REST, GraphQL & gRPC API Design",
        category: "architecture_cloud",
        requiredLevel: 4,
        importance: "critical",
        weight: 9,
        rationale: "Vital for structuring maintainable full-stack interfaces and client-server boundaries."
      },
      {
        skillId: "sql",
        skillName: "Relational Database Design & SQL",
        category: "core_technical",
        requiredLevel: 3,
        importance: "important",
        weight: 8,
        rationale: "Required for structured data modeling, indexing, and transactional integrity."
      },
      {
        skillId: "docker_kubernetes",
        skillName: "Containerization (Docker & Kubernetes)",
        category: "frameworks_tools",
        requiredLevel: 3,
        importance: "important",
        weight: 7,
        rationale: "Standard packaging for reproducible, portable containerized deployments."
      },
      {
        skillId: "system_design",
        skillName: "High-Level System Design & Scalability",
        category: "architecture_cloud",
        requiredLevel: 3,
        importance: "important",
        weight: 8,
        rationale: "Needed to prevent bottlenecks and ensure uptime under high global user traffic."
      }
    ]
  },
  {
    id: "cloud_devops_sre",
    title: "Cloud & DevOps Reliability Engineer (SRE)",
    domain: "cloud_devops",
    domainLabel: "Cloud, Infrastructure & SRE",
    summary: "Maintains global cloud platform uptime, builds automated zero-downtime deployment pipelines, and manages containerized orchestration at scale.",
    globalMarketDemand: "High",
    averageTimelineMonths: 6,
    borderlessRemoteReadiness: 94,
    sourceInfo: {
      benchmarkFramework: "Cloud Native Computing Foundation (CNCF) & Google SRE Handbook",
      curriculumStandard: "Site Reliability Engineering, Kubernetes Administration (CKA) & GitOps",
      sourceUrl: "https://sre.google/sre-book/table-of-contents/",
      lastAudited: "2026-Q1"
    },
    typicalResponsibilities: [
      "Provision declarative cloud infrastructure using Terraform and GitOps",
      "Manage Kubernetes clusters, service meshes, and network ingress",
      "Implement observability pipelines (Prometheus, Grafana, OpenTelemetry)",
      "Automate incident response, failover tests, and Service Level Objectives (SLOs)"
    ],
    certificationsRecommended: [
      "Certified Kubernetes Administrator (CKA)",
      "Google Cloud Professional Cloud DevOps Engineer",
      "HashiCorp Certified: Terraform Associate"
    ],
    requiredSkills: [
      {
        skillId: "docker_kubernetes",
        skillName: "Containerization (Docker & Kubernetes)",
        category: "frameworks_tools",
        requiredLevel: 4,
        importance: "critical",
        weight: 10,
        rationale: "Core platform for modern cloud-native service delivery and orchestration."
      },
      {
        skillId: "cloud_platforms",
        skillName: "Cloud Infrastructure (GCP / AWS / Azure)",
        category: "architecture_cloud",
        requiredLevel: 4,
        importance: "critical",
        weight: 10,
        rationale: "Expertise in cloud compute, networking, and managed storage primitives."
      },
      {
        skillId: "cicd_automation",
        skillName: "CI/CD & Infrastructure as Code (Terraform)",
        category: "frameworks_tools",
        requiredLevel: 4,
        importance: "critical",
        weight: 9,
        rationale: "Automates safe, audited, and repeatable infrastructure deployments."
      },
      {
        skillId: "golang",
        skillName: "Go (Golang) Systems Programming",
        category: "core_technical",
        requiredLevel: 3,
        importance: "important",
        weight: 7,
        rationale: "Language of choice for Kubernetes operators and high-throughput DevOps tooling."
      },
      {
        skillId: "cloud_security_zero_trust",
        skillName: "Cloud Security & Zero-Trust Architecture",
        category: "architecture_cloud",
        requiredLevel: 3,
        importance: "important",
        weight: 8,
        rationale: "Safeguards perimeter security, secrets management, and cloud access controls."
      }
    ]
  },
  {
    id: "cyber_defense_specialist",
    title: "Application & Cloud Security Specialist",
    domain: "cybersecurity",
    domainLabel: "Cybersecurity & Defense",
    summary: "Protects cloud systems, conducts threat modeling and code auditing, enforces zero-trust architecture, and hardens application security against OWASP vulnerabilities.",
    globalMarketDemand: "Very High",
    averageTimelineMonths: 7,
    borderlessRemoteReadiness: 90,
    sourceInfo: {
      benchmarkFramework: "OWASP Foundation Security Knowledge Framework & NIST SP 800-207",
      curriculumStandard: "Application Threat Modeling, Zero-Trust Architecture & Secure Code Auditing",
      sourceUrl: "https://owasp.org/www-project-top-ten/",
      lastAudited: "2026-Q1"
    },
    typicalResponsibilities: [
      "Perform automated and manual security audits against OWASP Top 10 vulnerabilities",
      "Design OAuth2, OIDC, and passwordless zero-trust authentication mechanisms",
      "Monitor SIEM logs and mitigate denial-of-service and injection vectors",
      "Conduct static/dynamic application security testing in CI/CD release pipelines"
    ],
    certificationsRecommended: [
      "CompTIA Security+ / CySA+",
      "Certified Information Systems Security Professional (CISSP)",
      "Offensive Security Certified Professional (OSCP)"
    ],
    requiredSkills: [
      {
        skillId: "app_security_owasp",
        skillName: "Application Security & OWASP Top 10",
        category: "domain_expertise",
        requiredLevel: 4,
        importance: "critical",
        weight: 10,
        rationale: "Essential defense against modern web and API attack vectors."
      },
      {
        skillId: "cloud_security_zero_trust",
        skillName: "Cloud Security & Zero-Trust Architecture",
        category: "architecture_cloud",
        requiredLevel: 4,
        importance: "critical",
        weight: 10,
        rationale: "Guarantees least-privilege security and identity-aware boundaries."
      },
      {
        skillId: "python",
        skillName: "Python 3 & Data Structures",
        category: "core_technical",
        requiredLevel: 3,
        importance: "important",
        weight: 7,
        rationale: "Critical for writing security verification scripts, exploit tests, and log parsers."
      },
      {
        skillId: "backend_api_design",
        skillName: "REST, GraphQL & gRPC API Design",
        category: "architecture_cloud",
        requiredLevel: 3,
        importance: "important",
        weight: 8,
        rationale: "Necessary for understanding API attack surfaces, authorization tokens, and rate limits."
      }
    ]
  },
  {
    id: "data_platform_engineer",
    title: "Data Platform & Analytics Engineer",
    domain: "ai_data",
    domainLabel: "Data Engineering & Analytics",
    summary: "Engineers massive data streaming and lakehouse architectures, ensuring data reliability, lineage, and high-throughput transformations.",
    globalMarketDemand: "High",
    averageTimelineMonths: 6,
    borderlessRemoteReadiness: 92,
    sourceInfo: {
      benchmarkFramework: "Google Cloud Professional Data Engineer & Databricks Lakehouse Framework",
      curriculumStandard: "Distributed Data Pipelines, Stream Processing, dbt Modeling & Data Lakehouses",
      sourceUrl: "https://cloud.google.com/learn/certification/data-engineer",
      lastAudited: "2026-Q1"
    },
    typicalResponsibilities: [
      "Build real-time ingestion pipelines using Kafka, BigQuery, and Apache Spark",
      "Model dimensional data warehouses with dbt and automated schema testing",
      "Maintain data quality SLAs and metadata lineage graphs",
      "Support data science and AI teams with clean, governed feature stores"
    ],
    certificationsRecommended: [
      "Google Cloud Professional Data Engineer",
      "Databricks Certified Data Engineer Associate",
      "Snowflake SnowPro Core Certification"
    ],
    requiredSkills: [
      {
        skillId: "sql",
        skillName: "Relational Database Design & SQL",
        category: "core_technical",
        requiredLevel: 5,
        importance: "critical",
        weight: 10,
        rationale: "Deep SQL query and indexing mastery is non-negotiable for large-scale data platforms."
      },
      {
        skillId: "python",
        skillName: "Python 3 & Data Structures",
        category: "core_technical",
        requiredLevel: 4,
        importance: "critical",
        weight: 9,
        rationale: "Used for writing Spark jobs, Airflow orchestration DAGs, and data transformation scripts."
      },
      {
        skillId: "data_engineering_pipelines",
        skillName: "Data Pipelines & ETL Architecture",
        category: "architecture_cloud",
        requiredLevel: 4,
        importance: "critical",
        weight: 10,
        rationale: "Core discipline for streaming ingestion, transformation, and Lakehouse storage."
      },
      {
        skillId: "distributed_systems",
        skillName: "Distributed Systems & Event-Driven Architecture",
        category: "architecture_cloud",
        requiredLevel: 3,
        importance: "important",
        weight: 8,
        rationale: "Required to understand horizontal partition strategies, cluster sharding, and shuffle costs."
      }
    ]
  }
];

export const INITIAL_LEARNING_RESOURCES: LearningResource[] = [
  {
    id: "res_python_cs50p",
    title: "CS50's Introduction to Programming with Python",
    provider: "Harvard University / edX",
    url: "https://cs50.harvard.edu/python/",
    type: "course",
    isFree: true,
    estimatedHours: 45,
    targetSkillIds: ["python"],
    targetProficiencyGain: 3,
    difficulty: "Beginner",
    rating: 4.9,
    prerequisites: ["None - Open to all beginners"],
    keyHighlights: ["Variables, conditionals, loops, exceptions, libraries, unit testing with pytest, object-oriented programming"],
    sourceReference: {
      verifiedSource: "Harvard University Department of Computer Science",
      curriculumAccreditation: "CS50 Academic Curriculum (Free Access)",
      citationNote: "Official open curriculum developed by David J. Malan at Harvard University."
    }
  },
  {
    id: "res_gemini_rag_agents",
    title: "Building Generative AI Applications & Agents with Google Gemini",
    provider: "DeepLearning.AI",
    url: "https://www.deeplearning.ai/short-courses/",
    type: "interactive_lab",
    isFree: true,
    estimatedHours: 15,
    targetSkillIds: ["llm_rag_agents"],
    targetProficiencyGain: 4,
    difficulty: "Intermediate",
    rating: 4.9,
    prerequisites: ["Python fundamentals", "Basic HTTP/API concepts"],
    keyHighlights: ["Multimodal prompting, Function Calling, RAG with Vector Search, Autonomous Agent Tool-Use"],
    sourceReference: {
      verifiedSource: "DeepLearning.AI & Google Cloud AI Education",
      curriculumAccreditation: "DeepLearning.AI Official Short Course Series",
      citationNote: "Direct hands-on labs with the @google/genai SDK and vector databases."
    }
  },
  {
    id: "res_pytorch_official",
    title: "Deep Learning with PyTorch: Zero to Mastery",
    provider: "PyTorch Foundation / Fast.ai",
    url: "https://pytorch.org/tutorials/",
    type: "official_guide",
    isFree: true,
    estimatedHours: 35,
    targetSkillIds: ["deep_learning_pytorch", "machine_learning"],
    targetProficiencyGain: 3,
    difficulty: "Intermediate",
    rating: 4.8,
    prerequisites: ["Python 3", "Basic linear algebra & calculus intuition"],
    keyHighlights: ["Tensors, Autograd gradients, Neural Networks, Transfer Learning, Model Export to ONNX"],
    sourceReference: {
      verifiedSource: "Linux Foundation / PyTorch Core Team",
      curriculumAccreditation: "Official PyTorch Documentation & Tutorials",
      citationNote: "Standard open documentation maintained by the PyTorch community."
    }
  },
  {
    id: "res_typescript_handbook",
    title: "TypeScript Official Deep Dive & Handbook",
    provider: "Microsoft Official Documentation",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    type: "official_guide",
    isFree: true,
    estimatedHours: 20,
    targetSkillIds: ["typescript"],
    targetProficiencyGain: 4,
    difficulty: "Intermediate",
    rating: 4.8,
    prerequisites: ["Modern JavaScript (ES6+) basics"],
    keyHighlights: ["Discriminated unions, Generics, Utility types, Conditional types, Type narrowing & infer"],
    sourceReference: {
      verifiedSource: "Microsoft TypeScript Engineering Team",
      curriculumAccreditation: "Official TypeScript Language Specification & Handbook",
      citationNote: "Primary authoritative source for TypeScript language semantics."
    }
  },
  {
    id: "res_fullstack_open",
    title: "Full Stack Open: Deep Dive Into Modern Web Development",
    provider: "University of Helsinki",
    url: "https://fullstackopen.com/en/",
    type: "course",
    isFree: true,
    estimatedHours: 80,
    targetSkillIds: ["react_nextjs", "typescript", "backend_api_design", "sql"],
    targetProficiencyGain: 4,
    difficulty: "Intermediate",
    rating: 4.9,
    prerequisites: ["Basic HTML/CSS and foundational programming"],
    keyHighlights: ["React, Redux, Node.js, Express, REST APIs, GraphQL, TypeScript, Automated Testing, CI/CD"],
    sourceReference: {
      verifiedSource: "University of Helsinki Department of Computer Science",
      curriculumAccreditation: "University of Helsinki Accredited Open Courseware",
      citationNote: "Globally recognized open curriculum in modern full-stack engineering."
    }
  },
  {
    id: "res_docker_k8s_freecodecamp",
    title: "Kubernetes & Docker Hands-On Course for DevOps",
    provider: "freeCodeCamp",
    url: "https://www.freecodecamp.org/news/learn-kubernetes-and-docker/",
    type: "video_series",
    isFree: true,
    estimatedHours: 25,
    targetSkillIds: ["docker_kubernetes", "cloud_platforms"],
    targetProficiencyGain: 3,
    difficulty: "Intermediate",
    rating: 4.7,
    prerequisites: ["Linux command line basics", "Basic networking concepts"],
    keyHighlights: ["Dockerfiles, Docker Compose, Pods, Deployments, Services, ConfigMaps, Ingress Controllers"],
    sourceReference: {
      verifiedSource: "freeCodeCamp Open Source Educational Foundation",
      curriculumAccreditation: "freeCodeCamp Verified Curriculum",
      citationNote: "Open-access curriculum covering containerization fundamentals."
    }
  },
  {
    id: "res_owasp_security",
    title: "OWASP Top 10 Web Application Security Fundamentals",
    provider: "OWASP Foundation / PortSwigger Web Security Academy",
    url: "https://portswigger.net/web-security",
    type: "interactive_lab",
    isFree: true,
    estimatedHours: 30,
    targetSkillIds: ["app_security_owasp"],
    targetProficiencyGain: 4,
    difficulty: "Intermediate",
    rating: 4.9,
    prerequisites: ["Web HTTP fundamentals", "Basic browser devtools"],
    keyHighlights: ["SQL Injection, Cross-Site Scripting (XSS), CSRF, Broken Access Control, JWT Security, SSRF"],
    sourceReference: {
      verifiedSource: "PortSwigger Web Security & OWASP Foundation",
      curriculumAccreditation: "PortSwigger Academy Open Security Training",
      citationNote: "Authoritative practical security labs created by Burp Suite security researchers."
    }
  },
  {
    id: "res_system_design_primer",
    title: "The System Design Primer & Distributed Systems",
    provider: "Open Source Collective (GitHub)",
    url: "https://github.com/donnemartin/system-design-primer",
    type: "official_guide",
    isFree: true,
    estimatedHours: 40,
    targetSkillIds: ["system_design", "distributed_systems"],
    targetProficiencyGain: 4,
    difficulty: "Advanced",
    rating: 4.9,
    prerequisites: ["Backend API experience", "Relational/NoSQL databases"],
    keyHighlights: ["Scalability, Caching (Redis/Memcached), Asynchronism, Load Balancers, Sharding, Replication, Microservices"],
    sourceReference: {
      verifiedSource: "Open Source Software Community (GitHub)",
      curriculumAccreditation: "Over 270,000+ GitHub Stars Community Open Standard",
      citationNote: "Standard open-source guide for large-scale distributed systems architecture."
    }
  },
  {
    id: "res_golang_tour",
    title: "A Tour of Go: Concurrent & Systems Programming",
    provider: "Go Language Official (Google)",
    url: "https://go.dev/tour/",
    type: "interactive_lab",
    isFree: true,
    estimatedHours: 15,
    targetSkillIds: ["golang"],
    targetProficiencyGain: 3,
    difficulty: "Beginner",
    rating: 4.8,
    prerequisites: ["Any prior programming language experience"],
    keyHighlights: ["Go syntax, structs, slices, interfaces, goroutines, channels, and Mutex concurrency synchronization"],
    sourceReference: {
      verifiedSource: "Google Go Language Team",
      curriculumAccreditation: "Official Go Tour Documentation",
      citationNote: "Official interactive sandbox maintained by the Go programming language team."
    }
  },
  {
    id: "res_cloud_gcp_skills_boost",
    title: "Google Cloud Computing Foundations & Infrastructure",
    provider: "Google Cloud Skills Boost",
    url: "https://www.cloudskillsboost.google/",
    type: "interactive_lab",
    isFree: true,
    estimatedHours: 25,
    targetSkillIds: ["cloud_platforms", "cicd_automation"],
    targetProficiencyGain: 3,
    difficulty: "Intermediate",
    rating: 4.8,
    prerequisites: ["Basic command line"],
    keyHighlights: ["Cloud Run, VPC Networking, Cloud SQL, IAM Least-Privilege Policies, Cloud Build CI/CD"],
    sourceReference: {
      verifiedSource: "Google Cloud Official Training",
      curriculumAccreditation: "Google Cloud Associate/Professional Learning Path",
      citationNote: "Official cloud architecture sandbox labs with real Google Cloud console access."
    }
  },
  {
    id: "res_sql_pg_exercises",
    title: "PostgreSQL Advanced Queries & Relational Optimization",
    provider: "PGExercises & PostgreSQL Official",
    url: "https://pgexercises.com/",
    type: "interactive_lab",
    isFree: true,
    estimatedHours: 20,
    targetSkillIds: ["sql"],
    targetProficiencyGain: 4,
    difficulty: "Intermediate",
    rating: 4.9,
    prerequisites: ["Basic SELECT statements"],
    keyHighlights: ["Subqueries, Window Functions, Common Table Expressions (CTEs), Aggregations, EXPLAIN ANALYZE index tuning"],
    sourceReference: {
      verifiedSource: "PostgreSQL Community",
      curriculumAccreditation: "Interactive PostgreSQL Practice Platform",
      citationNote: "Hands-on SQL query engine with immediate feedback on performance and output."
    }
  },
  {
    id: "res_open_source_borderless",
    title: "Open Source Global Collaboration & Git Standards",
    provider: "GitHub Open Source Guides & Linux Foundation",
    url: "https://opensource.guide/",
    type: "official_guide",
    isFree: true,
    estimatedHours: 10,
    targetSkillIds: ["borderless_collaboration"],
    targetProficiencyGain: 4,
    difficulty: "Beginner",
    rating: 4.9,
    prerequisites: ["Basic Git knowledge"],
    keyHighlights: ["Asynchronous collaboration, Pull Request etiquette, RFC proposals, Semantic versioning, Cross-cultural communication"],
    sourceReference: {
      verifiedSource: "GitHub & Linux Foundation",
      curriculumAccreditation: "Official Open Source Guides Repository",
      citationNote: "Curated best practices from maintainers of the world's largest open source projects."
    }
  },
  {
    id: "res_terraform_associate",
    title: "HashiCorp Certified Terraform Associate Tutorials & Labs",
    provider: "HashiCorp Official Learn",
    url: "https://developer.hashicorp.com/terraform/tutorials",
    type: "interactive_lab",
    isFree: true,
    estimatedHours: 20,
    targetSkillIds: ["cicd_automation", "cloud_platforms"],
    targetProficiencyGain: 3,
    difficulty: "Intermediate",
    rating: 4.8,
    prerequisites: ["Basic cloud architecture", "Command line CLI basics"],
    keyHighlights: ["HCL Syntax, Terraform State Management, Modules, Provisioners, Cloud Run & VPC IaC Automation"],
    sourceReference: {
      verifiedSource: "HashiCorp Engineering",
      curriculumAccreditation: "HashiCorp Official Developer Certification Track",
      citationNote: "Standard developer tutorials maintained by the creators of Terraform."
    }
  },
  {
    id: "res_rust_book",
    title: "The Rust Programming Language (The Book)",
    provider: "Rust Official Community & Mozilla",
    url: "https://doc.rust-lang.org/book/",
    type: "textbook",
    isFree: true,
    estimatedHours: 40,
    targetSkillIds: ["rust"],
    targetProficiencyGain: 4,
    difficulty: "Intermediate",
    rating: 4.9,
    prerequisites: ["Prior systems or C/C++ or scripting knowledge"],
    keyHighlights: ["Ownership, Borrowing, Lifetimes, Fearless Concurrency, Cargo tooling, WebAssembly bindings"],
    sourceReference: {
      verifiedSource: "Rust Foundation / Mozilla",
      curriculumAccreditation: "Authoritative Rust Language Reference",
      citationNote: "Official documentation written by Steve Klabnik and Carol Nichols."
    }
  },
  {
    id: "res_zero_trust_nist",
    title: "NIST SP 800-207 Zero Trust Architecture Framework",
    provider: "National Institute of Standards and Technology (NIST)",
    url: "https://csrc.nist.gov/publications/detail/sp/800-207/final",
    type: "official_guide",
    isFree: true,
    estimatedHours: 18,
    targetSkillIds: ["cloud_security_zero_trust", "app_security_owasp"],
    targetProficiencyGain: 4,
    difficulty: "Advanced",
    rating: 4.8,
    prerequisites: ["Networking basics (TCP/IP, TLS), Identity management"],
    keyHighlights: ["Policy Decision Points (PDP), Policy Enforcement Points (PEP), Microsegmentation, Continuous Verification"],
    sourceReference: {
      verifiedSource: "NIST Computer Security Resource Center",
      curriculumAccreditation: "US Federal Government Cybersecurity Standard",
      citationNote: "Official standard publication for Zero Trust enterprise architectures."
    }
  },
  {
    id: "res_k8s_official_interactive",
    title: "Kubernetes Core Concepts & Interactive Tutorials",
    provider: "Cloud Native Computing Foundation (CNCF)",
    url: "https://kubernetes.io/docs/tutorials/",
    type: "interactive_lab",
    isFree: true,
    estimatedHours: 25,
    targetSkillIds: ["docker_kubernetes"],
    targetProficiencyGain: 4,
    difficulty: "Intermediate",
    rating: 4.8,
    prerequisites: ["Docker basics", "YAML syntax"],
    keyHighlights: ["Deployments, ReplicaSets, ClusterIP & NodePort Services, Ingress, Secrets, Persistent Volumes"],
    sourceReference: {
      verifiedSource: "CNCF Kubernetes Documentation Team",
      curriculumAccreditation: "Official CNCF CKA / CKAD Reference Guide",
      citationNote: "Official hands-on browser terminal tutorial hosted on kubernetes.io."
    }
  },
  {
    id: "res_andrew_ng_ml",
    title: "Machine Learning Specialization with Scikit-Learn",
    provider: "DeepLearning.AI & Stanford Online",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    type: "course",
    isFree: true,
    costDescription: "Free audit available for all video lectures and quizzes",
    estimatedHours: 55,
    targetSkillIds: ["machine_learning", "python"],
    targetProficiencyGain: 4,
    difficulty: "Beginner",
    rating: 4.9,
    prerequisites: ["High school algebra", "Basic Python"],
    keyHighlights: ["Linear/Logistic Regression, Decision Trees, Random Forests, Gradient Descent, Overfitting Regularization"],
    sourceReference: {
      verifiedSource: "Stanford University / DeepLearning.AI",
      curriculumAccreditation: "Stanford Online Accredited Curriculum",
      citationNote: "Taught by Andrew Ng, world-standard foundational machine learning course."
    }
  },
  {
    id: "res_nngroup_ux",
    title: "10 Usability Heuristics for User Interface Design",
    provider: "Nielsen Norman Group",
    url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    type: "official_guide",
    isFree: true,
    estimatedHours: 12,
    targetSkillIds: ["product_analytics_uiux"],
    targetProficiencyGain: 3,
    difficulty: "Beginner",
    rating: 4.9,
    prerequisites: ["None"],
    keyHighlights: ["Visibility of system status, User control and freedom, Consistency and standards, Error prevention"],
    sourceReference: {
      verifiedSource: "Nielsen Norman Group",
      curriculumAccreditation: "Industry-Standard UX Heuristic Model",
      citationNote: "Authored by Jakob Nielsen, the foundational framework for UI/UX evaluation."
    }
  }
];

export const INITIAL_PROJECTS: ProjectRecommendation[] = [
  {
    id: "proj_multimodal_rag_copilot",
    title: "Borderless Knowledge RAG Agent with Real-Time Grounding",
    tagline: "Build a production RAG system that ingests multi-lingual research documents, generates vector embeddings, and answers queries with verified citation provenance.",
    difficulty: "Advanced",
    estimatedHours: 35,
    targetRoleIds: ["ai_engineer"],
    skillsTaught: ["python", "llm_rag_agents", "backend_api_design", "cloud_platforms"],
    architectureOverview: "FastAPI / Express server paired with vector storage, multimodal document chunking pipeline, and Gemini function calling for automated live verification.",
    deliverables: [
      "Document ingestion pipeline parsing PDFs, Markdown, and tabular dataset formats",
      "Vector search index with hybrid lexical + reciprocal rank fusion (RRF)",
      "Interactive query UI showing exact paragraph references and confidence scores",
      "Automated evaluation benchmark measuring retrieval precision and hallucination rates"
    ],
    realWorldImpact: "Enables remote researchers worldwide to query multi-lingual academic archives without language or geographical barriers.",
    borderlessCollaborationTip: "Document your embedding schema using OpenAPI specs so distributed teammates can plug in their own language datasets.",
    githubStarterIdeas: [
      "Setup automated GitHub Actions to test RAG answer accuracy on 50 sample benchmark questions",
      "Include a Docker Compose file with PostgreSQL + pgvector for instant local reproduction"
    ]
  },
  {
    id: "proj_resilient_cloud_platform",
    title: "Global Multi-Region Cloud Dashboard with Automated Failover",
    tagline: "Architect a resilient full-stack cloud management platform with real-time telemetry, zero-downtime rolling updates, and edge caching.",
    difficulty: "Capstone",
    estimatedHours: 45,
    targetRoleIds: ["fullstack_cloud_architect", "cloud_devops_sre"],
    skillsTaught: ["typescript", "react_nextjs", "docker_kubernetes", "cicd_automation", "system_design"],
    architectureOverview: "React/Next.js frontend with Tailwind and WebSockets, Node/Go microservices backend, Terraform IaC configuration, and Cloud Run / Kubernetes deployment.",
    deliverables: [
      "Full-stack telemetry dashboard visualizing distributed microservice health",
      "Terraform script provisioning VPC, container services, and managed databases",
      "CI/CD pipeline with automated linting, unit testing, and blue/green rollout",
      "Load-testing report verifying resilience under 5,000 simulated requests/sec"
    ],
    realWorldImpact: "Provides mission-critical infrastructure observability for global NGOs and cross-border healthcare services.",
    borderlessCollaborationTip: "Use conventional commits and PR templates with visual previews so distributed contributors can review changes asynchronously.",
    githubStarterIdeas: [
      "Implement a Mock Service Worker (MSW) harness for offline frontend development",
      "Include a Grafana dashboard JSON export for turnkey monitoring"
    ]
  },
  {
    id: "proj_zero_trust_auth_gateway",
    title: "Zero-Trust API Gateway & Vulnerability Scanner",
    tagline: "Develop a high-performance security proxy that enforces token validation, rate limiting, and real-time payload sanitization against OWASP attacks.",
    difficulty: "Advanced",
    estimatedHours: 30,
    targetRoleIds: ["cyber_defense_specialist", "cloud_devops_sre"],
    skillsTaught: ["app_security_owasp", "cloud_security_zero_trust", "backend_api_design", "golang"],
    architectureOverview: "Reverse proxy middleware with OAuth2/OIDC verification, token revocation cache via Redis, and automated regex-based SQLi/XSS anomaly scoring.",
    deliverables: [
      "Pluggable security middleware for Express and Go HTTP servers",
      "Interactive admin dashboard for security audit logs and blocked IP analytics",
      "Comprehensive test suite covering 20+ common penetration payloads",
      "Zero-trust RBAC policy engine based on ABAC attributes"
    ],
    realWorldImpact: "Protects sensitive citizen and student records in emerging economies from unauthorized breaches.",
    borderlessCollaborationTip: "Provide clear documentation in Markdown with sequence diagrams of the token handshake.",
    githubStarterIdeas: [
      "Publish an npm/Go package that developers can import with a single line of code",
      "Integrate automated container scanning with Trivy in GitHub Actions"
    ]
  },
  {
    id: "proj_streaming_lakehouse",
    title: "Real-Time Climate & Economic Data Lakehouse Pipeline",
    tagline: "Build a high-throughput streaming pipeline processing global IoT sensor streams and generating real-time anomaly alerts.",
    difficulty: "Advanced",
    estimatedHours: 40,
    targetRoleIds: ["data_platform_engineer", "ai_engineer"],
    skillsTaught: ["sql", "python", "data_engineering_pipelines", "distributed_systems"],
    architectureOverview: "Kafka producer streaming geospatial time-series metrics into PySpark / DuckDB transformations and rendering in interactive analytics charts.",
    deliverables: [
      "Synthetic IoT generator streaming 10,000 events/minute with configurable anomalies",
      "Streaming ETL job cleaning missing data points and calculating rolling averages",
      "SQL analytics models (dbt) with automated schema validation tests",
      "Interactive dashboard rendering geographic heatmaps and alert queues"
    ],
    realWorldImpact: "Assists disaster relief coordinators in tracking climate anomalies without borders in real time.",
    borderlessCollaborationTip: "Structure data schemas using Apache Avro/Parquet so downstream analytical tools maintain cross-language compatibility.",
    githubStarterIdeas: [
      "Create sample Dockerized Kafka cluster scripts for single-command bootstrap",
      "Add automated data drift detection alerts using Python"
    ]
  }
];

export interface PresetProfileData {
  id: string;
  name: string;
  roleId: string;
  roleTitle: string;
  headline: string;
  weeklyLearningHours: number;
  preferredLearningFormats: ('video' | 'interactive' | 'documentation' | 'project_based' | 'academic_paper')[];
  preferredLearningPace: 'intensive' | 'balanced' | 'self_paced';
  experienceLevel: 'student' | 'entry_level' | 'mid_level' | 'senior_transitioning' | 'self_taught';
  description: string;
  currentSkills: { skillId: string; skillName: string; currentLevel: 1 | 2 | 3 | 4 | 5; selfAssessedConfidence: number; yearsOfExperience: number }[];
}

export const PRESET_PROFILES: PresetProfileData[] = [
  {
    id: "profile_alex_ai",
    name: "Alex Rivera (Entry-Level AI Candidate)",
    roleId: "ai_engineer",
    roleTitle: "AI & LLM Solutions Engineer",
    headline: "Aspiring Cloud & AI Engineer | Innovate Without Borders Participant",
    weeklyLearningHours: 12,
    preferredLearningFormats: ["interactive", "project_based", "video"],
    preferredLearningPace: "balanced",
    experienceLevel: "entry_level",
    description: "Has baseline Python & SQL, but major P1 bottlenecks in PyTorch and LLM RAG Agents. Needs interactive labs.",
    currentSkills: [
      { skillId: "python", skillName: "Python 3 & Data Structures", currentLevel: 2, selfAssessedConfidence: 65, yearsOfExperience: 1 },
      { skillId: "sql", skillName: "Relational Database Design & SQL", currentLevel: 2, selfAssessedConfidence: 55, yearsOfExperience: 1 },
      { skillId: "typescript", skillName: "TypeScript & Modern JavaScript", currentLevel: 2, selfAssessedConfidence: 60, yearsOfExperience: 1 },
      { skillId: "backend_api_design", skillName: "REST, GraphQL & gRPC API Design", currentLevel: 1, selfAssessedConfidence: 40, yearsOfExperience: 0.5 },
      { skillId: "borderless_collaboration", skillName: "Borderless Global Collaboration & Open Source", currentLevel: 3, selfAssessedConfidence: 75, yearsOfExperience: 2 }
    ]
  },
  {
    id: "profile_elena_cloud",
    name: "Elena Rostova (Mid-Level Full-Stack Architect)",
    roleId: "fullstack_cloud_architect",
    roleTitle: "Full-Stack Cloud & Systems Architect",
    headline: "Senior Frontend Engineer transitioning to Full-Stack Cloud Architecture",
    weeklyLearningHours: 8,
    preferredLearningFormats: ["documentation", "project_based"],
    preferredLearningPace: "self_paced",
    experienceLevel: "mid_level",
    description: "Expert in TypeScript & React (Level 4), but has critical gaps in Kubernetes, CI/CD, and Distributed Systems with only 8 hrs/week availability.",
    currentSkills: [
      { skillId: "typescript", skillName: "TypeScript & Modern JavaScript", currentLevel: 4, selfAssessedConfidence: 90, yearsOfExperience: 4 },
      { skillId: "react_nextjs", skillName: "React & Next.js Ecosystem", currentLevel: 4, selfAssessedConfidence: 90, yearsOfExperience: 3 },
      { skillId: "backend_api_design", skillName: "REST, GraphQL & gRPC API Design", currentLevel: 3, selfAssessedConfidence: 70, yearsOfExperience: 2 },
      { skillId: "sql", skillName: "Relational Database Design & SQL", currentLevel: 3, selfAssessedConfidence: 75, yearsOfExperience: 2 },
      { skillId: "docker_kubernetes", skillName: "Containerization (Docker & Kubernetes)", currentLevel: 1, selfAssessedConfidence: 25, yearsOfExperience: 0.2 },
      { skillId: "cloud_platforms", skillName: "Cloud Infrastructure (GCP / AWS / Azure)", currentLevel: 2, selfAssessedConfidence: 45, yearsOfExperience: 1 },
      { skillId: "borderless_collaboration", skillName: "Borderless Global Collaboration & Open Source", currentLevel: 4, selfAssessedConfidence: 85, yearsOfExperience: 3 }
    ]
  },
  {
    id: "profile_marcus_security",
    name: "Marcus Thorne (Cyber Defense Specialist)",
    roleId: "cyber_defense_specialist",
    roleTitle: "Application Security & Cyber Defense Specialist",
    headline: "Systems Administrator transitioning to Application Security & Zero-Trust Defense",
    weeklyLearningHours: 20,
    preferredLearningFormats: ["interactive", "video"],
    preferredLearningPace: "intensive",
    experienceLevel: "senior_transitioning",
    description: "Strong Linux, Cloud & Python skills (Level 3-4), but zero formal training in OWASP Top 10 web vulnerabilities or Zero-Trust IAM. High 20 hrs/week commitment.",
    currentSkills: [
      { skillId: "python", skillName: "Python 3 & Data Structures", currentLevel: 3, selfAssessedConfidence: 75, yearsOfExperience: 3 },
      { skillId: "cloud_platforms", skillName: "Cloud Infrastructure (GCP / AWS / Azure)", currentLevel: 3, selfAssessedConfidence: 70, yearsOfExperience: 2 },
      { skillId: "docker_kubernetes", skillName: "Containerization (Docker & Kubernetes)", currentLevel: 3, selfAssessedConfidence: 65, yearsOfExperience: 2 },
      { skillId: "app_security_owasp", skillName: "Application Security & OWASP Top 10", currentLevel: 1, selfAssessedConfidence: 20, yearsOfExperience: 0 },
      { skillId: "cloud_security_zero_trust", skillName: "Cloud Security & Zero-Trust Architecture", currentLevel: 1, selfAssessedConfidence: 20, yearsOfExperience: 0 },
      { skillId: "borderless_collaboration", skillName: "Borderless Global Collaboration & Open Source", currentLevel: 3, selfAssessedConfidence: 70, yearsOfExperience: 2 }
    ]
  }
];
