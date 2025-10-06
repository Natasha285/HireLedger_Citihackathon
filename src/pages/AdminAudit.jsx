import React, { useState, useMemo } from 'react';

/*
  AdminAudit Page
  ---------------
  Audit log table with filters and export placeholder.
  TODO(API): Server-side filtering (date range, actor, action type, resource).
  TODO(EXPORT): Stream CSV export (consider background job + email link for large sets).
  TODO(SECURITY): Ensure tamper-proof log storage (append-only, hashing / chain).
*/

const ACTIONS = ['login','approve-user','reject-user','create-job','update-job','delete-job','assign-role','revoke-role'];

const LOGS = Array.from({ length: 120 }).map((_, i) => ({
  id: 'log' + (i+1),
  ts: Date.now() - i * 3600_000,
  actor: 'user' + ((i % 15) + 1),
  action: ACTIONS[i % ACTIONS.length],
  resource: ['job','user','institution','credential'][i % 4],
  meta: 'Sample metadata ' + (i+1)
}));

export default function AdminAudit() {
  const [actionFilter, setActionFilter] = useState('');
  const [resourceFilter, setResourceFilter] = useState('');

  const filtered = useMemo(()=> LOGS.filter(l => (!actionFilter || l.action === actionFilter) && (!resourceFilter || l.resource === resourceFilter)), [actionFilter, resourceFilter]);

  function exportCsv() {
    // Minimal mock export
    const header = 'id,timestamp,actor,action,resource,meta\n';
    const rows = filtered.slice(0,50).map(l => `${l.id},${new Date(l.ts).toISOString()},${l.actor},${l.action},${l.resource},${l.meta}`);
    const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'audit-export.csv'; a.click();
    URL.revokeObjectURL(url);
    // TODO(EXPORT): Replace with server-side generated export inclusive of full dataset & access controls
  }

  return (
    <div className="admin-audit-page">
      <header className="surface admin-head">
        <h1>Audit Logs</h1>
        <div className="row gap-sm wrap">
          <label className="small">Action
            <select value={actionFilter} onChange={e=>setActionFilter(e.target.value)}>
              <option value="">All</option>
              {ACTIONS.map(a => <option key={a}>{a}</option>)}
            </select>
          </label>
          <label className="small">Resource
            <select value={resourceFilter} onChange={e=>setResourceFilter(e.target.value)}>
              <option value="">All</option>
              <option>job</option>
              <option>user</option>
              <option>institution</option>
              <option>credential</option>
            </select>
          </label>
          <button className="btn-secondary" onClick={exportCsv}>Export</button>
        </div>
      </header>

      <div className="table-wrap" role="region" aria-label="Audit log table">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Resource</th>
              <th>Meta</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0,80).map(l => (
              <tr key={l.id}>
                <td>{new Date(l.ts).toLocaleString()}</td>
                <td>{l.actor}</td>
                <td>{l.action}</td>
                <td>{l.resource}</td>
                <td>{l.meta}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={5} className="empty">No logs match filters.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
