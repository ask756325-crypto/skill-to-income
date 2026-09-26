import React, { useState } from 'react';
import { Award, Plus, CheckCircle2, Star, BookOpen, Building } from 'lucide-react';
import { Language, TRANSLATIONS } from '../lib/translations';

interface StudentSkillProfileProps {
  skills: any[];
  onAddSkill: (skillName: string, proficiency: string) => void;
  language: Language;
}

export const StudentSkillProfile: React.FC<StudentSkillProfileProps> = ({
  skills,
  onAddSkill,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [newSkill, setNewSkill] = useState('');
  const [proficiency, setProficiency] = useState('Intermediate');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    onAddSkill(newSkill.trim(), proficiency);
    setNewSkill('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Student Identity Card */}
      <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.35)'
          }}>
            👨‍🎓
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: 0 }}>Aarav Deshmukh</h2>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <CheckCircle2 size={12} /> Verified Student
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.35rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Building size={14} /> COEP Technological University, Pune
              </span>
              <span>•</span>
              <span>Computer Engineering (B.Tech 3rd Year)</span>
              <span>•</span>
              <span style={{ color: '#38bdf8' }}>District: Pune</span>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          textAlign: 'right'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            SkillBridge Rank
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f59e0b' }}>
            Top 12% in Maharashtra
          </div>
          <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>
            1,450 XP Accumulated
          </div>
        </div>
      </div>

      {/* Verified Skills Grid */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', margin: 0 }}>
              {t.matched_skills} ({skills.length})
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Skills validated through coursework, lab assessments, or authenticated certifications.
            </p>
          </div>

          {/* Quick Add Skill Form */}
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="e.g. React, Docker, Python"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                color: '#f8fafc',
                fontSize: '0.85rem',
                outline: 'none',
                minWidth: '200px'
              }}
            />
            <select
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                color: '#f8fafc',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <Plus size={16} /> Add Skill
            </button>
          </form>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem'
        }}>
          {skills.map((s, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.95rem' }}>
                  {s.skill_id ? s.skill_id.toUpperCase() : s.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  Level: <span style={{ color: '#38bdf8', fontWeight: 600 }}>{s.proficiency || 'Intermediate'}</span>
                </div>
              </div>
              <span className="badge badge-low">
                <Star size={11} /> Verified
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
