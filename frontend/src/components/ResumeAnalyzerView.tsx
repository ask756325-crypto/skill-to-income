import React, { useState } from 'react';
import { FileText, Upload, Sparkles, AlertCircle, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import { api } from '../lib/api';
import { Language, TRANSLATIONS } from '../lib/translations';

interface ResumeAnalyzerViewProps {
  jobRoles: any[];
  language: Language;
}

export const ResumeAnalyzerView: React.FC<ResumeAnalyzerViewProps> = ({
  jobRoles,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [targetRoleId, setTargetRoleId] = useState('full-stack-developer');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleResume = `AARAV DESHMUKH
Email: aarav.deshmukh@coep.ac.in | Phone: +91 98765 43210 | Pune, Maharashtra
LinkedIn: linkedin.com/in/aarav-deshmukh | GitHub: github.com/aarav-deshmukh

EDUCATION
B.Tech in Computer Engineering (2022 - 2026)
COEP Technological University, Pune | CGPA: 8.8/10

TECHNICAL SKILLS
Languages: Python, JavaScript, HTML5, CSS3, SQL, C
Frameworks & Libraries: React.js, Express.js, Pandas, NumPy
Databases & Cloud: PostgreSQL, SQLite, Git, GitHub
Core Concepts: REST APIs, Object-Oriented Programming, Data Structures & Algorithms

EXPERIENCE & INTERNSHIPS
Software Engineering Intern | Persistent Systems (May 2025 - July 2025)
- Developed responsive web interfaces using React.js and CSS for Maharashtra citizen portal.
- Implemented RESTful APIs in Node.js for backend telemetry data collection.
- Optimized PostgreSQL relational queries reducing lookup response times by 25%.

PROJECTS
1. Student Placement Analytics Portal: Built full-stack dashboard with SQL, Python, and React.
2. AI Career Recommendation Model: Built machine learning classification model using Scikit-Learn.

ACHIEVEMENTS & CERTIFICATIONS
- Smart India Hackathon (SIH) 2025 State Finalist (Maharashtra Hub)
- Certified in Relational Database Management Systems by Skill India Digital Hub & MSBTE
- Organized annual technical symposium at COEP Pune with 1200+ participants.`;

  const handleAnalyze = async (textToUse?: string) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      } else {
        formData.append('resume_text', textToUse || resumeText || sampleResume);
      }
      formData.append('target_role_id', targetRoleId);

      const res = await api.analyzeResume(formData);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Panel */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#06b6d4', fontWeight: 700, letterSpacing: '0.05em' }}>
              Module H • 5-Factor Evaluation Model
            </div>
            <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.2rem 0 0 0' }}>
              {t.nav_resume}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Weighted 5-Factor Scoring: Skill Match (40%), Experience (25%), Education (15%), Keyword Density (10%), Achievements (10%).
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Target Role:</label>
            <select
              value={targetRoleId}
              onChange={(e) => setTargetRoleId(e.target.value)}
              style={{
                background: 'rgba(30, 41, 59, 0.9)',
                color: '#f8fafc',
                border: '1px solid var(--border-active)',
                borderRadius: '8px',
                padding: '0.55rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              {jobRoles.map(r => (
                <option key={r.id} value={r.id} style={{ background: '#0f172a' }}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Input Options: Upload File or Paste/Sample Text */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* File Upload Area */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.85rem' }}>
            Upload Resume (PDF / DOCX)
          </h3>

          <div style={{
            border: '2px dashed var(--border-active)',
            borderRadius: '12px',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.5)',
            marginBottom: '1rem'
          }}>
            <Upload size={36} color="#38bdf8" style={{ margin: '0 auto 0.75rem auto' }} />
            <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600, marginBottom: '0.25rem' }}>
              {selectedFile ? selectedFile.name : 'Choose PDF or DOCX resume file'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Supports PyPDF & Python-docx text extraction
            </div>

            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              style={{ fontSize: '0.8rem', color: '#94a3b8' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => handleAnalyze()}
              disabled={loading || !selectedFile}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Sparkles size={16} /> {loading ? 'Extracting & Scoring...' : 'Analyze Uploaded File'}
            </button>
          </div>
        </div>

        {/* Text Paste / Sample Resume Area */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', margin: 0 }}>
                Paste Text / Instant Demo
              </h3>
              <button
                onClick={() => {
                  setResumeText(sampleResume);
                  handleAnalyze(sampleResume);
                }}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              >
                Load Sample Resume
              </button>
            </div>

            <textarea
              rows={7}
              placeholder="Paste candidate resume text here or click 'Load Sample Resume' above..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.75rem',
                color: '#f8fafc',
                fontSize: '0.82rem',
                fontFamily: 'monospace',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
          >
            <Sparkles size={16} /> {loading ? 'Computing 5-Factor Score...' : 'Analyze Text Content'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '1rem', borderRadius: '8px', color: '#fda4af', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      {/* Analysis Results Display */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Overall Score Banner */}
          <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700 }}>
                Comprehensive ATS Alignment Score
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: result.overall_match_score >= 70 ? '#34d399' : '#fcd34d', margin: '0.2rem 0' }}>
                {result.overall_match_score}%
              </h2>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Evaluated against: <strong style={{ color: '#f8fafc' }}>{result.target_role_title}</strong>
              </div>
            </div>

            {/* 5-Factor Mini Cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.65rem 1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Skill Match (40%)</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8' }}>{result.weights_model?.skill_match_40}%</div>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.65rem 1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Experience (25%)</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#818cf8' }}>{result.weights_model?.experience_25}%</div>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.65rem 1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Education (15%)</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#34d399' }}>{result.weights_model?.education_15}%</div>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.65rem 1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Keywords (10%)</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fbbf24' }}>{result.weights_model?.keyword_density_10}%</div>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.65rem 1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Achievements (10%)</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#c084fc' }}>{result.weights_model?.achievements_10}%</div>
              </div>
            </div>
          </div>

          {/* Actionable Rewrite Suggestions */}
          <div className="glass-panel" style={{ padding: '1.75rem', borderLeft: '4px solid var(--accent-amber)' }}>
            <h4 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#f59e0b" /> Actionable Resume Improvement Recommendations
            </h4>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
              {result.actionable_suggestions?.map((sug: string, idx: number) => (
                <li key={idx}>{sug}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
