export type Language = 'en' | 'mr' | 'hi';

export interface Translations {
  app_name: string;
  tagline: string;
  government_badge: string;
  demo_mode: string;
  role_student: string;
  role_faculty: string;
  role_institute: string;
  role_employer: string;
  role_reviewer: string;
  role_admin: string;
  nav_dashboard: string;
  nav_skills: string;
  nav_skill_gap: string;
  nav_roadmap: string;
  nav_resume: string;
  nav_courses: string;
  nav_projects: string;
  nav_ai_assistant: string;
  nav_industry: string;
  nav_institute: string;
  nav_admin_intelligence: string;
  nav_permissions: string;
  nav_whatsapp: string;
  nav_credential_ledger: string;
  target_role: string;
  match_score: string;
  basic_score: string;
  weighted_score: string;
  matched_skills: string;
  missing_skills: string;
  why_this_score: string;
  explore_courses: string;
  explore_projects: string;
  voice_assistant: string;
  district_heatmap: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    app_name: "SkillBridge AI",
    tagline: "Bridging the Gap Between Education, Skills and Industry",
    government_badge: "Government of Maharashtra",
    demo_mode: "JUDGE DEMO MODE",
    role_student: "Student / Trainee",
    role_faculty: "Trainer / Faculty",
    role_institute: "Training Institute / College",
    role_employer: "Industry / Employer",
    role_reviewer: "Skill Authority / Reviewer",
    role_admin: "Government / Admin",
    nav_dashboard: "Overview Dashboard",
    nav_skills: "Skill Profile",
    nav_skill_gap: "Skill Gap Analyzer",
    nav_roadmap: "Career Roadmap",
    nav_resume: "AI Resume Analyzer",
    nav_courses: "Course Recommendations",
    nav_projects: "Portfolio Projects",
    nav_ai_assistant: "AI Career Counselor",
    nav_industry: "Employer Portal",
    nav_institute: "College Alignment",
    nav_admin_intelligence: "Maharashtra Intelligence",
    nav_permissions: "RBAC & Permissions",
    nav_whatsapp: "WhatsApp Career Bot",
    nav_credential_ledger: "Tamper-Evident Ledger",
    target_role: "Target Career Role",
    match_score: "Employability Alignment",
    basic_score: "Basic Skill Match",
    weighted_score: "Weighted Industry Match",
    matched_skills: "Verified Proficient Skills",
    missing_skills: "High-Priority Skill Gaps",
    why_this_score: "Explainable Match Analysis",
    explore_courses: "Subsidized Training Programs",
    explore_projects: "Recommended Portfolio Projects",
    voice_assistant: "Voice Command",
    district_heatmap: "Regional Maharashtra Skill Heatmap"
  },
  mr: {
    app_name: "स्किलब्रिज एआय",
    tagline: "शिक्षण, कौशल्ये आणि उद्योग यांच्यातील अंतर कमी करणे",
    government_badge: "महाराष्ट्र शासन",
    demo_mode: "परीक्षक डेमो मोड",
    role_student: "विद्यार्थी / प्रशिक्षणार्थी",
    role_faculty: "प्रशिक्षक / प्राध्यापक",
    role_institute: "प्रशिक्षण संस्था / महाविद्यालय",
    role_employer: "उद्योग / नियोक्ता",
    role_reviewer: "कौशल्य प्राधिकरण / समीक्षक",
    role_admin: "शासन / प्रशासक",
    nav_dashboard: "एकूण डॅशबोर्ड",
    nav_skills: "कौशल्य प्रोफाइल",
    nav_skill_gap: "कौशल्य तफावत विश्लेषक",
    nav_roadmap: "करिअर रोडमॅप",
    nav_resume: "रेझ्युमे विश्लेषक",
    nav_courses: "अभ्यासक्रम शिफारसी",
    nav_projects: "प्रकल्प शिफारसी",
    nav_ai_assistant: "एआय करिअर सल्लागार",
    nav_industry: "उद्योग दालन",
    nav_institute: "महाविद्यालय संरेखन",
    nav_admin_intelligence: "महाराष्ट्र कौशल्य बुद्धिमत्ता",
    nav_permissions: "परवानग्या आणि सुरक्षा",
    nav_whatsapp: "व्हॉट्सॲप करिअर बॉट",
    nav_credential_ledger: "प्रमाणपत्र पडताळणी वही",
    target_role: "ध्येय करिअर भूमिका",
    match_score: "रोजगार सज्जता गुण",
    basic_score: "मूलभूत कौशल्य जुळणी",
    weighted_score: "उद्योगाधारित भारांकित गुण",
    matched_skills: "प्रमाणित प्राप्त कौशल्ये",
    missing_skills: "अपूर्ण महत्त्वाची कौशल्ये",
    why_this_score: "गुणांचे पारदर्शक स्पष्टीकरण",
    explore_courses: "अनुदानित प्रशिक्षण कार्यक्रम",
    explore_projects: "शिफारस केलेले प्रकल्प",
    voice_assistant: "ध्वनी आदेश",
    district_heatmap: "जिल्हानिहाय कौशल्य मागणी नकाशा"
  },
  hi: {
    app_name: "स्किलब्रिज एआई",
    tagline: "शिक्षा, कौशल और उद्योग के बीच की दूरी को पाटना",
    government_badge: "महाराष्ट्र सरकार",
    demo_mode: "निर्णायक डेमो मोड",
    role_student: "छात्र / प्रशिक्षु",
    role_faculty: "प्रशिक्षक / संकाय",
    role_institute: "प्रशिक्षण संस्थान / कॉलेज",
    role_employer: "उद्योग / नियोक्ता",
    role_reviewer: "कौशल प्राधिकरण / समीक्षक",
    role_admin: "सरकार / व्यवस्थापक",
    nav_dashboard: "अवलोकन डैशबोर्ड",
    nav_skills: "कौशल प्रोफाइल",
    nav_skill_gap: "कौशल अंतर विश्लेषक",
    nav_roadmap: "करियर रोडमैप",
    nav_resume: "एआई रिज्यूमे विश्लेषक",
    nav_courses: "अनुशंसित पाठ्यक्रम",
    nav_projects: "पोर्टफोलियो प्रोजेक्ट्स",
    nav_ai_assistant: "एआई करियर काउंसलर",
    nav_industry: "उद्योग पोर्टल",
    nav_institute: "संस्थान संरेखण",
    nav_admin_intelligence: "महाराष्ट्र कौशल खुफिया",
    nav_permissions: "अनुमतियां और सुरक्षा",
    nav_whatsapp: "व्हाट्सएप करियर बॉट",
    nav_credential_ledger: "सत्यापनीय प्रमाणपत्र बहीखाता",
    target_role: "लक्षित करियर भूमिका",
    match_score: "रोजगार संरेखण स्कोर",
    basic_score: "बुनियादी कौशल मैच",
    weighted_score: "भारित उद्योग मैच",
    matched_skills: "सत्यापित कुशलताएं",
    missing_skills: "प्राथमिकता कौशल अंतर",
    why_this_score: "स्कोर का पारदर्शी विवरण",
    explore_courses: "सब्सिडी वाले प्रशिक्षण कार्यक्रम",
    explore_projects: "अनुशंसित पोर्टफोलियो प्रोजेक्ट्स",
    voice_assistant: "आवाज़ इनपुट",
    district_heatmap: "जिलावार कौशल मांग हीटमैप"
  }
};
