import os
import json
import csv

# Directory layout for SkillBridge AI
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# 100+ Skill Alias Dictionary (Ported and expanded from prototype)
SKILL_ALIASES = {
    # Languages
    "python": ["python", "py", "python3", "python 3", "cpython"],
    "javascript": ["javascript", "js", "ecmascript", "es6", "es6+", "vanilla js"],
    "typescript": ["typescript", "ts"],
    "java": ["java", "core java", "java 8", "java 11", "java 17", "j2ee"],
    "c": ["c language", "c programming", "ansi c"],
    "c++": ["c++", "cpp", "c plus plus"],
    "c#": ["c#", "csharp", "c sharp", ".net c#"],
    "go": ["go", "golang"],
    "rust": ["rust", "rustlang"],
    "kotlin": ["kotlin"],
    "swift": ["swift", "swiftui"],
    "php": ["php", "php7", "php8"],
    "ruby": ["ruby", "ruby on rails", "ror"],
    "r": ["r language", "r programming", "r-project"],
    "dart": ["dart", "flutter dart"],
    "scala": ["scala"],
    "shell": ["bash", "shell", "powershell", "zsh", "sh"],

    # Web & Frontend
    "html": ["html", "html5"],
    "css": ["css", "css3"],
    "react": ["react", "react.js", "reactjs", "react js"],
    "next.js": ["next.js", "nextjs", "next js", "next"],
    "angular": ["angular", "angularjs", "angular 2+", "angular 14"],
    "vue": ["vue", "vue.js", "vuejs", "vue 3"],
    "tailwind": ["tailwind", "tailwindcss", "tailwind css"],
    "bootstrap": ["bootstrap", "bootstrap 5"],
    "sass": ["sass", "scss"],
    "redux": ["redux", "redux toolkit", "rtk"],

    # Backend Frameworks
    "node.js": ["node", "node.js", "nodejs", "node js"],
    "express": ["express", "express.js", "expressjs"],
    "django": ["django", "django rest framework", "drf"],
    "flask": ["flask"],
    "fastapi": ["fastapi", "fast-api", "fast api"],
    "spring": ["spring", "spring boot", "springboot", "spring framework"],
    "asp.net": ["asp.net", "asp.net core", ".net core", "dotnet"],
    "graphql": ["graphql", "apollo graphql"],
    "rest apis": ["rest", "rest api", "rest apis", "restful", "restful api", "restful apis"],
    "microservices": ["microservices", "microservice architecture", "distributed systems"],

    # Databases & Storage
    "sql": ["sql", "structured query language"],
    "postgresql": ["postgresql", "postgres", "psql"],
    "mysql": ["mysql"],
    "mongodb": ["mongodb", "mongo"],
    "redis": ["redis"],
    "sqlite": ["sqlite", "sqlite3"],
    "elasticsearch": ["elasticsearch", "elastic search", "elk"],
    "oracle": ["oracle db", "oracle sql", "pl/sql"],
    "cassandra": ["cassandra", "apache cassandra"],
    "dynamodb": ["dynamodb", "aws dynamodb"],

    # Cloud & DevOps
    "aws": ["aws", "amazon web services", "ec2", "s3", "lambda"],
    "azure": ["azure", "microsoft azure"],
    "gcp": ["gcp", "google cloud", "google cloud platform"],
    "docker": ["docker", "containerization", "containers"],
    "kubernetes": ["kubernetes", "k8s"],
    "git": ["git", "version control"],
    "github": ["github", "gitlab", "bitbucket"],
    "ci/cd": ["ci/cd", "continuous integration", "github actions", "jenkins", "gitlab ci"],
    "linux": ["linux", "ubuntu", "debian", "centos", "redhat"],
    "terraform": ["terraform", "iac", "infrastructure as code"],
    "ansible": ["ansible"],
    "nginx": ["nginx"],

    # Data, Analytics & BI
    "excel": ["excel", "microsoft excel", "advanced excel", "vlookup"],
    "power bi": ["power bi", "powerbi", "dax"],
    "tableau": ["tableau"],
    "pandas": ["pandas"],
    "numpy": ["numpy"],
    "data science": ["data science", "data analysis", "data analytics"],
    "spark": ["spark", "pyspark", "apache spark"],
    "hadoop": ["hadoop", "big data"],
    "kafka": ["kafka", "apache kafka"],
    "etl": ["etl", "data pipelines", "data engineering"],

    # AI, ML & Deep Learning
    "machine learning": ["machine learning", "ml", "supervised learning", "unsupervised learning"],
    "deep learning": ["deep learning", "neural networks", "cnn", "rnn", "transformers"],
    "tensorflow": ["tensorflow", "tf"],
    "pytorch": ["pytorch", "torch"],
    "scikit-learn": ["scikit-learn", "sklearn"],
    "nlp": ["nlp", "natural language processing", "spacy", "nltk", "huggingface"],
    "computer vision": ["computer vision", "opencv", "cv", "image processing"],
    "llm": ["llm", "large language models", "generative ai", "genai", "prompt engineering", "langchain"],

    # Security & Networking
    "cybersecurity": ["cybersecurity", "cyber security", "information security", "infosec"],
    "networking": ["networking", "computer networks", "tcp/ip", "dns", "http/https"],
    "cloud security": ["cloud security", "iam", "zero trust"],
    "ethical hacking": ["ethical hacking", "penetration testing", "vapt", "kali linux"],

    # Testing & QA
    "unit testing": ["unit testing", "pytest", "jest", "junit"],
    "selenium": ["selenium", "cypress", "playwright", "automation testing"],
    "postman": ["postman", "api testing"],

    # Design, Mobile & Soft Skills
    "ui/ux": ["ui/ux", "ui design", "ux design", "user experience", "user interface"],
    "figma": ["figma", "wireframing", "prototyping", "adobe xd"],
    "flutter": ["flutter"],
    "react native": ["react native", "react-native"],
    "android": ["android", "android development"],
    "ios": ["ios", "ios development"],
    "communication": ["communication", "verbal communication", "written communication"],
    "leadership": ["leadership", "team leadership", "mentorship"],
    "problem solving": ["problem solving", "analytical skills", "troubleshooting"],
    "critical thinking": ["critical thinking"],
    "teamwork": ["teamwork", "collaboration", "cross-functional collaboration"],
    "project management": ["project management", "agile", "scrum", "jira"]
}

def normalize_skill(skill_name: str) -> str:
    """Normalize any raw skill string using the alias dictionary."""
    clean = skill_name.strip().lower()
    for canonical, aliases in SKILL_ALIASES.items():
        if clean == canonical or clean in aliases:
            return canonical
    return clean

print(f"Skill dictionary loaded with {len(SKILL_ALIASES)} canonical skills.")
