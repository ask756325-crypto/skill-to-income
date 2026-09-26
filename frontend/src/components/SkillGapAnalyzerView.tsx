import React from 'react';
import {
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  FolderGit2,
  Info,
  Scale
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../lib/translations';

interface SkillGapAnalyzerViewProps {
  jobRoles: any[];
  selectedRoleId: string;
  onSelectRole: (roleId: string) => void;
  gapData: any;
  onNavigateTab: (tabId: string) => void;
  language: Language;
}

export const SkillGapAnalyzerView: React.FC<SkillGapAnalyzerViewProps> = ({
  jobRoles,
  selectedRoleId,
  onSelectRole,
  gapData,
  onNavigateTab,
  language
}) => {
  const t = TRANSLATIONS[language];

  if (!gapData) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8' }}>Loading skill gap intelligence...</p>
      </div>
    );
  }

  const weightedPct = gapData.weighted_match_pct || 0;
  const basicPct = gapData.basic_match_pct || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Target Job Role Header Selector */}
      <div className="glass-panel" style={{ padding: '1.5rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.05em' }}>
            {t.target_role}
          </div>
          <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.2rem 0 0 0' }}>
            {gapData.role_title}
          </h2>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Industry: <span style={{ color: '#cbd5e1' }}>{gapData.industry}</span> • Level: <span style={{ color: '#cbd5e1' }}>{gapData.experience_level}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
            Change Target Role:
          </label>
          <select
            value={selectedRoleId}
            onChange={(e) => onSelectRole(e.target.value)}
            style={{
              background: 'rgba(30, 41, 59, 0.9)',
              color: '#f8fafc',
              border: '1px solid var(--border-active)',
              borderRadius: '8px',
              padding: '0.55rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {jobRoles.map(r => (
              <option key={r.id} value={r.id} style={{ background: '#0f172a' }}>
                {r.title} ({r.industry})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dual Scores & Transparent Formula Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Weighted Score Card */}
        <div className="glass-panel" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #38bdf8, #6366f1)'
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                {t.weighted_score}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: weightedPct >= 70 ? '#34d399' : (weightedPct >= 50 ? '#fcd34d' : '#f87171'), lineHeight: 1.2, marginTop: '0.2rem' }}>
                {weightedPct}%
              </div>
            </div>
            <div style={{
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '12px',
              padding: '0.6rem',
              color: '#818cf8'
            }}>
              <Scale size={24} />
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            Weights: <strong>High Priority = 3x</strong>, <strong>Medium = 2x</strong>, <strong>Low = 1x</strong>. Reflected in recruiter talent matching filters.
          </div>

          {/* Progress Gauge */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginTop: '0.85rem', overflow: 'hidden' }}>
            <div style={{
              width: `${weightedPct}%`,
              height: '100%',
              background: weightedPct >= 70 ? '#10b981' : (weightedPct >= 50 ? '#f59e0b' : '#ef4444'),
              borderRadius: '4px',
              transition: 'width 0.6s ease'
            }} />
          </div>
        </div>

        {/* Basic Score Card */}
        <div className="glass-panel" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #10b981, #06b6d4)'
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                {t.basic_score}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, marginTop: '0.2rem' }}>
                {basicPct}%
              </div>
            </div>
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '0.6rem',
              color: '#34d399'
            }}>
              <CheckCircle2 size={24} />
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            Matched: <strong>{gapData.matched_skills_count}</strong> of <strong>{gapData.total_required_skills}</strong> required curriculum skills.
          </div>

          {/* Progress Gauge */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginTop: '0.85rem', overflow: 'hidden' }}>
            <div style={{
              width: `${basicPct}%`,
              height: '100%',
              background: '#06b6d4',
              borderRadius: '4px',
              transition: 'width 0.6s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Mathematical Rigor & Transparent Formula Display (Mandated in Section 8) */}
      <div className="glass-panel" style={{ padding: '1.5rem 1.75rem', borderLeft: '4px solid var(--accent-indigo)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <Info size={18} color="#818cf8" />
          <h4 style={{ fontSize: '0.95rem', color: '#f8fafc', margin: 0 }}>
            Mathematical Transparency & Calculation Details
          </h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ color: '#94a3b8' }}>Basic Formula: </span>
            <code style={{ color: '#38bdf8' }}>{gapData.formula_breakdown?.basic_formula}</code>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ color: '#94a3b8' }}>Weighted Formula: </span>
            <code style={{ color: '#c084fc' }}>{gapData.formula_breakdown?.weighted_formula}</code>
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.75rem', fontStyle: 'italic' }}>
          * {gapData.formula_breakdown?.disclaimer}
        </div>
      </div>

      {/* SIH Differentiator 1: Explainable Match Engine */}
      {gapData.explainable_narrative && (
        <div className="glass-panel" style={{ padding: '1.5rem 1.75rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(49, 46, 129, 0.2))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Lightbulb size={20} color="#f59e0b" />
            <h4 style={{ fontSize: '1rem', color: '#f8fafc', margin: 0 }}>
              {t.why_this_score} (AI Explainable Engine)
            </h4>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
            {gapData.explainable_narrative}
          </p>
        </div>
      )}

      {/* Matched vs Missing Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Missing Skills (Priority Ranked) */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <AlertTriangle size={20} color="#f43f5e" />
            <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', margin: 0 }}>
              {t.missing_skills} ({gapData.missing_skills?.length || 0})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {gapData.missing_skills?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeft: item.importance === 'high' ? '3px solid #f43f5e' : '3px solid #f59e0b'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.92rem' }}>
                    {item.skill_id.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    Weight Factor: <strong>{item.weight}x</strong>
                  </div>
                </div>

                <span className={item.importance === 'high' ? 'badge badge-high' : 'badge badge-medium'}>
                  {item.importance.toUpperCase()} PRIORITY
                </span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              onClick={() => onNavigateTab('courses')}
              className="btn-primary"
              style={{ flex: 1, fontSize: '0.82rem', padding: '0.55rem' }}
            >
              <BookOpen size={14} /> Close Gap via Courses
            </button>
            <button
              onClick={() => onNavigateTab('projects')}
              className="btn-secondary"
              style={{ flex: 1, fontSize: '0.82rem', padding: '0.55rem' }}
            >
              <FolderGit2 size={14} /> Recommended Projects
            </button>
          </div>
        </div>

        {/* Matched Skills */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', margin: 0 }}>
              {t.matched_skills} ({gapData.matched_skills?.length || 0})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {gapData.matched_skills?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeft: '3px solid #10b981'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.92rem' }}>
                    {item.skill_id.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    Verified Level: <span style={{ color: '#34d399', fontWeight: 600 }}>{item.student_proficiency}</span>
                  </div>
                </div>

                <span className="badge badge-low">
                  MATCHED ({item.weight}x)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
