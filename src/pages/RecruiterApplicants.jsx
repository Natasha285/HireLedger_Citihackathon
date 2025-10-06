import React, { useState, useMemo } from 'react';

/*
  RecruiterApplicants
  -------------------
  Applicant listing with filters and bulk messaging modal.
  TODO(API): Server-side filtering & pagination.
  TODO(SEARCH): Debounced search on name/email.
  TODO(PERF): Virtualize long lists.
  TODO(MESSAGING): Integrate rich text editor library (e.g., TipTap, Quill) and send endpoint.
*/

const APPLICANTS = Array.from({ length: 34 }).map((_, i) => ({
  id: 'a' + (i+1),
  name: 'Applicant ' + (i+1),
  college: ['Stanford','MIT','IIT Delhi','CMU','UCLA'][i % 5],
  location: ['NY','SF','Remote','Austin','Seattle'][i % 5],
  skills: ['React','SQL','Node','Python','Figma'].slice(0, (i % 5) + 1),
  status: ['Screening','Interview','Offer','Rejected'][i % 4]
}));

const PAGE_SIZE = 8;

const SKILL_FILTERS = ['React','Node','SQL','Python','Figma'];
const COLLEGES = ['Stanford','MIT','IIT Delhi','CMU','UCLA'];
const LOCATIONS = ['NY','SF','Remote','Austin','Seattle'];

export default function RecruiterApplicants() {
  const [page, setPage] = useState(1);
  const [skill, setSkill] = useState('');
  const [college, setCollege] = useState('');
  const [location, setLocation] = useState('');
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('<p>Hello candidates,</p><p>We will reach out shortly.</p>');

  const filtered = useMemo(() => {
    return APPLICANTS.filter(a => {
      if (skill && !a.skills.includes(skill)) return false;
      if (college && a.college !== college) return false;
      if (location && a.location !== location) return false;
      return true;
    });
  }, [skill, college, location]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  function toggleSelect(id) {
    setSelected(sel => sel.includes(id) ? sel.filter(x=>x!==id) : [...sel, id]);
  }
  function toggleAll() {
    const visibleIds = pageItems.map(a=>a.id);
    const allSelected = visibleIds.every(id => selected.includes(id));
    if (allSelected) setSelected(sel => sel.filter(id => !visibleIds.includes(id)));
    else setSelected(sel => Array.from(new Set([...sel, ...visibleIds])));
  }

  function openBulk() { if (selected.length) setShowModal(true); }
  function sendBulk() {
    // TODO(API): POST /messages bulk send
    alert('Mock send to ' + selected.length + ' applicants');
    setShowModal(false);
  }

  return (
    <div className="applicants-page">
      <header className="surface applicants-head">
        <h1>Applicants</h1>
        <p className="muted small">Filter and manage candidates (static data).</p>
      </header>

      <div className="filters-row">
        <div className="filter-group">
          <label>Skill
            <select value={skill} onChange={e=>{ setPage(1); setSkill(e.target.value); }}>
              <option value="">All</option>
              {SKILL_FILTERS.map(s=> <option key={s}>{s}</option>)}
            </select>
          </label>
          <label>College
            <select value={college} onChange={e=>{ setPage(1); setCollege(e.target.value); }}>
              <option value="">All</option>
              {COLLEGES.map(c=> <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>Location
            <select value={location} onChange={e=>{ setPage(1); setLocation(e.target.value); }}>
              <option value="">All</option>
              {LOCATIONS.map(l=> <option key={l}>{l}</option>)}
            </select>
          </label>
        </div>
        <div className="bulk-actions">
          <button className="btn-secondary" disabled={!selected.length} onClick={openBulk}>Bulk Message ({selected.length})</button>
        </div>
      </div>

      <div className="table-wrap" role="region" aria-label="Applicants table">
        <table className="app-table">
          <thead>
            <tr>
              <th><input type="checkbox" aria-label="Select all" onChange={toggleAll} checked={pageItems.length>0 && pageItems.every(i=>selected.includes(i.id))} /></th>
              <th>Name</th>
              <th>College</th>
              <th>Location</th>
              <th>Skills</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(a => (
              <tr key={a.id} className={selected.includes(a.id) ? 'row-selected' : ''}>
                <td><input type="checkbox" aria-label={'Select '+a.name} checked={selected.includes(a.id)} onChange={()=>toggleSelect(a.id)} /></td>
                <td>{a.name}</td>
                <td>{a.college}</td>
                <td>{a.location}</td>
                <td>{a.skills.join(', ')}</td>
                <td>{a.status}</td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="empty">No applicants match filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination" role="navigation" aria-label="Pagination">
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="btn-ghost">Prev</button>
        <span className="page-status">Page {page} / {totalPages || 1}</span>
        <button disabled={page===totalPages || totalPages===0} onClick={()=>setPage(p=>p+1)} className="btn-ghost">Next</button>
      </div>

      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Bulk messaging">
          <div className="modal">
            <header className="modal-head">
              <h2>Bulk Message ({selected.length})</h2>
              <button onClick={()=>setShowModal(false)} className="icon-btn" aria-label="Close">✕</button>
            </header>
            <div className="modal-body">
              <div
                className="rte-placeholder"
                contentEditable
                suppressContentEditableWarning
                onInput={e=>setMessage(e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: message }}
                aria-label="Message body"
              />
              <p className="muted small">Rich text editor placeholder. TODO: integrate real editor + template variables.</p>
            </div>
            <footer className="modal-foot">
              <button className="btn-primary" onClick={sendBulk}>Send</button>
              <button className="btn-ghost" onClick={()=>setShowModal(false)}>Cancel</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
