import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Activity, Check, X, RefreshCw } from 'lucide-react';
import { api } from '../lib/api';
import { Language, TRANSLATIONS } from '../lib/translations';

interface PermissionsViewProps {
  currentRole: string;
  language: Language;
}

export const PermissionsView: React.FC<PermissionsViewProps> = ({
  currentRole,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [matrix, setMatrix] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [updating, setUpdating] = useState<string | null>(null);

  const permissionsList = ["view", "create", "edit", "delete", "approve", "export", "manage_users", "manage_roles"];

  useEffect(() => {
    loadData();
  }, [currentRole]);

  const loadData = async () => {
    try {
      const [permData, logData] = await Promise.all([
        api.getRolesPermissions(),
        api.getAuditLogs(currentRole)
      ]);
      setMatrix(permData);
      setLogs(logData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggle = async (roleKey: string, permKey: string, currentValue: boolean) => {
    const key = `${roleKey}-${permKey}`;
    setUpdating(key);
    try {
      const res = await api.updatePermission(roleKey, permKey, !currentValue, currentRole);
      setMatrix(res.matrix);
      // Reload audit logs to show update
      const updatedLogs = await api.getAuditLogs(currentRole);
      setLogs(updatedLogs);
    } catch (err: any) {
      alert(err.message || 'Error updating permission');
    } finally {
      setUpdating(null);
    }
  };

  if (!matrix) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8' }}>Loading RBAC permissions and security ledger...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#6366f1', fontWeight: 700, letterSpacing: '0.05em' }}>
          Security & Access Governance (Section 4 & Module P)
        </div>
        <h2 style={{ fontSize: '1.35rem', color: '#f8fafc', margin: '0.2rem 0 0 0' }}>
          {t.nav_permissions} Matrix
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
          Interactive server-enforced role permissions matrix. Click any checkbox to update system authorization live.
        </p>
      </div>

      {/* Interactive Toggleable Permission Table */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={18} color="#34d399" /> Role Capability & Permission Matrix
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: '#94a3b8' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Role Title</th>
                {permissionsList.map(p => (
                  <th key={p} style={{ padding: '0.75rem 0.5rem', textTransform: 'capitalize' }}>
                    {p.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(matrix).map(([roleKey, roleData]: [string, any]) => (
                <tr key={roleKey} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600, color: '#f8fafc' }}>
                    {roleData.title}
                  </td>
                  {permissionsList.map(permKey => {
                    const isChecked = roleData.permissions[permKey] || false;
                    const isPending = updating === `${roleKey}-${permKey}`;

                    return (
                      <td key={permKey} style={{ padding: '0.5rem' }}>
                        <button
                          onClick={() => handleToggle(roleKey, permKey, isChecked)}
                          disabled={isPending}
                          style={{
                            background: isChecked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                            border: isChecked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            width: '28px',
                            height: '28px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: isChecked ? '#34d399' : '#64748b',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {isChecked ? <Check size={14} /> : <X size={14} />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Activity & Audit Log */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} color="#f59e0b" /> Security & Access Audit Log (Module Q)
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: '#94a3b8' }}>
                <th style={{ padding: '0.65rem 1rem' }}>Timestamp</th>
                <th style={{ padding: '0.65rem 1rem' }}>User / Identity</th>
                <th style={{ padding: '0.65rem 1rem' }}>Role</th>
                <th style={{ padding: '0.65rem 1rem' }}>Action Executed</th>
                <th style={{ padding: '0.65rem 1rem' }}>Module</th>
                <th style={{ padding: '0.65rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.slice(0, 10).map((log, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                    {log.timestamp}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>
                    {log.user_email}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className="badge badge-demo" style={{ fontSize: '0.68rem' }}>
                      {log.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#f8fafc' }}>
                    <code>{log.action}</code>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#38bdf8' }}>
                    {log.module}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className="badge badge-low" style={{ fontSize: '0.68rem' }}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
