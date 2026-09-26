import os
import json
import urllib.request
from typing import Dict, Any, Optional

def explain_match_score(gap_result: Dict[str, Any]) -> str:
    """
    SIH Differentiator 1: Explainable Match Engine
    Generates a natural-language 'Why this score' explanation strictly grounded in the structured skill-gap JSON.
    """
    role = gap_result.get("role_title", "Target Role")
    weighted_pct = gap_result.get("weighted_match_pct", 0)
    basic_pct = gap_result.get("basic_match_pct", 0)
    matched = [s["skill_id"] for s in gap_result.get("matched_skills", [])]
    missing = [s["skill_id"] for s in gap_result.get("missing_skills", [])]
    high_missing = [s["skill_id"] for s in gap_result.get("missing_skills", []) if s.get("importance") == "high"]

    matched_str = ", ".join(matched) if matched else "none"
    high_str = ", ".join(high_missing) if high_missing else "none"

    explanation = (
        f"Your compatibility score for {role} is calculated at {weighted_pct}% (weighted) and {basic_pct}% (basic). "
        f"You have confirmed proficiency in {len(matched)} requirement(s): {matched_str}. "
        f"However, {len(missing)} skill(s) remain unverified. Crucially, high-impact prerequisites like {high_str} carry 3x importance weights "
        f"in the employer evaluation model. Closing these priority gaps through recommended practical projects or certified training will rapidly advance your score above 85%."
    )
    return explanation

def ask_career_assistant(prompt: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Grounded Career Assistant.
    Always grounds answers on the structured skill gap and career profile data.
    """
    api_key = os.environ.get("GEMINI_API_KEY", "")
    context_str = json.dumps(context or {}, indent=2)

    # If GEMINI_API_KEY is available, we can optionally query Google Gemini
    if api_key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
            sys_instruct = (
                "You are the SkillBridge AI Career Counselor for the Government of Maharashtra. "
                "Base all your career advice strictly on the student's profile, skill gap data, and government courses provided. "
                "Do not hallucinate external facts or fabricate guarantees. Be encouraging, professional, and actionable."
            )
            body = {
                "contents": [
                    {"role": "user", "parts": [{"text": f"Context:\n{context_str}\n\nStudent Query: {prompt}"}]}
                ],
                "systemInstruction": {"parts": [{"text": sys_instruct}]}
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(body).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=8) as response:
                res_data = json.loads(response.read().decode())
                ai_text = res_data["candidates"][0]["content"]["parts"][0]["text"]
                return {
                    "source": "Gemini-1.5-Flash (Grounded)",
                    "response": ai_text
                }
        except Exception as e:
            # Gracefully fallback to deterministic grounded explainer
            pass

    # High-quality Deterministic Grounded Fallback
    prompt_lower = prompt.lower()
    
    if "why" in prompt_lower or "score" in prompt_lower or "explain" in prompt_lower:
        if context and "weighted_match_pct" in context:
            return {
                "source": "SkillBridge Rule-Grounded Explainer",
                "response": explain_match_score(context)
            }
        return {
            "source": "SkillBridge Rule-Grounded Explainer",
            "response": "Your match score is calculated by comparing verified skills against employer requirements. High-importance skills carry 3x weight, medium carry 2x, and low carry 1x."
        }

    if "missing" in prompt_lower or "gap" in prompt_lower:
        if context and "missing_skills" in context:
            missing_names = [s["skill_id"] for s in context["missing_skills"]]
            return {
                "source": "SkillBridge Rule-Grounded Explainer",
                "response": f"Based on your target role '{context.get('role_title', 'selected role')}', your primary missing skills are: {', '.join(missing_names)}. Focus on the high-priority ones first."
            }
        return {
            "source": "SkillBridge Rule-Grounded Explainer",
            "response": "Select a target job role in the Skill Gap Analyzer to view your missing skills ranked by employer demand priority."
        }

    if "learn" in prompt_lower or "course" in prompt_lower or "next" in prompt_lower:
        return {
            "source": "SkillBridge Rule-Grounded Explainer",
            "response": "To close your current gap effectively, begin with the top-priority missing skill. Check the Course Recommendations tab for subsidized courses accredited by Skill India Digital Hub and AICTE."
        }

    if "project" in prompt_lower or "build" in prompt_lower:
        return {
            "source": "SkillBridge Rule-Grounded Explainer",
            "response": "Building hands-on capstone projects is the most effective way to prove competence. Navigate to the Recommended Projects tab to find portfolio projects tailored to your missing skills."
        }

    return {
        "source": "SkillBridge Rule-Grounded Explainer",
        "response": (
            "Hello! I am your SkillBridge Career Assistant. I can help explain your skill match score, "
            "identify missing skills for target roles, recommend government-certified courses from Skill India Digital Hub, "
            "or suggest portfolio projects to increase your employability readiness."
        )
    }
