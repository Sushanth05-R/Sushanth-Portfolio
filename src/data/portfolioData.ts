import {
  Project,
  ExperienceItem,
  SkillCategory,
  AchievementItem,
  EducationItem,
} from "@/types";

export const PERSONAL_INFO = {
  name: "Sushanth R",
  role: "Full-Stack & Mobile Developer",
  location: "Udupi, Karnataka, India",
  tagline:
    "Building high-performance cross-platform mobile apps and resilient cloud backends with AI integration and clean architecture.",
  email: "sushanthrpoojari@gmail.com",
  phone: "+91 8105304229",
  github: "https://github.com/Sushanth05-R",
  linkedin: "https://www.linkedin.com/in/sushanth-r-8b9329325/",
  status: "Available for Internships & Opportunities",
  yearsOfStudy: "MCA Student (2024 - 2026)",
  highlights: [
    { label: "Winner", value: "1st Place Dev Challenge" },
    { label: "Published App", value: "Google Play Store" },
    { label: "Architecture", value: "Tri-App & MERN" },
    { label: "Education", value: "MCA (PIM Udupi)" },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "evolish",
    title: "Evolish",
    subtitle: "AI-Powered English Learning & Exam Prep Ecosystem",
    description:
      "A complete mobile and web ecosystem for IELTS & TOEFL-style English prep featuring real-time speech assessment, AI essay evaluation, 'Talk to Book' RAG assistant, Razorpay payments, and offline synchronization.",
    category: "Mobile",
    featured: true,
    badge: "Published on Google Play",
    tags: [
      "React Native (Expo)",
      "React",
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "AI Speech & NLP",
      "Razorpay",
      "RAG Assistant",
    ],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.evolish.app",
    stats: [
      { label: "Availability", value: "Google Play" },
      { label: "Tech Stack", value: "React Native + MERN" },
      { label: "Core Feature", value: "Talk to Book RAG" },
    ],
    mockupType: "mobile",
    caseStudy: {
      role: "Lead Full-Stack & Mobile Developer",
      overview:
        "Evolish addresses the high friction and cost of standardized English test preparation (IELTS, TOEFL) by offering on-demand AI speech analysis, instant essay scoring, interactive 'Talk to Book' conversational study guides, and seamless offline study sync.",
      challenge:
        "Processing audio voice recordings in real-time with actionable pronunciation feedback while keeping app response times instant and handling intermittent mobile connectivity in varying network conditions.",
      solution:
        "Architected a lightweight client using React Native Expo with local caching for offline content, backed by a Node.js/Express service orchestrating AI speech models, RAG vector retrieval for study literature, and Razorpay billing.",
      architecture: [
        "React Native (Expo) cross-platform mobile client with offline SQLite cache",
        "Node.js & Express REST microservices handling audio streams and scoring",
        "MongoDB Atlas for user progress, practice logs, and personalized analytics",
        "'Talk to Book' RAG pipeline using embedding search for textbook content",
        "Razorpay payment gateway integration for premium exam mock unlocks",
      ],
      features: [
        "Real-time speech evaluation measuring pronunciation, fluency, and vocabulary",
        "Instant essay evaluation with granular grammar, structure, and lexical scoring",
        "'Talk to Book' AI assistant allowing students to query study texts naturally",
        "Offline synchronization for practicing questions without active cellular data",
        "Integrated Razorpay payment flow for course enrollment and mock tests",
        "IELTS & TOEFL simulated exam environments with timed sections",
      ],
    },
  },
  {
    id: "elevate-hire",
    title: "ElevateHire",
    subtitle: "AI-Integrated Networking & Placement Training Platform",
    description:
      "A comprehensive career readiness and networking platform that empowers students with AI-driven mock interviews, personalized placement training modules, and real-time skill benchmarking.",
    category: "Web & AI",
    featured: true,
    badge: "Live on Vercel",
    tags: [
      "Next.js",
      "React",
      "Node.js",
      "AI Integration",
      "Tailwind CSS",
      "REST APIs",
    ],
    liveUrl: "https://elevate-hire-app.vercel.app",
    stats: [
      { label: "Deployment", value: "Vercel Production" },
      { label: "Core System", value: "AI Interviewer" },
      { label: "Domain", value: "EdTech & Placement" },
    ],
    mockupType: "web",
    caseStudy: {
      role: "Full-Stack Developer",
      overview:
        "ElevateHire bridges the gap between campus academics and corporate hiring standards, providing candidate preparation with AI interview simulations, placement aptitude tracks, and peer networking.",
      challenge:
        "Providing realistic, adaptive interview feedback tailored to candidate responses without latency delays or repetitive prompts.",
      solution:
        "Built a responsive modern web application using Next.js and React that delivers structured mock interview sessions, evaluates candidate answers across technical and behavioral rubrics, and presents visual performance dashboards.",
      architecture: [
        "Next.js App Router for dynamic server-rendered pages and fast client routing",
        "AI evaluation engine scoring response depth, technical accuracy, and clarity",
        "Interactive dashboard displaying skill readiness radar and interview history",
        "Secure user authentication and role-based training modules",
      ],
      features: [
        "AI-driven mock interview simulation with contextual follow-up questions",
        "Comprehensive placement aptitude tracks covering quantitative and technical domains",
        "Instant feedback breakdown with targeted improvement recommendations",
        "Candidate networking and peer placement preparation forums",
        "Performance analytics and skill readiness tracking",
      ],
    },
  },
  {
    id: "feel-it-buy",
    title: "Feel It Buy",
    subtitle: "Tri-App E-Commerce & On-Demand Logistics Ecosystem",
    description:
      "An end-to-end multi-app commercial architecture comprising a Consumer shopping app, a Warehouse & Product Admin management portal, and a Delivery Partner app with real-time dispatching. Awarded 1st Place in a major Development Challenge.",
    category: "E-Commerce / Ecosystem",
    featured: true,
    badge: "🏆 1st Place Winner",
    tags: [
      "Flutter",
      "React",
      "Supabase",
      "PostgreSQL",
      "Real-time Subscriptions",
      "Role-Based Access",
      "Mobile Logistics",
    ],
    stats: [
      { label: "Award", value: "1st Place Challenge" },
      { label: "Architecture", value: "3 Synchronized Apps" },
      { label: "Backend", value: "Supabase + Postgres" },
    ],
    mockupType: "tri-app",
    caseStudy: {
      role: "Systems Architect & Developer",
      overview:
        "Feel It Buy was built to eliminate inventory discrepancies and order delivery delays by unifying three distinct operational personas (Shopper, Warehouse Admin, and Courier) into a single synchronized data engine.",
      challenge:
        "Maintaining instantaneous consistency across mobile and web interfaces when an order transitions from checkout to warehouse packing and courier dispatch, with zero race conditions.",
      solution:
        "Designed a cohesive ecosystem powered by Supabase and PostgreSQL with Realtime WebSocket channels, enabling sub-second order status updates across Flutter mobile apps and the React administrative portal.",
      architecture: [
        "Consumer App (Flutter): Smooth catalog browsing, cart, and live order status tracking",
        "Warehouse & Admin Portal (React): Real-time inventory adjustments, marketing tools, and order fulfillment controls",
        "Delivery App (Flutter): Order acceptance, delivery route coordinates, and customer handover verification",
        "Supabase Backend: PostgreSQL with row-level security (RLS) and real-time triggers",
      ],
      features: [
        "Consumer Flutter app with high-speed catalog search, filter, and checkout",
        "Admin web dashboard for product catalog, warehouse inventory, and promotions",
        "Dedicated Delivery partner mobile app with instant order ping notifications",
        "Real-time multi-client state synchronization via Supabase channels",
        "Comprehensive order lifecycle management: Placed -> Packed -> Dispatched -> Delivered",
        "Won 1st Place out of competing university teams in the Development Challenge",
      ],
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "evolvetech",
    company: "Evolvetech",
    role: "Full Stack Intern",
    location: "Bengaluru, Karnataka (Hybrid / Agile)",
    startDate: "23 March 2026",
    isUpcomingOrCurrent: true,
    description: [
      "Developing scalable full-stack web and mobile features using the MERN stack (MongoDB, Express.js, React, Node.js).",
      "Designing, integrating, and optimizing RESTful APIs for mission-critical services.",
      "Executing rigorous automated and manual testing, debugging edge cases, and ensuring production readiness.",
      "Authoring comprehensive technical documentation and API specifications.",
      "Collaborating in an Agile team with active participation in sprint planning, code reviews, and daily standups.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Git",
      "Agile/Scrum",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages for systems, algorithms, and application development",
    skills: [
      { name: "Python", level: "Advanced", highlight: true },
      { name: "JavaScript (ES6+)", level: "Advanced", highlight: true },
      { name: "Dart", level: "Proficient", highlight: true },
      { name: "PHP", level: "Proficient" },
    ],
  },
  {
    title: "Frontend & Mobile",
    description: "Building responsive, fluid, and native-feeling client interfaces",
    skills: [
      { name: "React", level: "Advanced", highlight: true },
      { name: "React Native (Expo)", level: "Advanced", highlight: true },
      { name: "Flutter", level: "Advanced", highlight: true },
      { name: "HTML5 & CSS3", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced", highlight: true },
    ],
  },
  {
    title: "Backend & Databases",
    description: "Architecting secure APIs, real-time engines, and data stores",
    skills: [
      { name: "Node.js", level: "Advanced", highlight: true },
      { name: "Express.js", level: "Advanced", highlight: true },
      { name: "MongoDB / Atlas", level: "Advanced", highlight: true },
      { name: "Supabase", level: "Advanced", highlight: true },
      { name: "PostgreSQL", level: "Proficient", highlight: true },
    ],
  },
  {
    title: "Tools & Deployment",
    description: "Developer tooling, CI/CD, and release infrastructure",
    skills: [
      { name: "Git", level: "Advanced" },
      { name: "GitHub", level: "Advanced", highlight: true },
      { name: "Vercel", level: "Advanced", highlight: true },
      { name: "Google Play Console", level: "Proficient", highlight: true },
    ],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "dev-challenge-1st",
    title: "1st Place Winner — Development Challenge",
    organization: "Development Challenge Competition",
    description:
      "Awarded 1st place for designing and engineering 'Feel It Buy', a tri-app e-commerce and logistics ecosystem combining Flutter mobile apps, a React admin portal, and real-time Supabase synchronization.",
    tag: "Award",
    credentialNote: "Tri-App E-Commerce Ecosystem Award",
  },
  {
    id: "nptel-python",
    title: "The Joy of Computing using Python",
    organization: "NPTEL (National Programme on Technology Enhanced Learning)",
    description:
      "Comprehensive certification covering Python algorithmic problem solving, data structures, recursion, and computational thinking.",
    tag: "Certification",
    credentialNote: "Elite Certified / Government of India",
  },
  {
    id: "infosys-php",
    title: "PHP Web Development Certification",
    organization: "Infosys Springboard",
    description:
      "Professional accreditation in server-side web application development, dynamic rendering, relational database connectivity, and backend security fundamentals.",
    tag: "Certification",
    credentialNote: "Infosys Springboard Verified",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: "mca",
    degree: "Master of Computer Applications (MCA)",
    institution: "Poornaprajna Institute of Management",
    location: "Udupi, Karnataka",
    period: "2024 — 2026",
    highlights: [
      "Specialization in Advanced Full-Stack Architecture, Cloud Services, and Distributed Systems.",
      "Active participant and winner in inter-college development hackathons and technical competitions.",
      "Building production-grade mobile applications and AI integration prototypes.",
    ],
  },
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "University Undergraduate Program",
    location: "Karnataka, India",
    period: "2021 — 2024",
    highlights: [
      "Strong foundation in Object-Oriented Programming, Data Structures, Relational Database Management, and Software Engineering.",
      "Built initial web and database projects utilizing PHP, Python, and JavaScript.",
    ],
  },
  {
    id: "diploma-ai",
    degree:
      "Advanced Diploma in AI, Big Data Analytics & Cyber Security",
    institution: "Udupi Group of Institute",
    location: "Manipal, Karnataka",
    period: "Specialized Diploma",
    highlights: [
      "Rigorous training in Applied Machine Learning concepts, Big Data processing workflows, and Cyber Security defensive protocols.",
      "Hands-on practice analyzing security vulnerabilities, authentication patterns, and scalable data pipelines.",
    ],
  },
];

