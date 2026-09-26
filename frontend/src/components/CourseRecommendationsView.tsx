import React from 'react';
import { BookOpen, ExternalLink, Award, Clock, CheckCircle } from 'lucide-react';
import { Language, TRANSLATIONS } from '../lib/translations';

interface CourseRecommendationsViewProps {
  courses: any[];
  missingSkills: string[];
  language: Language;
}

export const CourseRecommendationsView: React.FC<CourseRecommendationsViewProps> = ({
  courses,
  missingSkills,
  language
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#10b981', fontWeight: 700, letterSpacing: '0.05em' }}>
              Skill India & NCS Alignment
            </div>
            <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.2rem 0 0 0' }}>
              {t.explore_courses}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Subsidized and government-accredited courses addressing your priority missing skills: <strong style={{ color: '#fda4af' }}>{missingSkills.join(', ') || 'General IT'}</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
              🏛️ Skill India Digital Hub
            </span>
            <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
              💼 National Career Service
            </span>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
              🎓 AICTE Portal
            </span>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}>
        {courses.map((course, idx) => (
          <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  {course.provider}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>
                  {course.difficulty}
                </span>
              </div>

              <h4 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                {course.name}
              </h4>

              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1rem' }}>
                {course.description}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#cbd5e1', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginBottom: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={13} color="#94a3b8" /> {course.duration}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#34d399', fontWeight: 600 }}>
                  <Award size={13} /> {course.certification}
                </span>
              </div>

              <a
                href={course.url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', fontSize: '0.82rem', padding: '0.55rem' }}
              >
                <span>View Program on Portal</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
