import os
import json
from typing import List, Dict, Any

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

def load_courses() -> List[Dict[str, Any]]:
    with open(os.path.join(DATA_DIR, "courses.json"), "r", encoding="utf-8") as f:
        return json.load(f)

def load_projects() -> List[Dict[str, Any]]:
    with open(os.path.join(DATA_DIR, "projects.json"), "r", encoding="utf-8") as f:
        return json.load(f)

def recommend_courses(missing_skill_ids: List[str]) -> List[Dict[str, Any]]:
    courses = load_courses()
    recommended = []
    
    # Priority courses matching missing skills
    for course in courses:
        if course["skill_id"] in missing_skill_ids:
            rec_course = dict(course)
            rec_course["relevance"] = "Direct Gap Match"
            recommended.append(rec_course)
            
    # If few matches, add foundational industry courses
    if len(recommended) < 4:
        for course in courses:
            if course not in recommended:
                rec_course = dict(course)
                rec_course["relevance"] = "Industry Foundation"
                recommended.append(rec_course)
                if len(recommended) >= 6:
                    break
                    
    return recommended

def recommend_projects(missing_skill_ids: List[str]) -> List[Dict[str, Any]]:
    projects = load_projects()
    recommended = []
    
    for project in projects:
        if project["missing_skill_id"] in missing_skill_ids:
            rec_proj = dict(project)
            rec_proj["relevance"] = "Solves Skill Gap"
            recommended.append(rec_proj)
            
    # Fallback to general high-impact projects
    if len(recommended) < 3:
        for project in projects:
            if project not in recommended:
                rec_proj = dict(project)
                rec_proj["relevance"] = "Recommended Portfolio Builder"
                recommended.append(rec_proj)
                if len(recommended) >= 4:
                    break
                    
    return recommended
