import React from 'react';
import { FolderGit2, CheckCircle2, Code2, ArrowUpRight, Clock, Target } from 'lucide-react';
import { Language, TRANSLATIONS } from '../lib/translations';

interface ProjectRecommendationsViewProps {
  projects: any[];
  missingSkills: string[];
  language: Language;
}

export const ProjectRecommendationsView: React.FC<ProjectRecommendationsViewProps> = ({
  projects,
  missingSkills,
  language
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#c084fc', fontWeight: 700, letterSpacing: '0.05em' }}>
          Portfolio Gap Engineering
        </div>
        <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.2rem 0 0 0' }}>
          {t.explore_projects}
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
          Real-world capstones designed to prove competence to Maharashtra IT employers in your missing skills.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '1.25rem'
      }}>
        {projects.map((proj, idx) => (
          <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <span className="badge badge-demo">
                  Solves: {proj.missing_skill_id?.toUpperCase() || 'Portfolio Gap'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600 }}>
                  {proj.difficulty}
                </span>
              </div>

              <h4 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {proj.title}
              </h4>

              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                {proj.description}
              </p>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                {proj.technologies?.map((tech: string, tIdx: number) => (
                  <span
                    key={tIdx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      padding: '0.15rem 0.45rem',
                      fontSize: '0.72rem',
                      color: '#cbd5e1'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.75rem', color: '#a5b4fc', marginBottom: '0.85rem' }}>
                <Target size={14} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
                <span>Outcome: {proj.expected_outcome}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={13} /> {proj.duration}
                </span>

                <button className="btn-secondary" style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}>
                  <span>View Project Specs</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
