import os
import json
import random

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

# 1. 80-100 Detailed Skills
SKILLS = [
    # Languages
    {"id": "python", "name": "Python", "category": "Languages", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "High-level general-purpose programming language for backend, AI, and data science."},
    {"id": "javascript", "name": "JavaScript", "category": "Languages", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Core language for interactive web and browser scripting."},
    {"id": "typescript", "name": "TypeScript", "category": "Languages", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Typed superset of JavaScript enhancing code quality in large applications."},
    {"id": "java", "name": "Java", "category": "Languages", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Object-oriented language powering enterprise applications and Android."},
    {"id": "c", "name": "C", "category": "Languages", "difficulty": "Beginner", "industry_demand": "Medium", "emerging_status": "Established", "description": "Foundational low-level systems programming language."},
    {"id": "c++", "name": "C++", "category": "Languages", "difficulty": "Intermediate-Advanced", "industry_demand": "High", "emerging_status": "Established", "description": "High-performance systems, game engines, and competitive programming language."},
    {"id": "c#", "name": "C#", "category": "Languages", "difficulty": "Intermediate", "industry_demand": "Medium", "emerging_status": "Established", "description": "Modern multi-paradigm language for .NET ecosystem and Unity."},
    {"id": "go", "name": "Go", "category": "Languages", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Concise language designed by Google for scalable cloud microservices."},
    {"id": "rust", "name": "Rust", "category": "Languages", "difficulty": "Advanced", "industry_demand": "High", "emerging_status": "Emerging", "description": "Memory-safe systems programming language without garbage collection."},
    {"id": "kotlin", "name": "Kotlin", "category": "Languages", "difficulty": "Intermediate", "industry_demand": "Medium", "emerging_status": "Growing", "description": "Modern language for Android development and JVM applications."},
    {"id": "swift", "name": "Swift", "category": "Languages", "difficulty": "Intermediate", "industry_demand": "Medium", "emerging_status": "Established", "description": "Apple's native programming language for iOS and macOS apps."},
    {"id": "php", "name": "PHP", "category": "Languages", "difficulty": "Beginner", "industry_demand": "Medium", "emerging_status": "Established", "description": "Server-side scripting language powering web CMS and legacy backends."},
    {"id": "r", "name": "R", "category": "Languages", "difficulty": "Intermediate", "industry_demand": "Medium", "emerging_status": "Established", "description": "Specialized statistical computing and data graphics language."},
    {"id": "dart", "name": "Dart", "category": "Languages", "difficulty": "Beginner", "industry_demand": "Medium", "emerging_status": "Growing", "description": "Client-optimized language for multi-platform apps via Flutter."},
    {"id": "shell", "name": "Shell Scripting", "category": "Languages", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Bash and command-line automation for Linux administration."},

    # Web/Frontend
    {"id": "html", "name": "HTML5", "category": "Web/Frontend", "difficulty": "Beginner", "industry_demand": "High", "emerging_status": "Established", "description": "Standard markup language for web document structure."},
    {"id": "css", "name": "CSS3", "category": "Web/Frontend", "difficulty": "Beginner", "industry_demand": "High", "emerging_status": "Established", "description": "Style sheet language describing visual presentation of web pages."},
    {"id": "react", "name": "React", "category": "Web/Frontend", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Popular declarative component-based UI library developed by Meta."},
    {"id": "next.js", "name": "Next.js", "category": "Web/Frontend", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Full-stack React framework featuring server-side rendering and static export."},
    {"id": "angular", "name": "Angular", "category": "Web/Frontend", "difficulty": "Advanced", "industry_demand": "Medium", "emerging_status": "Established", "description": "Batteries-included TypeScript web framework for enterprise frontends."},
    {"id": "vue", "name": "Vue.js", "category": "Web/Frontend", "difficulty": "Beginner-Intermediate", "industry_demand": "Medium", "emerging_status": "Established", "description": "Progressive, approachable framework for building user interfaces."},
    {"id": "tailwind", "name": "Tailwind CSS", "category": "Web/Frontend", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Utility-first CSS framework for rapid modern UI development."},
    {"id": "bootstrap", "name": "Bootstrap", "category": "Web/Frontend", "difficulty": "Beginner", "industry_demand": "Medium", "emerging_status": "Established", "description": "Responsive front-end toolkit for mobile-first responsive sites."},
    {"id": "redux", "name": "Redux Toolkit", "category": "Web/Frontend", "difficulty": "Intermediate", "industry_demand": "Medium", "emerging_status": "Established", "description": "Predictable state container for complex frontend workflows."},

    # Backend
    {"id": "node.js", "name": "Node.js", "category": "Backend", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Asynchronous event-driven JavaScript runtime built on Chrome's V8 engine."},
    {"id": "express", "name": "Express.js", "category": "Backend", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Minimalist web framework for Node.js REST APIs."},
    {"id": "django", "name": "Django", "category": "Backend", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "High-level Python web framework encouraging clean, pragmatic design."},
    {"id": "fastapi", "name": "FastAPI", "category": "Backend", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Emerging", "description": "Modern high-performance Python web framework based on standard type hints."},
    {"id": "flask", "name": "Flask", "category": "Backend", "difficulty": "Beginner", "industry_demand": "Medium", "emerging_status": "Established", "description": "Lightweight Python WSGI micro web framework."},
    {"id": "spring", "name": "Spring Boot", "category": "Backend", "difficulty": "Advanced", "industry_demand": "High", "emerging_status": "Established", "description": "Enterprise microservice framework for Java ecosystem."},
    {"id": "rest apis", "name": "REST APIs", "category": "Backend", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Architectural style for designing networked services and API contracts."},
    {"id": "graphql", "name": "GraphQL", "category": "Backend", "difficulty": "Intermediate", "industry_demand": "Medium", "emerging_status": "Growing", "description": "Query language for APIs offering declarative data fetching."},
    {"id": "microservices", "name": "Microservices", "category": "Backend", "difficulty": "Advanced", "industry_demand": "High", "emerging_status": "Growing", "description": "Architectural approach designing applications as collections of small autonomous services."},

    # Databases
    {"id": "sql", "name": "SQL", "category": "Databases", "difficulty": "Beginner", "industry_demand": "High", "emerging_status": "Established", "description": "Standard declarative query language for relational database management."},
    {"id": "postgresql", "name": "PostgreSQL", "category": "Databases", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Advanced open-source object-relational database with strong JSON support."},
    {"id": "mysql", "name": "MySQL", "category": "Databases", "difficulty": "Beginner", "industry_demand": "High", "emerging_status": "Established", "description": "Widely deployed relational database management system."},
    {"id": "mongodb", "name": "MongoDB", "category": "Databases", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Leading document-oriented NoSQL database for JSON schema flexibility."},
    {"id": "redis", "name": "Redis", "category": "Databases", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "In-memory data structure store used as a cache, database, and message broker."},
    {"id": "elasticsearch", "name": "Elasticsearch", "category": "Databases", "difficulty": "Intermediate-Advanced", "industry_demand": "Medium", "emerging_status": "Growing", "description": "Distributed search and analytics engine for text indexing and logs."},

    # Cloud & DevOps
    {"id": "aws", "name": "AWS", "category": "Cloud/DevOps", "difficulty": "Intermediate-Advanced", "industry_demand": "High", "emerging_status": "Established", "description": "Comprehensive Amazon Web Services cloud infrastructure suite."},
    {"id": "azure", "name": "Azure", "category": "Cloud/DevOps", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Microsoft's cloud platform for enterprise hosting and hybrid compute."},
    {"id": "gcp", "name": "Google Cloud (GCP)", "category": "Cloud/DevOps", "difficulty": "Intermediate", "industry_demand": "Medium", "emerging_status": "Growing", "description": "Google's cloud computing services suite emphasizing big data and ML."},
    {"id": "docker", "name": "Docker", "category": "Cloud/DevOps", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Platform for developing, shipping, and running applications in lightweight containers."},
    {"id": "kubernetes", "name": "Kubernetes", "category": "Cloud/DevOps", "difficulty": "Advanced", "industry_demand": "High", "emerging_status": "Growing", "description": "Container orchestration system for automating containerized software deployment."},
    {"id": "git", "name": "Git", "category": "Cloud/DevOps", "difficulty": "Beginner", "industry_demand": "High", "emerging_status": "Established", "description": "Distributed version control system for tracking changes in source code."},
    {"id": "github", "name": "GitHub & CI/CD", "category": "Cloud/DevOps", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Code hosting platform with integrated continuous integration workflows."},
    {"id": "linux", "name": "Linux OS", "category": "Cloud/DevOps", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Open-source Unix-like operating system powering cloud servers."},
    {"id": "terraform", "name": "Terraform", "category": "Cloud/DevOps", "difficulty": "Intermediate-Advanced", "industry_demand": "High", "emerging_status": "Growing", "description": "Infrastructure as code tool for provisioning multi-cloud resources."},
    {"id": "ci/cd", "name": "CI/CD Pipelines", "category": "Cloud/DevOps", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Automated build, test, and release deployment practices."},

    # Data & Analytics
    {"id": "excel", "name": "Advanced Excel", "category": "Data & Analytics", "difficulty": "Beginner", "industry_demand": "High", "emerging_status": "Established", "description": "Spreadsheet calculations, pivot tables, and analytical formulas."},
    {"id": "power bi", "name": "Power BI", "category": "Data & Analytics", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Business analytics service by Microsoft delivering interactive dashboards."},
    {"id": "tableau", "name": "Tableau", "category": "Data & Analytics", "difficulty": "Intermediate", "industry_demand": "Medium", "emerging_status": "Established", "description": "Data visualization tool focused on business intelligence reports."},
    {"id": "pandas", "name": "Pandas", "category": "Data & Analytics", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Python data manipulation and numerical analysis library."},
    {"id": "numpy", "name": "NumPy", "category": "Data & Analytics", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Fundamental scientific computing package for Python array manipulation."},
    {"id": "spark", "name": "Apache Spark", "category": "Data & Analytics", "difficulty": "Advanced", "industry_demand": "High", "emerging_status": "Growing", "description": "Unified analytics engine for large-scale distributed data processing."},
    {"id": "kafka", "name": "Apache Kafka", "category": "Data & Analytics", "difficulty": "Advanced", "industry_demand": "High", "emerging_status": "Growing", "description": "Distributed event store and stream-processing platform."},
    {"id": "data science", "name": "Data Science Foundations", "category": "Data & Analytics", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Statistical inference, feature engineering, and exploratory data analysis."},

    # AI/ML
    {"id": "machine learning", "name": "Machine Learning", "category": "AI/ML", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Algorithmic modeling allowing computers to learn patterns from training data."},
    {"id": "deep learning", "name": "Deep Learning", "category": "AI/ML", "difficulty": "Advanced", "industry_demand": "High", "emerging_status": "Growing", "description": "Artificial neural networks with multiple layers for perceptual computing."},
    {"id": "tensorflow", "name": "TensorFlow", "category": "AI/ML", "difficulty": "Intermediate-Advanced", "industry_demand": "Medium", "emerging_status": "Established", "description": "End-to-end open source platform for machine learning by Google."},
    {"id": "pytorch", "name": "PyTorch", "category": "AI/ML", "difficulty": "Intermediate-Advanced", "industry_demand": "High", "emerging_status": "Growing", "description": "Dynamic tensor framework optimized for deep learning research and production."},
    {"id": "scikit-learn", "name": "Scikit-Learn", "category": "AI/ML", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Standard Python library for classical machine learning algorithms."},
    {"id": "nlp", "name": "Natural Language Processing (NLP)", "category": "AI/ML", "difficulty": "Intermediate-Advanced", "industry_demand": "High", "emerging_status": "Growing", "description": "Techniques for computer comprehension and generation of human languages."},
    {"id": "llm", "name": "LLMs & Generative AI", "category": "AI/ML", "difficulty": "Advanced", "industry_demand": "High", "emerging_status": "Emerging", "description": "Prompt engineering, RAG pipelines, fine-tuning, and LLM orchestration."},
    {"id": "computer vision", "name": "Computer Vision", "category": "AI/ML", "difficulty": "Advanced", "industry_demand": "Medium", "emerging_status": "Growing", "description": "Image and video understanding using neural convolutions and OpenCV."},

    # Security & Infrastructure
    {"id": "cybersecurity", "name": "Cybersecurity Foundations", "category": "Security & Infra", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "Defensive controls protecting digital systems, networks, and confidential data."},
    {"id": "networking", "name": "Computer Networking", "category": "Security & Infra", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "TCP/IP, subnetting, DNS, routing protocols, and OSI model architectures."},
    {"id": "cloud security", "name": "Cloud Security", "category": "Security & Infra", "difficulty": "Intermediate-Advanced", "industry_demand": "High", "emerging_status": "Growing", "description": "IAM role management, VPC boundaries, zero trust, and encryption protocols."},
    {"id": "ethical hacking", "name": "Ethical Hacking & VAPT", "category": "Security & Infra", "difficulty": "Advanced", "industry_demand": "Medium", "emerging_status": "Growing", "description": "Vulnerability assessment and penetration testing across web and networks."},

    # Design, Mobile & Soft Skills
    {"id": "ui/ux", "name": "UI/UX Design", "category": "Design & Soft Skills", "difficulty": "Beginner-Intermediate", "industry_demand": "High", "emerging_status": "Growing", "description": "User persona analysis, usability testing, and visual interface ergonomics."},
    {"id": "figma", "name": "Figma", "category": "Design & Soft Skills", "difficulty": "Beginner", "industry_demand": "High", "emerging_status": "Growing", "description": "Collaborative cloud vector design and high-fidelity prototyping software."},
    {"id": "flutter", "name": "Flutter", "category": "Design & Soft Skills", "difficulty": "Intermediate", "industry_demand": "Medium", "emerging_status": "Growing", "description": "Google's UI toolkit for natively compiled mobile, web, and desktop apps."},
    {"id": "communication", "name": "Professional Communication", "category": "Design & Soft Skills", "difficulty": "Beginner", "industry_demand": "High", "emerging_status": "Established", "description": "Clear verbal and written articulation, presentation, and technical documentation."},
    {"id": "leadership", "name": "Leadership", "category": "Design & Soft Skills", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Strategic direction, initiative taking, and cross-functional team mentorship."},
    {"id": "problem solving", "name": "Analytical Problem Solving", "category": "Design & Soft Skills", "difficulty": "Beginner-Advanced", "industry_demand": "High", "emerging_status": "Established", "description": "Structured root cause analysis, algorithmic logic, and critical reasoning."},
    {"id": "project management", "name": "Project Management (Agile/Scrum)", "category": "Design & Soft Skills", "difficulty": "Intermediate", "industry_demand": "High", "emerging_status": "Established", "description": "Sprint planning, milestone tracking, Jira management, and Agile ceremonies."}
]

# 2. 15+ Core Job Roles with Required, Preferred, Priorities & Roadmaps
JOB_ROLES = [
    {
        "id": "full-stack-developer",
        "title": "Full Stack Developer",
        "industry": "IT & Software",
        "experience_level": "Entry to Mid",
        "description": "Builds end-to-end web applications covering responsive frontends, server-side APIs, database management, and cloud deployments.",
        "required_skills": [
            {"skill_id": "html", "importance": "high"},
            {"skill_id": "css", "importance": "high"},
            {"skill_id": "javascript", "importance": "high"},
            {"skill_id": "react", "importance": "high"},
            {"skill_id": "node.js", "importance": "high"},
            {"skill_id": "sql", "importance": "high"},
            {"skill_id": "git", "importance": "medium"},
            {"skill_id": "rest apis", "importance": "high"}
        ],
        "preferred_skills": ["typescript", "docker", "tailwind", "mongodb", "aws"],
        "roadmap": ["HTML5 & CSS3 Basics", "Modern JavaScript (ES6+)", "Frontend with React & State", "Backend with Node.js & Express", "Relational Databases with SQL", "RESTful API Integration", "Version Control with Git", "Deployment to Cloud Platform"]
    },
    {
        "id": "data-analyst",
        "title": "Data Analyst",
        "industry": "Analytics & BFSI",
        "experience_level": "Entry Level",
        "description": "Collects, cleans, and translates complex business metrics into visual dashboards and actionable management insights.",
        "required_skills": [
            {"skill_id": "excel", "importance": "high"},
            {"skill_id": "sql", "importance": "high"},
            {"skill_id": "python", "importance": "high"},
            {"skill_id": "power bi", "importance": "medium"},
            {"skill_id": "pandas", "importance": "high"},
            {"skill_id": "communication", "importance": "medium"}
        ],
        "preferred_skills": ["tableau", "numpy", "r", "problem solving"],
        "roadmap": ["Advanced Excel & Pivot Modeling", "SQL Querying & Data Extraction", "Python for Data Analysis (Pandas/NumPy)", "BI Dashboarding with Power BI/Tableau", "Statistical Hypothesis Testing", "Business Storytelling & Presentation"]
    },
    {
        "id": "ai-ml-engineer",
        "title": "AI/ML Engineer",
        "industry": "AI & DeepTech",
        "experience_level": "Mid Level",
        "description": "Researches, constructs, trains, and deploys predictive machine learning and deep learning neural models at scale.",
        "required_skills": [
            {"skill_id": "python", "importance": "high"},
            {"skill_id": "machine learning", "importance": "high"},
            {"skill_id": "deep learning", "importance": "high"},
            {"skill_id": "pytorch", "importance": "high"},
            {"skill_id": "scikit-learn", "importance": "high"},
            {"skill_id": "sql", "importance": "medium"}
        ],
        "preferred_skills": ["nlp", "computer vision", "llm", "docker", "aws"],
        "roadmap": ["Python Scientific Stack (NumPy/Pandas)", "Linear Algebra & Probability", "Classical ML with Scikit-Learn", "Deep Learning Foundations (PyTorch/TF)", "NLP & LLM Architectures", "MLOps & Model Deployment"]
    },
    {
        "id": "cloud-engineer",
        "title": "Cloud Engineer",
        "industry": "Cloud & Infrastructure",
        "experience_level": "Entry to Mid",
        "description": "Architects, provisions, and maintains reliable, fault-tolerant, and secure cloud environments across enterprise workloads.",
        "required_skills": [
            {"skill_id": "aws", "importance": "high"},
            {"skill_id": "linux", "importance": "high"},
            {"skill_id": "docker", "importance": "high"},
            {"skill_id": "networking", "importance": "high"},
            {"skill_id": "shell", "importance": "medium"},
            {"skill_id": "git", "importance": "medium"}
        ],
        "preferred_skills": ["kubernetes", "terraform", "azure", "cloud security"],
        "roadmap": ["Linux System Administration", "Computer Networking (TCP/IP, VPC, DNS)", "Cloud Core Services (AWS Compute/Storage)", "Containerization with Docker", "Infrastructure as Code (Terraform)", "Cloud Security Best Practices"]
    },
    {
        "id": "devops-engineer",
        "title": "DevOps Engineer",
        "industry": "IT & Software",
        "experience_level": "Mid Level",
        "description": "Bridges development and IT operations through automated CI/CD pipelines, container orchestration, and continuous monitoring.",
        "required_skills": [
            {"skill_id": "docker", "importance": "high"},
            {"skill_id": "kubernetes", "importance": "high"},
            {"skill_id": "ci/cd", "importance": "high"},
            {"skill_id": "linux", "importance": "high"},
            {"skill_id": "git", "importance": "high"},
            {"skill_id": "terraform", "importance": "medium"}
        ],
        "preferred_skills": ["aws", "shell", "python", "ansible"],
        "roadmap": ["Linux & Bash Automation", "Git & Branching Strategies", "Docker Container Engineering", "CI/CD Pipeline Building", "Kubernetes Orchestration & Helm", "Infrastructure as Code & Monitoring"]
    },
    {
        "id": "cybersecurity-analyst",
        "title": "Cybersecurity Analyst",
        "industry": "Security & Defense",
        "experience_level": "Entry to Mid",
        "description": "Monitors network activities, identifies vulnerabilities, defends against cyber incursions, and ensures regulatory compliance.",
        "required_skills": [
            {"skill_id": "cybersecurity", "importance": "high"},
            {"skill_id": "networking", "importance": "high"},
            {"skill_id": "linux", "importance": "high"},
            {"skill_id": "cloud security", "importance": "medium"},
            {"skill_id": "problem solving", "importance": "high"}
        ],
        "preferred_skills": ["ethical hacking", "python", "shell"],
        "roadmap": ["Network Security & Protocols", "Linux Server Hardening", "Threat Analysis & SOC Operations", "Vulnerability Scanning & VAPT", "Cloud Security Policies", "Incident Response Procedures"]
    },
    {
        "id": "data-scientist",
        "title": "Data Scientist",
        "industry": "Analytics & AI",
        "experience_level": "Mid Level",
        "description": "Combines statistics, mathematical modeling, and machine learning to extract hidden signals from big data.",
        "required_skills": [
            {"skill_id": "python", "importance": "high"},
            {"skill_id": "sql", "importance": "high"},
            {"skill_id": "data science", "importance": "high"},
            {"skill_id": "machine learning", "importance": "high"},
            {"skill_id": "pandas", "importance": "high"},
            {"skill_id": "communication", "importance": "medium"}
        ],
        "preferred_skills": ["spark", "deep learning", "r", "tableau"],
        "roadmap": ["Data Wrangling with Pandas", "Exploratory Data Analysis & Viz", "Inferential Statistics", "Predictive ML Modeling", "Big Data Processing with Spark", "Executive Insights Delivery"]
    },
    {
        "id": "ui-ux-designer",
        "title": "UI/UX Designer",
        "industry": "Design & Products",
        "experience_level": "Entry Level",
        "description": "Crafts intuitive digital interfaces, conducts user experience research, and creates design systems.",
        "required_skills": [
            {"skill_id": "ui/ux", "importance": "high"},
            {"skill_id": "figma", "importance": "high"},
            {"skill_id": "html", "importance": "medium"},
            {"skill_id": "css", "importance": "medium"},
            {"skill_id": "problem solving", "importance": "high"}
        ],
        "preferred_skills": ["communication", "tailwind"],
        "roadmap": ["Design Principles & Typography", "User Research & Journey Mapping", "Wireframing & Information Architecture", "High-Fidelity Prototyping in Figma", "Design Systems & Component Libraries", "Usability Testing & Feedback Loops"]
    },
    {
        "id": "frontend-developer",
        "title": "Frontend Developer",
        "industry": "IT & Software",
        "experience_level": "Entry Level",
        "description": "Creates responsive, accessible, and performant user-facing web applications.",
        "required_skills": [
            {"skill_id": "html", "importance": "high"},
            {"skill_id": "css", "importance": "high"},
            {"skill_id": "javascript", "importance": "high"},
            {"skill_id": "react", "importance": "high"},
            {"skill_id": "tailwind", "importance": "medium"},
            {"skill_id": "git", "importance": "medium"}
        ],
        "preferred_skills": ["typescript", "next.js", "redux"],
        "roadmap": ["Semantic HTML5 & Modern CSS", "DOM Manipulation & Async JS", "React Component Lifecycle", "Tailwind Design Implementation", "State Management & API Fetching", "Frontend Testing & Web Performance"]
    },
    {
        "id": "backend-developer",
        "title": "Backend Developer",
        "industry": "IT & Software",
        "experience_level": "Entry Level",
        "description": "Constructs resilient server architectures, high-throughput microservices, and database pipelines.",
        "required_skills": [
            {"skill_id": "python", "importance": "high"},
            {"skill_id": "fastapi", "importance": "high"},
            {"skill_id": "sql", "importance": "high"},
            {"skill_id": "rest apis", "importance": "high"},
            {"skill_id": "git", "importance": "medium"}
        ],
        "preferred_skills": ["postgresql", "redis", "docker", "microservices"],
        "roadmap": ["Backend Language Fundamentals", "Relational Database Design & Indexing", "RESTful API Architecture", "Authentication & Security", "Caching with Redis", "Containerized Deployment"]
    },
    {
        "id": "software-developer",
        "title": "Software Developer (General)",
        "industry": "IT & Software",
        "experience_level": "Entry Level",
        "description": "Builds robust software modules, executes unit testing, and works across software engineering lifecycles.",
        "required_skills": [
            {"skill_id": "java", "importance": "high"},
            {"skill_id": "sql", "importance": "high"},
            {"skill_id": "git", "importance": "high"},
            {"skill_id": "problem solving", "importance": "high"}
        ],
        "preferred_skills": ["c++", "spring", "docker", "rest apis"],
        "roadmap": ["Core Data Structures & Algorithms", "Object-Oriented Programming (Java/C++)", "Database Management Systems", "Git & Agile Workflows", "Unit Testing & Code Quality"]
    },
    {
        "id": "product-manager",
        "title": "Associate Product Manager",
        "industry": "Product Management",
        "experience_level": "Entry to Mid",
        "description": "Defines product roadmaps, gathers customer requirements, and coordinates engineering and design teams.",
        "required_skills": [
            {"skill_id": "project management", "importance": "high"},
            {"skill_id": "communication", "importance": "high"},
            {"skill_id": "problem solving", "importance": "high"},
            {"skill_id": "excel", "importance": "medium"},
            {"skill_id": "leadership", "importance": "high"}
        ],
        "preferred_skills": ["sql", "ui/ux", "power bi"],
        "roadmap": ["Product Discovery & User Personas", "Agile & Scrum Sprints", "Data-Informed Metrics (KPIs/OKRs)", "Feature Prioritization Frameworks", "Cross-Functional Leadership"]
    },
    {
        "id": "business-analyst",
        "title": "Business Analyst",
        "industry": "Consulting & Enterprise",
        "experience_level": "Entry Level",
        "description": "Translates business operational goals into clear technical specifications and process diagrams.",
        "required_skills": [
            {"skill_id": "excel", "importance": "high"},
            {"skill_id": "sql", "importance": "high"},
            {"skill_id": "communication", "importance": "high"},
            {"skill_id": "project management", "importance": "medium"}
        ],
        "preferred_skills": ["power bi", "tableau", "problem solving"],
        "roadmap": ["Business Process Modeling", "Requirements Elicitation & BRD", "Data Extraction with SQL", "KPI Dashboarding", "Stakeholder Communication"]
    },
    {
        "id": "embedded-systems-engineer",
        "title": "Embedded Systems Engineer",
        "industry": "Automotive & Hardware",
        "experience_level": "Entry to Mid",
        "description": "Programs firmware and microcontrollers for automotive, medical, and industrial electronics.",
        "required_skills": [
            {"skill_id": "c", "importance": "high"},
            {"skill_id": "c++", "importance": "high"},
            {"skill_id": "linux", "importance": "medium"},
            {"skill_id": "problem solving", "importance": "high"}
        ],
        "preferred_skills": ["shell", "networking"],
        "roadmap": ["Embedded C/C++ Architecture", "Microcontroller Interfacing (GPIO, I2C, SPI)", "Real-Time Operating Systems (RTOS)", "Hardware Debugging & Oscilloscopes", "Firmware Verification"]
    },
    {
        "id": "iot-engineer",
        "title": "IoT Engineer",
        "industry": "Smart Systems & Hardware",
        "experience_level": "Entry to Mid",
        "description": "Integrates connected sensor edge devices with cloud analytics and telemetry pipelines.",
        "required_skills": [
            {"skill_id": "python", "importance": "high"},
            {"skill_id": "c", "importance": "high"},
            {"skill_id": "networking", "importance": "high"},
            {"skill_id": "aws", "importance": "medium"}
        ],
        "preferred_skills": ["linux", "docker", "rest apis"],
        "roadmap": ["Edge Sensor Programming", "IoT Protocols (MQTT, CoAP, BLE)", "Cloud IoT Core Telemetry", "Edge Analytics & Security", "End-to-End Smart City Prototype"]
    }
]

# 3. 30+ Courses with Skill India, NCS, AICTE references
COURSES = [
    {"id": "c1", "name": "Full Stack Web Development with React & Node", "provider": "Skill India Digital Hub", "skill_id": "react", "difficulty": "Intermediate", "duration": "12 Weeks", "certification": "Government Certified", "url": "https://courses.skillindiadigital.gov.in/", "description": "Hands-on mastery of component UI, REST backends, and full project deployment."},
    {"id": "c2", "name": "Python for Data Science and Machine Learning", "provider": "NCS (National Career Service)", "skill_id": "python", "difficulty": "Beginner-Intermediate", "duration": "8 Weeks", "certification": "NCS Verified", "url": "https://www.ncs.gov.in/", "description": "Covers data wrangling with Pandas, NumPy calculations, and basic machine learning."},
    {"id": "c3", "name": "Relational Database Management & SQL Mastery", "provider": "AICTE Internship Portal", "skill_id": "sql", "difficulty": "Beginner", "duration": "6 Weeks", "certification": "AICTE Recognized", "url": "https://internship.aicte-india.org/", "description": "Database design, index optimization, complex joins, and stored procedures."},
    {"id": "c4", "name": "Cloud Computing Fundamentals (AWS Cloud Practitioner)", "provider": "Skill India Digital Hub", "skill_id": "aws", "difficulty": "Beginner-Intermediate", "duration": "8 Weeks", "certification": "AWS Accredited", "url": "https://courses.skillindiadigital.gov.in/", "description": "VPC networking, EC2 compute instances, S3 storage, and identity management."},
    {"id": "c5", "name": "Docker and Kubernetes Microservices Architecture", "provider": "NPTEL / AICTE", "skill_id": "docker", "difficulty": "Intermediate", "duration": "10 Weeks", "certification": "NPTEL Certificate", "url": "https://internship.aicte-india.org/", "description": "Containerizing services, container orchestration, and Helm deployments."},
    {"id": "c6", "name": "Cybersecurity Operations & Threat Defense", "provider": "Skill India Digital Hub", "skill_id": "cybersecurity", "difficulty": "Intermediate", "duration": "12 Weeks", "certification": "Govt of Maharashtra MSBTE", "url": "https://courses.skillindiadigital.gov.in/", "description": "Security protocols, SOC operations, defensive monitoring, and incident mitigation."},
    {"id": "c7", "name": "Deep Learning & Neural Networks with PyTorch", "provider": "NCS (National Career Service)", "skill_id": "pytorch", "difficulty": "Advanced", "duration": "10 Weeks", "certification": "NCS Verified", "url": "https://www.ncs.gov.in/", "description": "CNNs, RNNs, transformer architectures, and deep neural network training."},
    {"id": "c8", "name": "Data Analytics with Power BI & Advanced Excel", "provider": "Skill India Digital Hub", "skill_id": "power bi", "difficulty": "Beginner-Intermediate", "duration": "6 Weeks", "certification": "Skill India Badge", "url": "https://courses.skillindiadigital.gov.in/", "description": "DAX expressions, dynamic visualizations, and executive dashboard modeling."},
    {"id": "c9", "name": "Modern UI/UX Design & Figma System Architecture", "provider": "AICTE Internship Portal", "skill_id": "figma", "difficulty": "Beginner", "duration": "6 Weeks", "certification": "AICTE Recognized", "url": "https://internship.aicte-india.org/", "description": "Visual hierarchy, Figma auto-layouts, design tokens, and user research workflows."},
    {"id": "c10", "name": "CI/CD Automation with GitHub Actions & DevOps", "provider": "Skill India Digital Hub", "skill_id": "ci/cd", "difficulty": "Intermediate", "duration": "8 Weeks", "certification": "Skill India Badge", "url": "https://courses.skillindiadigital.gov.in/", "description": "Automated pipelines, unit test integration, artifact building, and deployment scripts."},
    {"id": "c11", "name": "FastAPI & Microservices Architecture in Python", "provider": "NCS (National Career Service)", "skill_id": "fastapi", "difficulty": "Intermediate", "duration": "6 Weeks", "certification": "NCS Verified", "url": "https://www.ncs.gov.in/", "description": "High performance async APIs, Pydantic data validation, and OpenAPI documentation."},
    {"id": "c12", "name": "Linux Administration & Shell Scripting", "provider": "Skill India Digital Hub", "skill_id": "linux", "difficulty": "Beginner", "duration": "6 Weeks", "certification": "Skill India Badge", "url": "https://courses.skillindiadigital.gov.in/", "description": "File system navigation, permission controls, systemd management, and bash automation."},
    {"id": "c13", "name": "Large Language Models & Generative AI Engineering", "provider": "AICTE Internship Portal", "skill_id": "llm", "difficulty": "Advanced", "duration": "8 Weeks", "certification": "AICTE Recognized", "url": "https://internship.aicte-india.org/", "description": "RAG architectures, vector databases, LangChain orchestration, and prompt engineering."},
    {"id": "c14", "name": "Enterprise Java with Spring Boot", "provider": "NCS (National Career Service)", "skill_id": "spring", "difficulty": "Advanced", "duration": "12 Weeks", "certification": "NCS Verified", "url": "https://www.ncs.gov.in/", "description": "Dependency injection, JPA Hibernate, microservice gateways, and security."},
    {"id": "c15", "name": "Modern TypeScript for Production Web Applications", "provider": "Skill India Digital Hub", "skill_id": "typescript", "difficulty": "Intermediate", "duration": "6 Weeks", "certification": "Skill India Badge", "url": "https://courses.skillindiadigital.gov.in/", "description": "Type systems, generics, interface declarations, and static type safety."},
    {"id": "c16", "name": "MongoDB & NoSQL Data Architecture", "provider": "AICTE Internship Portal", "skill_id": "mongodb", "difficulty": "Intermediate", "duration": "6 Weeks", "certification": "AICTE Recognized", "url": "https://internship.aicte-india.org/", "description": "Document schema modeling, aggregation pipelines, and high-availability clusters."},
    {"id": "c17", "name": "Computer Networks & Network Security Protocols", "provider": "Skill India Digital Hub", "skill_id": "networking", "difficulty": "Beginner-Intermediate", "duration": "8 Weeks", "certification": "Govt of Maharashtra MSBTE", "url": "https://courses.skillindiadigital.gov.in/", "description": "TCP/IP layers, routing switching, firewall rules, and packet inspection."},
    {"id": "c18", "name": "Agile Project Management & Scrum Mastership", "provider": "NCS (National Career Service)", "skill_id": "project management", "difficulty": "Beginner-Intermediate", "duration": "4 Weeks", "certification": "NCS Verified", "url": "https://www.ncs.gov.in/", "description": "Sprint ceremonies, backlog grooming, velocity tracking, and Jira workflows."},
    {"id": "c19", "name": "Embedded C Programming & Hardware Interfacing", "provider": "Skill India Digital Hub", "skill_id": "c", "difficulty": "Intermediate", "duration": "10 Weeks", "certification": "Skill India Badge", "url": "https://courses.skillindiadigital.gov.in/", "description": "ARM Cortex architecture, peripheral protocols, and register-level coding."},
    {"id": "c20", "name": "Data Engineering Pipelines with Apache Spark", "provider": "AICTE Internship Portal", "skill_id": "spark", "difficulty": "Advanced", "duration": "10 Weeks", "certification": "AICTE Recognized", "url": "https://internship.aicte-india.org/", "description": "PySpark dataframes, resilient distributed datasets, and streaming telemetry."},
    {"id": "c21", "name": "Tailwind CSS & Responsive Design Systems", "provider": "Skill India Digital Hub", "skill_id": "tailwind", "difficulty": "Beginner", "duration": "4 Weeks", "certification": "Skill India Badge", "url": "https://courses.skillindiadigital.gov.in/", "description": "Utility classes, flexbox/grid layout design, and dark mode configuration."},
    {"id": "c22", "name": "Redis In-Memory Caching & Session Store", "provider": "NCS (National Career Service)", "skill_id": "redis", "difficulty": "Intermediate", "duration": "4 Weeks", "certification": "NCS Verified", "url": "https://www.ncs.gov.in/", "description": "Key-value indexing, pub/sub messaging, and cache invalidation strategies."},
    {"id": "c23", "name": "Ethical Hacking & Web Application Penetration Testing", "provider": "Skill India Digital Hub", "skill_id": "ethical hacking", "difficulty": "Advanced", "duration": "12 Weeks", "certification": "Govt of Maharashtra Certified", "url": "https://courses.skillindiadigital.gov.in/", "description": "OWASP Top 10 vulnerabilities, Kali Linux exploitation, and reporting."},
    {"id": "c24", "name": "Infrastructure as Code with HashiCorp Terraform", "provider": "AICTE Internship Portal", "skill_id": "terraform", "difficulty": "Intermediate-Advanced", "duration": "6 Weeks", "certification": "AICTE Recognized", "url": "https://internship.aicte-india.org/", "description": "HCL syntax, state management, remote backends, and multi-cloud orchestration."}
]

# 4. 30+ Portfolio Projects mapped to missing skills
PROJECTS = [
    {
        "id": "p1",
        "title": "AI Career Intelligence Dashboard",
        "missing_skill_id": "react",
        "technologies": ["React", "Tailwind CSS", "Recharts", "Lucide Icons"],
        "difficulty": "Intermediate",
        "duration": "3 Weeks",
        "description": "Interactive career recommendation web application with visual match gauges and roadmap tracking.",
        "expected_outcome": "Production-ready frontend portfolio app demonstrating state management, chart visualizations, and responsive layout."
    },
    {
        "id": "p2",
        "title": "Student Placement Analytics & Job Portal",
        "missing_skill_id": "sql",
        "technologies": ["PostgreSQL", "SQL", "Python", "FastAPI"],
        "difficulty": "Beginner-Intermediate",
        "duration": "2 Weeks",
        "description": "Relational database schema modeling student applications, placements, and department analytics.",
        "expected_outcome": "Normalized 3NF relational database with indexing, analytical views, and optimized queries."
    },
    {
        "id": "p3",
        "title": "Student Skill Prediction & Placement Model",
        "missing_skill_id": "machine learning",
        "technologies": ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
        "difficulty": "Intermediate",
        "duration": "4 Weeks",
        "description": "Supervised classification model predicting student placement probability based on skill profile and project scores.",
        "expected_outcome": "Trained ML model achieving >85% accuracy with feature importance analysis and model serialization."
    },
    {
        "id": "p4",
        "title": "Secure Zero-Trust Authentication Microservice",
        "missing_skill_id": "cybersecurity",
        "technologies": ["Python", "FastAPI", "JWT", "OAuth2", "Bcrypt"],
        "difficulty": "Intermediate",
        "duration": "2 Weeks",
        "description": "Enterprise-grade authentication service featuring RBAC permissions, audit logging, and token rotation.",
        "expected_outcome": "Production microservice meeting OWASP security recommendations with automated unit test suite."
    },
    {
        "id": "p5",
        "title": "Automated Multi-Tier Cloud Deployment Infrastructure",
        "missing_skill_id": "aws",
        "technologies": ["AWS EC2", "AWS S3", "VPC", "Route 53"],
        "difficulty": "Intermediate",
        "duration": "3 Weeks",
        "description": "Highly available cloud architecture hosting a web app across public and private subnets with automated backups.",
        "expected_outcome": "Verified AWS infrastructure architecture with security group hardening and cost monitoring."
    },
    {
        "id": "p6",
        "title": "Containerized Microservices Cluster with Docker & K8s",
        "missing_skill_id": "docker",
        "technologies": ["Docker", "Docker Compose", "Kubernetes", "Nginx"],
        "difficulty": "Intermediate-Advanced",
        "duration": "3 Weeks",
        "description": "Multi-container setup isolating frontend, backend API, and database services with health probes.",
        "expected_outcome": "Production Dockerfiles and Kubernetes manifests with rolling deployment strategies."
    },
    {
        "id": "p7",
        "title": "Automated CI/CD Delivery Pipeline with GitHub Actions",
        "missing_skill_id": "ci/cd",
        "technologies": ["GitHub Actions", "Docker", "PyTest", "YAML"],
        "difficulty": "Intermediate",
        "duration": "2 Weeks",
        "description": "Continuous integration pipeline running automated tests, linter checks, and container image builds on every pull request.",
        "expected_outcome": "Zero-downtime automated deployment workflow for staging and production servers."
    },
    {
        "id": "p8",
        "title": "Maharashtra Regional Skill Intelligence Heatmap",
        "missing_skill_id": "power bi",
        "technologies": ["Power BI", "DAX", "Excel", "Data Modeling"],
        "difficulty": "Intermediate",
        "duration": "2 Weeks",
        "description": "Interactive district-level business intelligence dashboard mapping skill shortages across Maharashtra industries.",
        "expected_outcome": "Published executive BI report with drill-through maps and trend forecasting."
    },
    {
        "id": "p9",
        "title": "Enterprise Design System & Figma Component Library",
        "missing_skill_id": "figma",
        "technologies": ["Figma", "Auto-layout", "Design Tokens"],
        "difficulty": "Beginner-Intermediate",
        "duration": "2 Weeks",
        "description": "Comprehensive UI design system with accessible color contrasts, responsive typography, and stateful components.",
        "expected_outcome": "Interactive Figma prototype and exported design token specification for engineering teams."
    },
    {
        "id": "p10",
        "title": "High-Throughput Asynchronous REST API Engine",
        "missing_skill_id": "fastapi",
        "technologies": ["Python", "FastAPI", "Pydantic", "SQLAlchemy"],
        "difficulty": "Intermediate",
        "duration": "2 Weeks",
        "description": "Scalable REST API handling structured requests with automatic Swagger docs and query filtering.",
        "expected_outcome": "Tested API service delivering sub-20ms response latencies under concurrent load."
    },
    {
        "id": "p11",
        "title": "Grounded Career Counseling RAG Chatbot",
        "missing_skill_id": "llm",
        "technologies": ["Python", "LangChain", "Vector Embeddings", "FastAPI"],
        "difficulty": "Advanced",
        "duration": "3 Weeks",
        "description": "Retrieval-augmented chatbot answering student queries based strictly on government training curricula and job catalogs.",
        "expected_outcome": "Hallucination-resistant chatbot pipeline with verified source citations."
    },
    {
        "id": "p12",
        "title": "Distributed In-Memory Cache & Session Manager",
        "missing_skill_id": "redis",
        "technologies": ["Redis", "Node.js", "Express"],
        "difficulty": "Intermediate",
        "duration": "1 Week",
        "description": "High-performance caching layer reducing relational database queries by 80% with TTL expiration.",
        "expected_outcome": "Measurable benchmark demonstrating 10x throughput improvement."
    }
]

# 5. Maharashtra District Skill Demand & Industry Trends (Pune, Mumbai, Nagpur, Nashik, etc.)
MAHARASHTRA_DISTRICTS = [
    {"name": "Pune", "it_hub": True, "top_industries": ["IT & Software", "Automotive", "FinTech", "EdTech"]},
    {"name": "Mumbai City & Suburban", "it_hub": True, "top_industries": ["BFSI", "IT & Software", "Media", "Healthcare"]},
    {"name": "Nagpur", "it_hub": True, "top_industries": ["IT & Logistics", "Manufacturing", "Power", "AgriTech"]},
    {"name": "Nashik", "it_hub": False, "top_industries": ["Automotive", "Engineering", "AgriTech", "IT"]},
    {"name": "Chhatrapati Sambhajinagar", "it_hub": False, "top_industries": ["Automotive", "Pharma", "Engineering"]},
    {"name": "Thane", "it_hub": True, "top_industries": ["IT & Software", "Chemicals", "BFSI Operations"]},
    {"name": "Kolhapur", "it_hub": False, "top_industries": ["Foundry & Casting", "Textiles", "IT Emerging"]},
    {"name": "Solapur", "it_hub": False, "top_industries": ["Textiles", "Solar Energy", "Agriculture"]},
    {"name": "Amravati", "it_hub": False, "top_industries": ["Textiles", "Agri Processing", "Education"]},
    {"name": "Nanded", "it_hub": False, "top_industries": ["Agriculture", "Education", "Service Sector"]}
]

SKILL_DEMAND_DATA = []
for district in MAHARASHTRA_DISTRICTS:
    for skill in ["python", "react", "sql", "aws", "docker", "machine learning", "cybersecurity", "power bi", "fastapi", "ui/ux"]:
        demand_score = random.randint(65, 98) if district["it_hub"] else random.randint(45, 85)
        growth_rate = round(random.uniform(8.5, 32.4), 1)
        SKILL_DEMAND_DATA.append({
            "district": district["name"],
            "skill_id": skill,
            "demand_level": "High" if demand_score > 75 else "Medium",
            "demand_score": demand_score,
            "growth_rate_pct": growth_rate,
            "open_positions": random.randint(120, 1500) if district["it_hub"] else random.randint(30, 250),
            "primary_industry": district["top_industries"][0]
        })

# 6. Comprehensive RBAC Permission Matrix
ROLES_PERMISSIONS = {
    "government_admin": {
        "title": "Government / Admin",
        "description": "National & District Skill Intelligence, User Governance, System Policy, Anomaly Detection",
        "permissions": {
            "view": True,
            "create": True,
            "edit": True,
            "delete": True,
            "approve": True,
            "export": True,
            "manage_users": True,
            "manage_roles": True
        }
    },
    "skill_reviewer": {
        "title": "Skill Authority / Reviewer",
        "description": "Curriculum Evaluation, Skill Framework Accreditation, Quality Standards Validation",
        "permissions": {
            "view": True,
            "create": False,
            "edit": False,
            "delete": False,
            "approve": True,
            "export": True,
            "manage_users": False,
            "manage_roles": False
        }
    },
    "industry_employer": {
        "title": "Industry / Employer",
        "description": "Publish Skill-Weighted Job Openings, Search & Compare Candidates, Validate Curricula",
        "permissions": {
            "view": True,
            "create": True,
            "edit": True,
            "delete": True,
            "approve": False,
            "export": True,
            "manage_users": False,
            "manage_roles": False
        }
    },
    "training_institute": {
        "title": "Training Institute / College",
        "description": "Department-wide Skill Gaps vs Demand, Curriculum Submissions, Student Aggregates",
        "permissions": {
            "view": True,
            "create": True,
            "edit": True,
            "delete": True,
            "approve": False,
            "export": True,
            "manage_users": True,
            "manage_roles": False
        }
    },
    "trainer_faculty": {
        "title": "Trainer / Faculty",
        "description": "Manage Assigned Course Batches, Track Student Milestone Progress, Assessment Logs",
        "permissions": {
            "view": True,
            "create": True,
            "edit": True,
            "delete": False,
            "approve": False,
            "export": False,
            "manage_users": False,
            "manage_roles": False
        }
    },
    "student": {
        "title": "Student / Trainee",
        "description": "Skill Profile, Transparent Gap Analysis, Career Roadmap, Resume Analyzer, AI Assistant",
        "permissions": {
            "view": True,
            "create": True,
            "edit": True,
            "delete": False,
            "approve": False,
            "export": False,
            "manage_users": False,
            "manage_roles": False
        }
    }
}

# 7. Sample Students from Maharashtra Institutes
STUDENTS = [
    {
        "id": "std-001",
        "name": "Aarav Deshmukh",
        "email": "aarav.deshmukh@coep.ac.in",
        "institution": "COEP Technological University, Pune",
        "department": "Computer Engineering",
        "district": "Pune",
        "target_role": "full-stack-developer",
        "skills": [
            {"skill_id": "html", "proficiency": "Advanced"},
            {"skill_id": "css", "proficiency": "Advanced"},
            {"skill_id": "javascript", "proficiency": "Intermediate"},
            {"skill_id": "sql", "proficiency": "Intermediate"},
            {"skill_id": "python", "proficiency": "Intermediate"}
        ],
        "xp": 1450,
        "completed_courses": ["c3"],
        "completed_projects": ["p2"],
        "badges": ["SQL Specialist", "Frontend Starter"]
    },
    {
        "id": "std-002",
        "name": "Pooja Patil",
        "email": "pooja.patil@vjti.ac.in",
        "institution": "VJTI, Mumbai",
        "department": "Information Technology",
        "district": "Mumbai City & Suburban",
        "target_role": "data-analyst",
        "skills": [
            {"skill_id": "excel", "proficiency": "Advanced"},
            {"skill_id": "sql", "proficiency": "Intermediate"},
            {"skill_id": "python", "proficiency": "Intermediate"},
            {"skill_id": "pandas", "proficiency": "Beginner"}
        ],
        "xp": 1820,
        "completed_courses": ["c2", "c8"],
        "completed_projects": ["p8"],
        "badges": ["Data Wrangler", "Power BI Novice"]
    },
    {
        "id": "std-003",
        "name": "Siddharth Kulkarni",
        "email": "siddharth.k@vnit.ac.in",
        "institution": "VNIT, Nagpur",
        "department": "Electronics & Telecomm",
        "district": "Nagpur",
        "target_role": "cloud-engineer",
        "skills": [
            {"skill_id": "linux", "proficiency": "Intermediate"},
            {"skill_id": "networking", "proficiency": "Advanced"},
            {"skill_id": "shell", "proficiency": "Intermediate"},
            {"skill_id": "git", "proficiency": "Intermediate"}
        ],
        "xp": 1200,
        "completed_courses": ["c12"],
        "completed_projects": [],
        "badges": ["Linux SysAdmin"]
    },
    {
        "id": "std-004",
        "name": "Sneha Jadhav",
        "email": "sneha.jadhav@sppu.ac.in",
        "institution": "Savitribai Phule Pune University",
        "department": "Computer Science",
        "district": "Pune",
        "target_role": "ai-ml-engineer",
        "skills": [
            {"skill_id": "python", "proficiency": "Advanced"},
            {"skill_id": "scikit-learn", "proficiency": "Intermediate"},
            {"skill_id": "sql", "proficiency": "Intermediate"},
            {"skill_id": "data science", "proficiency": "Intermediate"}
        ],
        "xp": 2100,
        "completed_courses": ["c2", "c7"],
        "completed_projects": ["p3"],
        "badges": ["AI Explorer", "Python Pioneer"]
    },
    {
        "id": "std-005",
        "name": "Rohan Gaikwad",
        "email": "rohan.g@gcoea.ac.in",
        "institution": "Government College of Engineering, Amravati",
        "department": "Mechanical Engineering",
        "district": "Amravati",
        "target_role": "full-stack-developer",
        "skills": [
            {"skill_id": "c", "proficiency": "Intermediate"},
            {"skill_id": "html", "proficiency": "Beginner"},
            {"skill_id": "css", "proficiency": "Beginner"}
        ],
        "xp": 650,
        "completed_courses": [],
        "completed_projects": [],
        "badges": ["Quick Learner"]
    }
]

# 8. Industry Job Postings (TCS, Infosys, Tech Mahindra, Persistent Systems, etc.)
JOBS = [
    {
        "id": "job-101",
        "company": "Tata Consultancy Services (TCS)",
        "title": "Junior Full Stack Engineer",
        "role_id": "full-stack-developer",
        "location": "Pune / Hinjewadi",
        "salary_range": "INR 4.5 - 7.5 LPA",
        "type": "Full Time",
        "required_skills": ["react", "node.js", "javascript", "sql"],
        "description": "Developing modern citizen portal solutions for Maharashtra e-Governance."
    },
    {
        "id": "job-102",
        "company": "Tech Mahindra",
        "title": "Data Analyst - Operations",
        "role_id": "data-analyst",
        "location": "Mumbai / Powai",
        "salary_range": "INR 5.0 - 8.0 LPA",
        "type": "Full Time",
        "required_skills": ["excel", "sql", "power bi", "python"],
        "description": "Transforming telecom call analytics and consumer telemetry into executive dashboards."
    },
    {
        "id": "job-103",
        "company": "Persistent Systems",
        "title": "Cloud & DevOps Associate",
        "role_id": "cloud-engineer",
        "location": "Nagpur / MIHAN SEZ",
        "salary_range": "INR 5.5 - 9.0 LPA",
        "type": "Full Time",
        "required_skills": ["aws", "docker", "linux", "networking"],
        "description": "Provisioning secure cloud workloads and automated deployment scripts."
    },
    {
        "id": "job-104",
        "company": "Cognizant",
        "title": "Associate AI Engineer",
        "role_id": "ai-ml-engineer",
        "location": "Pune / Kharadi",
        "salary_range": "INR 6.5 - 11.0 LPA",
        "type": "Full Time",
        "required_skills": ["python", "machine learning", "pytorch", "sql"],
        "description": "Training and tuning LLM models and retrieval workflows for enterprise search."
    },
    {
        "id": "job-105",
        "company": "LTIMindtree",
        "title": "Cybersecurity SOC Analyst",
        "role_id": "cybersecurity-analyst",
        "location": "Navi Mumbai / Airoli",
        "salary_range": "INR 5.0 - 8.5 LPA",
        "type": "Full Time",
        "required_skills": ["cybersecurity", "networking", "linux"],
        "description": "Level 1 incident triage and vulnerability assessment monitoring."
    }
]

# 9. Curriculum Submissions for Reviewer Workflow
CURRICULUM_SUBMISSIONS = [
    {
        "id": "curr-01",
        "institute": "COEP Technological University, Pune",
        "department": "Computer Engineering",
        "proposed_title": "AI & Cloud Integration Elective 2026",
        "status": "Pending",
        "submitted_by": "Dr. S. R. Joshi (HOD)",
        "skills_covered": ["aws", "fastapi", "docker", "llm"],
        "industry_partner": "Persistent Systems",
        "justification": "Addresses 40% local industry demand increase in cloud-native AI engineering in Pune Hinjewadi belt.",
        "comments": []
    },
    {
        "id": "curr-02",
        "institute": "Government Polytechnic, Nashik",
        "department": "Information Technology",
        "proposed_title": "Advanced Web Architectures & React.js",
        "status": "Approved",
        "submitted_by": "Prof. Anjali Shinde",
        "skills_covered": ["react", "tailwind", "rest apis"],
        "industry_partner": "Nashik IT Association",
        "justification": "Updates legacy ASP/PHP curriculum to modern full stack standards.",
        "comments": ["Approved by Skill Authority. Aligns with NSQF Level 6 standards."]
    },
    {
        "id": "curr-03",
        "institute": "VNIT Nagpur",
        "department": "Electrical & IT",
        "proposed_title": "Industrial IoT & Edge Computing Module",
        "status": "Under Review",
        "submitted_by": "Dr. M. G. Rao",
        "skills_covered": ["python", "c", "networking", "aws"],
        "industry_partner": "Tata Technologies",
        "justification": "Prepares engineers for smart manufacturing plants in Nagpur MIDC corridor.",
        "comments": ["Requesting industry validation letter from partner firm."]
    }
]

# Save all JSON datasets to backend/data/
datasets = {
    "skills.json": SKILLS,
    "job_roles.json": JOB_ROLES,
    "courses.json": COURSES,
    "projects.json": PROJECTS,
    "skill_demand.json": SKILL_DEMAND_DATA,
    "rbac_permissions.json": ROLES_PERMISSIONS,
    "students.json": STUDENTS,
    "jobs.json": JOBS,
    "curriculum_submissions.json": CURRICULUM_SUBMISSIONS
}

for filename, content in datasets.items():
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(content, f, indent=2, ensure_ascii=False)
    print(f"Generated {filename} with {len(content)} entries.")

print("Seed data generation completed successfully!")
