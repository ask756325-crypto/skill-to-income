import os
import re
import json
from typing import Dict, Any, List
from io import BytesIO
from pypdf import PdfReader
from docx import Document
from .skill_aliases import SKILL_ALIASES, normalize_skill
from .skill_gap import analyze_skill_gap, load_job_roles

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract readable text from PDF bytes."""
    reader = PdfReader(BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

def extract_text_from_docx(file_bytes: bytes) -> str:
    """Extract readable text from DOCX bytes."""
    doc = Document(BytesIO(file_bytes))
    text = "\n".join([p.text for p in doc.paragraphs if p.text])
    return text

def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    ext = filename.lower().split(".")[-1]
    if ext == "pdf":
        return extract_text_from_pdf(file_bytes)
    elif ext in ["docx", "doc"]:
        return extract_text_from_docx(file_bytes)
    else:
        return file_bytes.decode("utf-8", errors="ignore")

def detect_skills_in_text(text: str) -> List[Dict[str, str]]:
    """Scan text for known canonical skills and alias matches."""
    text_lower = text.lower()
    detected = []
    seen = set()

    for canonical, aliases in SKILL_ALIASES.items():
        # Match either canonical or any alias as a word boundary
        for alias in aliases:
            # Word boundary pattern
            pattern = r'\b' + re.escape(alias) + r'\b'
            if re.search(pattern, text_lower):
                if canonical not in seen:
                    seen.add(canonical)
                    detected.append({
                        "skill_id": canonical,
                        "name": canonical.capitalize(),
                        "proficiency": "Intermediate"
                    })
                break
    return detected

def analyze_experience(text: str) -> Dict[str, Any]:
    """Detect experience indicators, duration keywords, and internships."""
    lower = text.lower()
    exp_years = 0
    
    # Check for year mentions like "2 years experience", "1+ yr"
    match = re.search(r'(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?experience', lower)
    if match:
        exp_years = int(match.group(1))
    
    has_internship = bool(re.search(r'\b(intern|internship|trainee|apprentice)\b', lower))
    has_projects = bool(re.search(r'\b(projects?|portfolio|capstone|github\.com)\b', lower))
    
    # Experience score out of 100
    if exp_years >= 3:
        score = 95
        level = "Senior / Experienced"
    elif exp_years >= 1:
        score = 80
        level = "Mid Level"
    elif has_internship or has_projects:
        score = 70
        level = "Entry Level / Internship Experience"
    else:
        score = 50
        level = "Fresher / Foundational"

    return {
        "score": score,
        "estimated_years": exp_years,
        "has_internship": has_internship,
        "has_projects": has_projects,
        "level": level
    }

def analyze_education(text: str) -> Dict[str, Any]:
    """Identify degrees, universities, and technical streams."""
    lower = text.lower()
    degrees = []
    
    degree_patterns = [
        (r'\b(b\.?tech|b\.?e\.?|bachelor of engineering|bachelor of technology)\b', "B.Tech / B.E."),
        (r'\b(m\.?tech|m\.?e\.?|master of technology)\b', "M.Tech / M.E."),
        (r'\b(bca|bachelor of computer applications)\b', "BCA"),
        (r'\b(mca|master of computer applications)\b', "MCA"),
        (r'\b(b\.?sc|bachelor of science)\b', "B.Sc"),
        (r'\b(diploma in engineering|polytechnic)\b', "Polytechnic Diploma"),
        (r'\b(ph\.?d|doctorate)\b', "Ph.D")
    ]
    
    for pattern, name in degree_patterns:
        if re.search(pattern, lower):
            degrees.append(name)
            
    if degrees:
        score = 90
    elif re.search(r'\b(university|college|institute|cgpa|gpa|percentage)\b', lower):
        score = 75
        degrees.append("Undergraduate Degree / College")
    else:
        score = 60
        degrees.append("Not Explicitly Specified")

    return {
        "score": score,
        "degrees_detected": degrees
    }

def analyze_achievements(text: str) -> Dict[str, Any]:
    """Detect hackathons, publications, leadership, certifications, and awards."""
    lower = text.lower()
    signals = []
    
    checks = [
        (r'\b(hackathon|smart india hackathon|sih|winner|runner up|1st place)\b', "Hackathon & Competitions"),
        (r'\b(certified|certification|aws certified|nptel|coursera|badge)\b', "Professional Certifications"),
        (r'\b(published|ieee|paper|research)\b', "Research / Publications"),
        (r'\b(lead|president|captain|founded|organized|coordinated)\b', "Leadership & Initiatives"),
        (r'\b(published app|open source|contributor|pull request)\b', "Open Source / Real-world Deployments")
    ]
    
    for pattern, label in checks:
        if re.search(pattern, lower):
            signals.append(label)
            
    score = min(100, 50 + len(signals) * 15)
    return {
        "score": score,
        "signals": signals
    }

def compute_keyword_density(text: str, target_role_id: str) -> Dict[str, Any]:
    """Assess domain keyword density and technical terminology relevance."""
    job_roles = load_job_roles()
    role = next((r for r in job_roles if r["id"] == target_role_id), None)
    if not role:
        return {"score": 65, "density": "Moderate"}
        
    keywords = [req["skill_id"] for req in role.get("required_skills", [])] + role.get("preferred_skills", [])
    text_lower = text.lower()
    found = [kw for kw in keywords if kw in text_lower]
    
    ratio = len(found) / len(keywords) if keywords else 0.5
    score = min(100, int(ratio * 100) + 15)
    
    return {
        "score": score,
        "keywords_present": len(found),
        "total_domain_keywords": len(keywords),
        "density_level": "High" if ratio > 0.6 else ("Medium" if ratio > 0.3 else "Low")
    }

def analyze_resume_comprehensive(text: str, target_role_id: str = "full-stack-developer") -> Dict[str, Any]:
    """
    Unified Resume Analyzer combining 5-factor scoring model:
    - Skill Match: 40%
    - Experience Level: 25%
    - Education: 15%
    - Keyword Density: 10%
    - Achievements: 10%
    Never invents unverified data.
    """
    detected_skills = detect_skills_in_text(text)
    gap_result = analyze_skill_gap(detected_skills, target_role_id)
    
    exp_result = analyze_experience(text)
    edu_result = analyze_education(text)
    achieve_result = analyze_achievements(text)
    keyword_result = compute_keyword_density(text, target_role_id)
    
    # 5-factor weighted calculation
    skill_score = gap_result["weighted_match_pct"]
    exp_score = exp_result["score"]
    edu_score = edu_result["score"]
    kw_score = keyword_result["score"]
    ach_score = achieve_result["score"]
    
    overall_score = round(
        (skill_score * 0.40) +
        (exp_score * 0.25) +
        (edu_score * 0.15) +
        (kw_score * 0.10) +
        (ach_score * 0.10),
        1
    )
    
    # Actionable rewrite suggestions
    suggestions = []
    if gap_result["missing_skills"]:
        top_missing = [s["skill_id"] for s in gap_result["missing_skills"][:3]]
        suggestions.append(f"Add evidence or portfolio project links demonstrating: {', '.join(top_missing)}.")
    if not exp_result["has_projects"]:
        suggestions.append("Highlight specific GitHub repository links, live demos, and measurable project outcomes.")
    if achieve_result["score"] < 70:
        suggestions.append("Include relevant competitive hackathons (e.g., SIH), certifications, or technical workshops.")
    if keyword_result["score"] < 70:
        suggestions.append("Align technical terminologies with standard industry job requirements.")

    return {
        "target_role_id": target_role_id,
        "target_role_title": gap_result["role_title"],
        "overall_match_score": overall_score,
        "weights_model": {
            "skill_match_40": skill_score,
            "experience_25": exp_score,
            "education_15": edu_score,
            "keyword_density_10": kw_score,
            "achievements_10": ach_score
        },
        "detected_skills": detected_skills,
        "skill_gap": gap_result,
        "experience_analysis": exp_result,
        "education_analysis": edu_result,
        "achievements_analysis": achieve_result,
        "keyword_analysis": keyword_result,
        "actionable_suggestions": suggestions
    }
