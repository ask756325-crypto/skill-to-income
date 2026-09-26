# SkillBridge AI (SIH26134)
> **Challenges in aligning skill development programs with industry requirements and emerging job market demands**  
> **Organization:** Government of Maharashtra  
> **Tagline:** *"Bridging the Gap Between Education, Skills and Industry"*  

---

## 🌟 Executive Overview
**SkillBridge AI** connects:
$$\text{Students} \longrightarrow \text{Skills} \longrightarrow \text{Industry Requirements} \longrightarrow \text{Job Roles} \longrightarrow \text{Skill Gaps} \longrightarrow \text{Training Programs} \longrightarrow \text{Projects} \longrightarrow \text{Employment Readiness}$$

The platform identifies the mismatch between skills students possess and emerging industry requirements in Maharashtra's key economic hubs (Pune, Mumbai, Nagpur, Nashik, Chhatrapati Sambhajinagar, etc.), delivering **actionable, explainable recommendations** rather than passive dashboards.

---

## 🚀 Live Local Endpoints
Both servers are actively running in the background:
- 💻 **Frontend Web Application:** [http://127.0.0.1:5173/](http://127.0.0.1:5173/)
- ⚙️ **Backend FastAPI REST API & Swagger Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 👥 6-Role Role-Based Access Control (RBAC) & Judge Demo Switcher
At the top right of the application header, judges can toggle between all six roles instantly:

1. 🏛️ **Government / Admin (`government_admin`):**
   - Maharashtra Regional District Skill Intelligence (Pune, Mumbai, Nagpur, Nashik, etc.)
   - Regional Skill Demand Heatmaps & Trends
   - Automated AI Governance Anomaly Detection ($z$-score spike flagger)
   - Interactive Role & Permission Management Matrix (live checkbox toggling)
   - Security & Access Audit Log
   - CSV Intelligence Export
2. 🔍 **Skill Authority / Reviewer (`skill_reviewer`):**
   - Curriculum Accreditation Queue
   - Review proposed university curricula updates with approval/rejection and audit comments
3. 🏢 **Industry / Employer (`industry_employer`):**
   - Publish skill-weighted job requirements with High/Medium/Low importance tags
   - Pre-screened Candidate Compatibility Search & Benchmarking Matrix
4. 🎓 **Training Institute / College (`training_institute`):**
   - Aggregate department skill distribution vs industry demand (side-by-side gap visualization)
   - Submit new elective curricula to the Skill Authority
5. 👨‍🏫 **Trainer / Faculty (`trainer_faculty`):**
   - Course milestone management, student progress logs, and assessments
6. 👨‍🎓 **Student / Trainee (`student`):**
   - Verified Skill Profile with proficiency indicators
   - Transparent Skill Gap Analyzer with exact mathematical formulas
   - Interactive Linear Career Roadmap (Not Started / Learning / Completed)
   - Subsidized Course Recommendations (Skill India Digital Hub, NCS, AICTE)
   - Portfolio Project Recommendations mapped to missing skills
   - ATS Resume Analyzer (5-factor scoring model)
   - Grounded AI Career Assistant with Voice Input

---

## 🧮 Mathematical Rigor: Skill Gap Engine
The platform calculates two distinct scores transparently:
1. **Basic Score:**
   $$\text{Basic Skill Match} = \frac{\text{Matched Required Skills}}{\text{Total Required Skills}} \times 100$$
2. **Weighted Score:**
   $$\text{Weighted Industry Match} = \frac{\sum (\text{weight of matched skills})}{\sum (\text{weight of all required skills})} \times 100$$
   - **High Priority Skills:** Weight = 3x
   - **Medium Priority Skills:** Weight = 2x
   - **Low Priority Skills:** Weight = 1x

*Example (Target: Full Stack Developer):*
- Student has: HTML, CSS, JavaScript, SQL
- Required: HTML (High), CSS (High), JS (High), React (High), Node.js (High), SQL (High), Git (Med), REST APIs (High)
- Basic Score: $\frac{4}{8} = \mathbf{50.0\%}$
- Weighted Score: $\frac{12}{23} = \mathbf{52.2\%}$

---

## 📄 ATS Resume Analyzer (5-Factor Scoring Model)
Ported and enhanced from the prototype with 100+ skill alias dictionary:
$$\text{Overall Score} = (0.40 \times \text{Skill}) + (0.25 \times \text{Experience}) + (0.15 \times \text{Education}) + (0.10 \times \text{Keywords}) + (0.10 \times \text{Achievements})$$

---

## 🏆 Smart India Hackathon Differentiator Features
1. **Explainable Match Engine:** Natural-language paragraph explaining "Why this score" derived strictly from JSON weights.
2. **Trilingual Localization (MR / HI / EN):** Instant language toggle between English, मराठी (Marathi), and हिंदी (Hindi).
3. **WhatsApp Career Bot Simulator:** Interactive smartphone simulation for rural/low-bandwidth youth accessibility.
4. **Tamper-Evident Credential Ledger:** SHA-256 hash-anchored credential verification.
5. **AI Governance Anomaly Detection:** Automated $z$-score flagging on the admin dashboard.
6. **Voice Input for Career Assistant:** Integrated Web Speech API.

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite, Vanilla CSS design tokens + glassmorphism, Recharts, Lucide Icons
- **Backend:** FastAPI, Python, Pydantic, PyPDF, Python-docx, uvicorn
- **Data:** Synthetic data covering 76+ skills, 15 job roles, 24 courses, 12 projects, 10 Maharashtra districts, 100 demand metrics.
