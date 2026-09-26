import React, { useState, useEffect } from 'react';
import { Building2, Plus, Users, Search, CheckCircle, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import { api } from '../lib/api';
import { Language, TRANSLATIONS } from '../lib/translations';

interface IndustryViewProps {
  currentRole: string;
  language: Language;
}

export const IndustryView: React.FC<IndustryViewProps> = ({
  currentRole,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('Tata Consultancy Services (TCS)');
  const [newLocation, setNewLocation] = useState('Pune / Hinjewadi Phase 3');
  const [newRole, setNewRole] = useState('full-stack-developer');
  const [selectedSkills, setSelectedSkills] = useState('React, Node.js, SQL, REST APIs');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [candList, jobList] = await Promise.all([
        api.searchCandidates('full-stack-developer'),
        api.getIndustryJobs()
      ]);
      setCandidates(candList);
      setJobs(jobList);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const skillsArray = selectedSkills.split(',').map(s => ({
        skill_id: s.trim().toLowerCase(),
        importance: 'high'
      }));

      await api.createIndustryJob({
        title: newTitle,
        company: newCompany,
        location: newLocation,
        industry: "IT & Software",
        role_id: newRole,
        required_skills: skillsArray,
        description: "Seeking industry-aligned candidates verified through Maharashtra SkillBridge platform."
      }, currentRole);

      setShowCreateModal(false);
      setNewTitle('');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error posting job requirement');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.05em' }}>
            Employer & Industry Console (Module J)
          </div>
          <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.2rem 0 0 0' }}>
            {t.nav_industry}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
            Publish skill-weighted requirements, benchmark candidate compatibility, and collaborate on college curricula.
          </p>
        </div>

        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
          <Plus size={16} /> Publish Job Requirement
        </button>
      </div>

      {/* Candidate Compatibility Search & Match */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="#38bdf8" /> Pre-Screened Candidates (Full Stack Developer)
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Candidate-job compatibility dynamically computed using transparent weighted scoring model.
            </p>
          </div>
          <span className="badge badge-low">
            <Scale size={13} /> Transparent Verification
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {candidates.map((cand, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#f8fafc', margin: 0 }}>
                      {cand.name}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                      {cand.institution}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: cand.compatibility_score >= 70 ? '#34d399' : '#fcd34d' }}>
                      {cand.compatibility_score}%
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Match Score</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
                  District: <strong style={{ color: '#38bdf8' }}>{cand.district}</strong> • Matched: <strong>{cand.matched_skills_count} / {cand.total_required}</strong> Core Requirements
                </div>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                  {cand.skills?.map((s: any, sIdx: number) => (
                    <span key={sIdx} className="badge badge-low" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                      {s.skill_id?.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                <button className="btn-primary" style={{ flex: 1, fontSize: '0.75rem', padding: '0.45rem', justifyContent: 'center' }}>
                  Direct Interview Invite
                </button>
                <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.45rem 0.75rem' }}>
                  Audit Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Job Requirements List */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', marginBottom: '1rem' }}>
          Active Industry Requirements ({jobs.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {jobs.map((job, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', color: '#f8fafc', margin: 0 }}>
                  {job.title}
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  {job.company} • {job.location} • {job.salary_range}
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
                  {job.required_skills?.map((s: string, sIdx: number) => (
                    <span key={sIdx} className="badge badge-demo" style={{ fontSize: '0.7rem' }}>
                      {s.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              <span className="badge badge-low">
                Accepting Verified Applicants
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '1.25rem' }}>
              Publish Skill-Weighted Job Opening
            </h3>
            <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Associate Full Stack Engineer"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.6rem', color: '#f8fafc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Company</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.6rem', color: '#f8fafc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Location (Maharashtra Hub)</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.6rem', color: '#f8fafc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Required Skills (comma separated)</label>
                <input
                  type="text"
                  required
                  value={selectedSkills}
                  onChange={(e) => setSelectedSkills(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.6rem', color: '#f8fafc' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Publish Opening
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
