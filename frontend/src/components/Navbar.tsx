import React from 'react';
import { Shield, Sparkles, Globe, ChevronDown, Award } from 'lucide-react';
import { Language, TRANSLATIONS } from '../lib/translations';

interface NavbarProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  language,
  onLanguageChange
}) => {
  const t = TRANSLATIONS[language];

  const roles = [
    { id: 'student', label: t.role_student, icon: '👨‍🎓', desc: 'Profile, Skill Gap, Roadmap, Resume' },
    { id: 'trainer_faculty', label: t.role_faculty, icon: '👨‍🏫', desc: 'Course Management, Progress Logs' },
    { id: 'training_institute', label: t.role_institute, icon: '🎓', desc: 'Department Skill Gaps vs Demand' },
    { id: 'industry_employer', label: t.role_employer, icon: '🏢', desc: 'Candidate Sourcing, Job Criteria' },
    { id: 'skill_reviewer', label: t.role_reviewer, icon: '🔍', desc: 'Curriculum & Quality Standards Review' },
    { id: 'government_admin', label: t.role_admin, icon: '🏛️', desc: 'Regional Intelligence, RBAC & Policy' }
  ];

  const currentRoleInfo = roles.find(r => r.id === currentRole) || roles[0];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(10, 15, 29, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1.5rem'
    }}>
      {/* Brand & Maharashtra Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
        }}>
          <Sparkles size={22} color="#ffffff" />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              {t.app_name}
            </h1>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              SIH26134
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
            <span>{t.government_badge}</span>
            <span>•</span>
            <span style={{ color: '#38bdf8' }}>Govt of Maharashtra</span>
          </div>
        </div>
      </div>

      {/* Right Controls: Language Selector, Demo Badge, Role Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Language Selector (MR / HI / EN) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '0.2rem 0.4rem',
          fontSize: '0.8rem'
        }}>
          <Globe size={14} color="#94a3b8" style={{ marginRight: '0.4rem' }} />
          {(['en', 'mr', 'hi'] as Language[]).map(lang => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              style={{
                background: language === lang ? 'var(--accent-indigo)' : 'transparent',
                color: language === lang ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {lang === 'en' ? 'EN' : (lang === 'mr' ? 'मराठी' : 'हिंदी')}
            </button>
          ))}
        </div>

        {/* Demo Mode Badge */}
        <div className="badge badge-demo" title="Role switcher active for SIH evaluation">
          <Shield size={13} />
          <span>{t.demo_mode}</span>
        </div>

        {/* Interactive Demo Role Switcher */}
        <div style={{ position: 'relative' }}>
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value)}
            style={{
              appearance: 'none',
              background: 'rgba(30, 41, 59, 0.9)',
              color: '#f8fafc',
              border: '1px solid var(--border-active)',
              borderRadius: '10px',
              padding: '0.55rem 2.2rem 0.55rem 0.9rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)'
            }}
          >
            {roles.map(r => (
              <option key={r.id} value={r.id} style={{ background: '#0f172a', color: '#f8fafc' }}>
                {r.icon} {r.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            color="#94a3b8"
            style={{
              position: 'absolute',
              right: '0.8rem',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Active Profile Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.35rem 0.75rem',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '10px'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            {currentRoleInfo.icon}
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>
              {currentRoleInfo.label}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#38bdf8' }}>
              Maharashtra Hub
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
