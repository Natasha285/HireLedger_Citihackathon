import React, { useState, useMemo } from 'react';
import '../styles/pages/AdminInstitutions.css';
import { AdminConsole } from '../components/layout/AdminConsole.jsx';

/*
  AdminInstitutions Page
  ----------------------
  Verification management of institutions (mock only).
  TODO(API): Fetch institutions with status & metadata.
  TODO(API): Approve / reject institution.
  TODO(SEARCH): Search by name or domain.
*/

const INSTITUTIONS = Array.from({ length: 24 }).map((_, i) => ({
  id: 'inst' + (i+1),
  name: ['Tech University','Global Institute','Innovation College','Metro Campus','Central Academy'][i % 5] + ' ' + (i+1),
  domain: 'example' + (i+1) + '.edu',
  status: ['Pending','Verified','Rejected'][i % 3],
  contacts: (i % 2) + 1
}));

export default function AdminInstitutions() {
  const [status, setStatus] = useState('');
  const filtered = useMemo(()=> INSTITUTIONS.filter(i => !status || i.status === status), [status]);

  const metrics = useMemo(() => {
    const total = INSTITUTIONS.length;
    const pending = INSTITUTIONS.filter(i => i.status === 'Pending').length;
    const verified = INSTITUTIONS.filter(i => i.status === 'Verified').length;
    const rejected = INSTITUTIONS.filter(i => i.status === 'Rejected').length;
    return [
      { label: 'Institutions', value: total, delta: `${verified} verified` },
      { label: 'Pending Review', value: pending, delta: 'Prioritize today', tone: pending ? 'alert' : undefined },
      { label: 'Verified Partners', value: verified, delta: '+5 this month', tone: 'success' },
      { label: 'Rejected Cases', value: rejected, delta: 'Audit quarterly' }
    ];
  }, []);

  const toolbar = (
    <>
      <label className="small">Status
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">All</option>
          <option>Pending</option>
          <option>Verified</option>
          <option>Rejected</option>
        </select>
      </label>
      <button type="button" className="btn-secondary" onClick={()=>alert('Mock add institution')}>Add Institution</button>
    </>
  );

  function approve(inst) { alert('Mock approve ' + inst.id); /* TODO(API) */ }
  function reject(inst) { alert('Mock reject ' + inst.id); /* TODO(API) */ }

  return (
    <AdminConsole
      title="Institution Verification"
      description="Vet academic partners, monitor verification SLAs, and maintain trusted recruitment relationships."
      metrics={metrics}
      toolbar={toolbar}
    >
      <section className="admin-card" aria-label="Institutions list">
        <div className="inst-grid">
          {filtered.map(inst => (
            <article key={inst.id} className="inst-card" role="group" aria-label={inst.name}>
              <div className="inst-head-row">
                <h2 className="inst-name">{inst.name}</h2>
                <span className={`badge ${statusBadge(inst.status)}`}>{inst.status}</span>
              </div>
              <p className="inst-domain">{inst.domain}</p>
              <div className="inst-meta">
                <span><strong>{inst.contacts}</strong> primary contacts</span>
              </div>
              <div className="inst-actions">
                {inst.status === 'Pending' && (
                  <>
                    <button className="btn-primary" onClick={()=>approve(inst)}>Approve</button>
                    <button className="btn-ghost" onClick={()=>reject(inst)}>Reject</button>
                  </>
                )}
                {inst.status === 'Verified' && <button className="btn-secondary" onClick={()=>alert('Mock revoke '+inst.id)}>Revoke</button>}
                {inst.status === 'Rejected' && <button className="btn-secondary" onClick={()=>alert('Mock reopen '+inst.id)}>Reopen</button>}
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="admin-empty">No institutions match filter.</div>
          )}
        </div>
      </section>
    </AdminConsole>
  );
}

function statusBadge(status) {
  if (status === 'Verified') return 'badge-success';
  if (status === 'Rejected') return 'badge-danger';
  return 'badge-warning';
}
