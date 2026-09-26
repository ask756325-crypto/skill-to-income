// Configurable API Base URL:
// In development: defaults to http://127.0.0.1:8000
const API_BASE = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://127.0.0.1:8000' : '/api');

export async function fetchWithRole(endpoint: string, role: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("X-Demo-Role", role);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Network error" }));
    throw new Error(errorData.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  getSystemInfo: () => fetch(`${API_BASE}/`).then(r => r.json()),
  
  getRolesPermissions: () => fetch(`${API_BASE}/auth/roles-permissions`).then(r => r.json()),
  
  updatePermission: (role: string, permission: string, enabled: boolean, currentRole: string) =>
    fetchWithRole("/admin/permissions/update", currentRole, {
      method: "POST",
      body: JSON.stringify({ role, permission, enabled })
    }),
    
  getAuditLogs: (currentRole: string) => fetchWithRole("/admin/audit-logs", currentRole),
  
  getSkills: () => fetch(`${API_BASE}/skills`).then(r => r.json()),
  
  getJobRoles: () => fetch(`${API_BASE}/job-roles`).then(r => r.json()),
  
  analyzeSkillGap: (studentSkills: any[], targetRoleId: string, currentRole: string) =>
    fetchWithRole("/skill-gap/analyze", currentRole, {
      method: "POST",
      body: JSON.stringify({ student_skills: studentSkills, target_role_id: targetRoleId })
    }),
    
  getRecommendedCourses: (skills: string[]) =>
    fetch(`${API_BASE}/recommendations/courses?skills=${encodeURIComponent(skills.join(","))}`).then(r => r.json()),
    
  getRecommendedProjects: (skills: string[]) =>
    fetch(`${API_BASE}/recommendations/projects?skills=${encodeURIComponent(skills.join(","))}`).then(r => r.json()),
    
  analyzeResume: async (formData: FormData) => {
    const response = await fetch(`${API_BASE}/resume/analyze`, {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: "Error analyzing resume" }));
      throw new Error(err.detail);
    }
    return response.json();
  },
  
  askCareerAssistant: (prompt: string, context?: any) =>
    fetch(`${API_BASE}/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, context })
    }).then(r => r.json()),
    
  getIndustryJobs: () => fetch(`${API_BASE}/industry/jobs`).then(r => r.json()),
  
  createIndustryJob: (jobData: any, currentRole: string) =>
    fetchWithRole("/industry/jobs", currentRole, {
      method: "POST",
      body: JSON.stringify(jobData)
    }),
    
  searchCandidates: (roleId?: string) =>
    fetch(`${API_BASE}/industry/candidates${roleId ? `?role_id=${roleId}` : ""}`).then(r => r.json()),
    
  getInstituteAnalytics: (currentRole: string) =>
    fetchWithRole("/institution/department-analytics", currentRole),
    
  submitCurriculum: (curriculum: any, currentRole: string) =>
    fetchWithRole("/institution/curriculum/submit", currentRole, {
      method: "POST",
      body: JSON.stringify(curriculum)
    }),
    
  getReviewerSubmissions: (currentRole: string) =>
    fetchWithRole("/reviewer/submissions", currentRole),
    
  actionReviewerSubmission: async (id: string, action: string, comment: string, currentRole: string) => {
    const formData = new FormData();
    formData.append("action", action);
    formData.append("comment", comment);
    const res = await fetch(`${API_BASE}/reviewer/submissions/${id}/action`, {
      method: "POST",
      headers: { "X-Demo-Role": currentRole },
      body: formData
    });
    return res.json();
  },
  
  getDistrictDemand: (district?: string, skill?: string) =>
    fetch(`${API_BASE}/admin/district-demand?district=${district || "All"}&skill=${skill || "All"}`).then(r => r.json()),
    
  getAnomalies: (currentRole: string) =>
    fetchWithRole("/admin/anomalies", currentRole),
    
  verifyCredential: (hash: string) =>
    fetch(`${API_BASE}/verify-credential/${hash}`).then(r => r.json())
};
