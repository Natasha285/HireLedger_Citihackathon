import React, { useState, useMemo } from 'react';
import '../styles/pages/StudentJobs.css';

/*
  Student Jobs & Application Manager Page
  ---------------------------------------
  Features (incrementally implemented):
  1. Sticky search + filter chip bar
  2. Job result grid/list hybrid with responsive cards
  3. Application manager tabs (All / Applied / Shortlisted / Rejected)
  4. Status badges + action dropdown per job (Apply / Withdraw / View / Save)
  5. Empty state messaging when no results in current filter
  6. Accessibility: proper roles for tablist, buttons, aria-pressed for chips, keyboard nav
  7. (Future) integration with API layer once backend is available
*/

// Static mock data (would be fetched from API in real implementation)
const JOBS = [
  { id: 'j1', title: 'Frontend Engineer Intern', company: 'TechNova', location: 'Remote', type: 'Internship', tags: ['React', 'UI', 'CSS'], status: 'applied', posted: '2d', description: 'Work on component library & design system.' },
  { id: 'j2', title: 'Backend Developer', company: 'DataForge', location: 'New York, NY', type: 'Full-time', tags: ['Node.js', 'API', 'SQL'], status: null, posted: '1d', description: 'Build scalable APIs & microservices.' },
  { id: 'j3', title: 'Data Analyst', company: 'InsightWorks', location: 'Austin, TX', type: 'Full-time', tags: ['Python', 'SQL', 'BI'], status: 'shortlisted', posted: '5d', description: 'Analyze product metrics & build dashboards.' },
  { id: 'j4', title: 'Mobile App Intern', company: 'Appify', location: 'Remote', type: 'Internship', tags: ['Flutter', 'Mobile'], status: 'rejected', posted: '3d', description: 'Assist in building cross-platform features.' },
  { id: 'j5', title: 'Full Stack Engineer', company: 'CloudCore', location: 'Remote', type: 'Full-time', tags: ['React', 'Node.js', 'AWS'], status: 'applied', posted: '7d', description: 'End-to-end feature ownership in agile team.' },
];

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'applied', label: 'Applied' },
  { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'rejected', label: 'Rejected' }
];

const FILTER_TAGS = ['React', 'Node.js', 'Python', 'SQL', 'UI', 'AWS', 'API', 'Flutter'];

function StatusBadge({ status }) {
  if (!status) return null;
  const colorMap = {
    applied: 'var(--accent-500)',
    shortlisted: 'var(--success-500, #16a34a)',
    rejected: 'var(--danger-500, #dc2626)'
  };
  return <span className="job-status-badge" style={{ '--badge-color': colorMap[status] }}>{status}</span>;
}

function Dropdown({ onAction }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown" onKeyDown={(e)=>{ if(e.key==='Escape') setOpen(false); }}>
      <button className="icon-btn" aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(o=>!o)} title="Actions">⋯</button>
      {open && (
        <ul className="menu" role="menu">
          {['View details','Apply','Save','Withdraw'].map(item => (
            <li key={item} role="menuitem">
              <button onClick={()=>{ onAction(item); setOpen(false); }}>{item}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function StudentJobs() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);

  const filtered = useMemo(()=>{
    return JOBS.filter(job => {
      if (activeTab !== 'all') {
        if (activeTab === 'applied' && job.status !== 'applied') return false;
        if (activeTab === 'shortlisted' && job.status !== 'shortlisted') return false;
        if (activeTab === 'rejected' && job.status !== 'rejected') return false;
      }
      if (query && !job.title.toLowerCase().includes(query.toLowerCase()) && !job.company.toLowerCase().includes(query.toLowerCase())) return false;
      if (activeFilters.length && !activeFilters.every(tag => job.tags.includes(tag))) return false;
      return true;
    });
  }, [query, activeTab, activeFilters]);

  function toggleFilter(tag) {
    setActiveFilters(f => f.includes(tag) ? f.filter(t=>t!==tag) : [...f, tag]);
  }

  return (
    <div className="jobs-page">
      <div className="jobs-header" role="search">
        <div className="search-row">
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={query}
            onChange={e=>setQuery(e.target.value)}
            aria-label="Search jobs"
          />
        </div>
        <div className="filter-chips" aria-label="Filter skills">
          {FILTER_TAGS.map(tag => (
            <button
              key={tag}
              className={"chip" + (activeFilters.includes(tag) ? ' chip-active' : '')}
              aria-pressed={activeFilters.includes(tag)}
              onClick={()=>toggleFilter(tag)}
            >{tag}</button>
          ))}
        </div>
        <div className="tabs" role="tablist" aria-label="Application status filters">
          {TABS.map(tab => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              className={"tab" + (activeTab === tab.key ? ' tab-active' : '')}
              onClick={()=>setActiveTab(tab.key)}
            >{tab.label}</button>
          ))}
        </div>
      </div>

      <div className="jobs-results" aria-live="polite">
        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No jobs match your current filters.</p>
            <button onClick={()=>{ setActiveFilters([]); setQuery(''); setActiveTab('all'); }}>Reset filters</button>
          </div>
        )}
        <ul className="job-grid" role="list">
          {filtered.map(job => (
            <li key={job.id} className="job-card" role="article" aria-label={job.title}>
              <div className="job-card-head">
                <h3 className="job-title">{job.title}</h3>
                <StatusBadge status={job.status} />
              </div>
              <p className="job-meta">{job.company} · {job.location} · {job.type} · <span className="posted">{job.posted} ago</span></p>
              <p className="job-desc">{job.description}</p>
              <div className="job-tags">
                {job.tags.map(t => <span key={t} className="tag-lite">{t}</span>)}
              </div>
              <div className="job-actions">
                <button className="btn-primary" onClick={()=>alert('Apply flow TODO')}>{job.status ? 'Update' : 'Apply'}</button>
                <Dropdown onAction={(act)=>alert(`${act} clicked (TODO)`)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
