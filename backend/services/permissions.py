import os
import json
import time
from typing import Dict, Any, List, Optional
from fastapi import Header, HTTPException

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

AUDIT_LOGS: List[Dict[str, Any]] = [
    {
        "id": "log-001",
        "timestamp": "2026-09-26 10:15:22",
        "user_email": "admin@skillbridge.gov.in",
        "role": "government_admin",
        "action": "SYSTEM_POLICY_UPDATE",
        "module": "Government / Admin",
        "status": "SUCCESS",
        "ip_address": "10.0.4.12"
    },
    {
        "id": "log-002",
        "timestamp": "2026-09-26 11:30:45",
        "user_email": "reviewer@skillauthority.mah.gov.in",
        "role": "skill_reviewer",
        "action": "CURRICULUM_APPROVE",
        "module": "Skill Reviewer",
        "status": "SUCCESS",
        "ip_address": "10.0.12.8"
    },
    {
        "id": "log-003",
        "timestamp": "2026-09-26 14:02:10",
        "user_email": "hr@persistent.com",
        "role": "industry_employer",
        "action": "CREATE_JOB_REQUIREMENT",
        "module": "Industry Portal",
        "status": "SUCCESS",
        "ip_address": "49.36.128.4"
    }
]

def load_role_permissions() -> Dict[str, Any]:
    with open(os.path.join(DATA_DIR, "rbac_permissions.json"), "r", encoding="utf-8") as f:
        return json.load(f)

def get_current_role(x_demo_role: Optional[str] = Header(None)) -> str:
    """Extract role from request header, default to 'student'."""
    valid_roles = ["government_admin", "skill_reviewer", "industry_employer", "training_institute", "trainer_faculty", "student"]
    if x_demo_role and x_demo_role in valid_roles:
        return x_demo_role
    return "student"

def check_permission(role: str, permission: str) -> bool:
    """Verify if role has the requested permission flag."""
    matrix = load_role_permissions()
    role_info = matrix.get(role)
    if not role_info:
        return False
    return role_info["permissions"].get(permission, False)

def require_permission(permission: str):
    """Dependency callable to enforce permission server-side."""
    def dependency(x_demo_role: Optional[str] = Header(None)):
        role = get_current_role(x_demo_role)
        if not check_permission(role, permission):
            raise HTTPException(
                status_code=403,
                detail=f"Access Restricted: Role '{role}' lacks '{permission}' permission."
            )
        return role
    return dependency

def log_audit_event(user_email: str, role: str, action: str, module: str, status: str = "SUCCESS"):
    AUDIT_LOGS.insert(0, {
        "id": f"log-{int(time.time()*1000)}",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "user_email": user_email,
        "role": role,
        "action": action,
        "module": module,
        "status": status,
        "ip_address": "127.0.0.1"
    })
    # Keep last 100 entries
    if len(AUDIT_LOGS) > 100:
        AUDIT_LOGS.pop()
