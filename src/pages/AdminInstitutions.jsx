import React, { useState, useMemo } from 'react';

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

  function approve(inst) { alert('Mock approve ' + inst.id); /* TODO(API) */ }
  function reject(inst) { alert('Mock reject ' + inst.id); /* TODO(API) */ }

  return (
    <div className="admin-inst-page">
      <header className="surface admin-head">
        <h1>Institution Verification</h1>
        <div className="row gap-sm">
          <label className="small">Status
            <select value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="">All</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Rejected</option>
            </select>
          </label>
        </div>
      </header>

      <div className="inst-grid" aria-label="Institutions list">
        {filtered.map(inst => (
          <div key={inst.id} className="inst-card surface" role="group" aria-label={inst.name}>
            <div className="inst-head-row">
              <h2 className="inst-name">{inst.name}</h2>
              <span className={"inst-status badge-"+inst.status.toLowerCase()}>{inst.status}</span>
            </div>
            <p className="muted small domain">{inst.domain}</p>
            <p className="meta small">Contacts: {inst.contacts}</p>
            <div className="row gap-xs wrap mt-sm">
              {inst.status === 'Pending' && (
                <>
                  <button className="btn-primary" onClick={()=>approve(inst)}>Approve</button>
                  <button className="btn-ghost" onClick={()=>reject(inst)}>Reject</button>
                </>
              )}
              {inst.status === 'Verified' && <button className="btn-secondary" onClick={()=>alert('Mock revoke '+inst.id)}>Revoke</button>}
              {inst.status === 'Rejected' && <button className="btn-secondary" onClick={()=>alert('Mock reopen '+inst.id)}>Reopen</button>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No institutions match filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
