import json
import os
from typing import List, Dict, Any
from .skill_aliases import normalize_skill

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

def load_job_roles() -> List[Dict[str, Any]]:
    with open(os.path.join(DATA_DIR, "job_roles.json"), "r", encoding="utf-8") as f:
        return json.load(f)

def load_skills() -> List[Dict[str, Any]]:
    with open(os.path.join(DATA_DIR, "skills.json"), "r", encoding="utf-8") as f:
        return json.load(f)

# Priority weights as strictly specified: High = 3, Medium = 2, Low = 1
WEIGHT_MAP = {
    "high": 3,
    "medium": 2,
    "low": 1
}

def analyze_skill_gap(student_skills: List[Dict[str, Any]], target_role_id: str) -> Dict[str, Any]:
    """
    Computes transparent skill gap analysis:
    - Basic score: Matched Required Skills / Total Required Skills * 100
    - Weighted score: Sum(weight of matched skills) / Sum(weight of all required skills) * 100
    - Missing skills with priority and recommended learning order
    - Transparent calculation metadata for on-screen formula display
    """
    job_roles = load_job_roles()
    role = next((r for r in job_roles if r["id"] == target_role_id), None)
    if not role:
        raise ValueError(f"Job role '{target_role_id}' not found.")

    # Normalize student skill IDs
    student_skill_map = {}
    for s in student_skills:
        skill_id = normalize_skill(s.get("skill_id", s.get("name", "")))
        student_skill_map[skill_id] = s.get("proficiency", "Intermediate")

    required_skills = role.get("required_skills", [])
    total_required = len(required_skills)

    matched_skills = []
    missing_skills = []
    
    total_weight = 0
    matched_weight = 0

    for req in required_skills:
        req_id = normalize_skill(req["skill_id"])
        importance = req.get("importance", "medium").lower()
        weight = WEIGHT_MAP.get(importance, 2)
        total_weight += weight

        if req_id in student_skill_map:
            matched_weight += weight
            matched_skills.append({
                "skill_id": req_id,
                "importance": importance,
                "weight": weight,
                "student_proficiency": student_skill_map[req_id]
            })
        else:
            missing_skills.append({
                "skill_id": req_id,
                "importance": importance,
                "weight": weight,
                "priority_rank": 1 if importance == "high" else (2 if importance == "medium" else 3)
            })

    # Sort missing skills by weight (High priority first)
    missing_skills.sort(key=lambda x: x["weight"], reverse=True)

    # Basic score formula
    matched_count = len(matched_skills)
    basic_score = round((matched_count / total_required * 100), 1) if total_required > 0 else 0.0

    # Weighted score formula
    weighted_score = round((matched_weight / total_weight * 100), 1) if total_weight > 0 else 0.0

    # Preferred skills check
    preferred_matches = []
    preferred_missing = []
    for pref in role.get("preferred_skills", []):
        pref_id = normalize_skill(pref)
        if pref_id in student_skill_map:
            preferred_matches.append(pref_id)
        else:
            preferred_missing.append(pref_id)

    # Generate transparent explanation
    formula_explanation = {
        "basic_formula": f"{matched_count} matched / {total_required} required × 100 = {basic_score}%",
        "weighted_formula": f"Σ(weights of matched: {matched_weight}) / Σ(weights of all required: {total_weight}) × 100 = {weighted_score}%",
        "weights_used": {"High": 3, "Medium": 2, "Low": 1},
        "disclaimer": "This score indicates alignment with core curriculum and job requirements; it does not guarantee employment."
    }

    return {
        "role_id": role["id"],
        "role_title": role["title"],
        "industry": role["industry"],
        "experience_level": role["experience_level"],
        "basic_match_pct": basic_score,
        "weighted_match_pct": weighted_score,
        "total_required_skills": total_required,
        "matched_skills_count": matched_count,
        "missing_skills_count": len(missing_skills),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "preferred_matched": preferred_matches,
        "preferred_missing": preferred_missing,
        "roadmap": role.get("roadmap", []),
        "formula_breakdown": formula_explanation
    }
