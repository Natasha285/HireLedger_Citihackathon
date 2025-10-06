import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/*
  Global Search Context (Mock)
  ---------------------------
  Provides overlay search with Ctrl+K.
  TODO(API): Replace mock index with backend search endpoint.
  TODO(PERF): Debounce & caching of previous queries.
  TODO(ANALYTICS): Track search patterns for feature prioritization.
*/

const SearchCtx = createContext(null);

const MOCK_INDEX = [
  { id: 'job:1', title: 'Frontend Engineer Intern', path: '/student/jobs' },
  { id: 'job:2', title: 'Data Analyst', path: '/student/jobs' },
  { id: 'page:profile', title: 'Profile Builder', path: '/profile/builder' },
  { id: 'page:assess', title: 'Assessments', path: '/student/assessments' },
  { id: 'page:cred', title: 'Credentials', path: '/student/credentials' },
  { id: 'page:recruiter:post', title: 'Post Job', path: '/recruiter/jobs/new' },
  { id: 'page:recruiter:apps', title: 'Applicants', path: '/recruiter/applicants' },
  { id: 'page:admin:roles', title: 'Admin Roles', path: '/admin/roles' }
];

export function SearchProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(0);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    function handler(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === 'Escape') {
        setOpen(false); setQuery(''); setActive(0);
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(()=> {
    if (!query) { setResults([]); return; }
    const q = query.toLowerCase();
    setResults(MOCK_INDEX.filter(item => item.title.toLowerCase().includes(q)));
  }, [query]);

  const value = {
    open, setOpen, query, setQuery, results, active, setActive
  };

  return (
    <SearchCtx.Provider value={value}>
      {children}
      {open && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Global search">
          <div className="search-panel">
            <input
              autoFocus
              className="search-input"
              placeholder="Search pages & jobs..."
              value={query}
              onChange={e=>{ setQuery(e.target.value); setActive(0); }}
              aria-label="Search query"
            />
            <ul className="search-results" role="listbox" aria-label="Search results">
              {results.map((r,i) => (
                <li key={r.id} className={"search-item" + (i===active ? ' active' : '')} role="option" aria-selected={i===active}>
                  <a href={r.path}>{r.title}</a>
                </li>
              ))}
              {query && results.length === 0 && (
                <li className="empty" aria-live="polite">No matches</li>
              )}
            </ul>
            <div className="search-hint">Esc to close • Enter opens link (native)</div>
          </div>
        </div>
      )}
    </SearchCtx.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchCtx);
  if (!ctx) throw new Error('useSearch must be used inside SearchProvider');
  return ctx;
}
