import React, { useState } from 'react';
import { ExternalLink, Award, Clock } from 'lucide-react';
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
  const [selectedProvider, setSelectedProvider] = useState<string>('All');

  const portals = [
    {
      id: 'Skill India',
      name: '🏛️ Skill India Digital Hub',
      url: 'https://courses.skillindiadigital.gov.in/',
      matcher: (p: string) => p.toLowerCase().includes('skill india')
    },
    {
      id: 'NCS',
      name: '💼 National Career Service',
      url: 'https://www.ncs.gov.in/',
      matcher: (p: string) => p.toLowerCase().includes('ncs') || p.toLowerCase().includes('national career')
    },
    {
      id: 'AICTE',
      name: '🎓 AICTE Portal',
      url: 'https://internship.aicte-india.org/',
      matcher: (p: string) => p.toLowerCase().includes('aicte') || p.toLowerCase().includes('nptel')
    }
  ];

  const filteredCourses = selectedProvider === 'All'
    ? courses
    : courses.filter(c => {
        const portal = portals.find(p => p.id === selectedProvider);
        return portal ? portal.matcher(c.provider) : true;
      });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
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

          {/* Active Government Portal Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            <button
              onClick={() => setSelectedProvider('All')}
              className={selectedProvider === 'All' ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem' }}
            >
              All Programs ({courses.length})
            </button>

            {portals.map(portal => {
              const isActive = selectedProvider === portal.id;
              return (
                <div key={portal.id} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <button
                    onClick={() => setSelectedProvider(isActive ? 'All' : portal.id)}
                    className={isActive ? 'btn-primary' : 'btn-secondary'}
                    title={`Click to filter courses from ${portal.name}`}
                    style={{
                      fontSize: '0.78rem',
                      padding: '0.45rem 0.85rem',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0
                    }}
                  >
                    <span>{portal.name}</span>
                  </button>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noreferrer"
                    title={`Open official ${portal.name} portal`}
                    className={isActive ? 'btn-primary' : 'btn-secondary'}
                    style={{
                      padding: '0.45rem 0.6rem',
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderLeft: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={13} color={isActive ? '#ffffff' : '#38bdf8'} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {selectedProvider !== 'All' && (
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Filtered by: <strong>{portals.find(p => p.id === selectedProvider)?.name}</strong> ({filteredCourses.length} programs found)</span>
            <button
              onClick={() => setSelectedProvider('All')}
              style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.8rem' }}
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {/* Courses Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredCourses.map((course, idx) => (
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
