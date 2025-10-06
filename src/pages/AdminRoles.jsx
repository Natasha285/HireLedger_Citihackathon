import React, { useState, useMemo } from 'react';

/*
  AdminRoles Page
  ----------------
  Role management table with pagination & inline actions (mock only).
  TODO(API): Fetch paginated users with roles & pending approvals.
  TODO(API): PATCH approve/reject user.
  TODO(API): POST/DELETE assign role / revoke role.
  TODO(SECURITY): Enforce RBAC on backend; audit all changes.
*/

const USERS = Array.from({ length: 47 }).map((_, i) => ({
  id: 'u' + (i + 1),
  name: 'User ' + (i + 1),
  email: `user${i+1}@example.com`,
  role: i % 5 === 0 ? 'recruiter' : 'student',
  pending: i % 11 === 0,
  requestedRole: i % 11 === 0 ? 'recruiter' : null
}));

const PAGE_SIZE = 10;

export default function AdminRoles() {
  const [page, setPage] = useState(1);
  const [filterRole, setFilterRole] = useState('');

  const filtered = useMemo(() => USERS.filter(u => !filterRole || u.role === filterRole || (u.pending && u.requestedRole === filterRole)), [filterRole]);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  function approve(u) { alert('Mock approve ' + u.id); /* TODO(API) */ }
  function reject(u) { alert('Mock reject ' + u.id); /* TODO(API) */ }
  function assign(u, role) { alert(`Mock assign ${role} to ${u.id}`); /* TODO(API) */ }
  function revoke(u) { alert('Mock revoke roles for ' + u.id); /* TODO(API) */ }

  return (
    <div className="admin-roles-page">
      <header className="surface admin-head">
        <h1>Role Management</h1>
        <div className="row gap-sm">
          <label className="small">Filter Role
            <select value={filterRole} onChange={e=>{ setPage(1); setFilterRole(e.target.value); }}>
              <option value="">All</option>
              <option value="student">Students</option>
              <option value="recruiter">Recruiters</option>
            </select>
          </label>
        </div>
      </header>

      <div className="table-wrap" role="region" aria-label="User roles table">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(u => (
              <tr key={u.id} className={u.pending ? 'pending' : ''}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.pending ? 'Pending ' + u.requestedRole : 'Active'}</td>
                <td>
                  <div className="row gap-xs wrap">
                    {u.pending && (
                      <>
                        <button className="btn-primary" onClick={()=>approve(u)}>Approve</button>
                        <button className="btn-ghost" onClick={()=>reject(u)}>Reject</button>
                      </>
                    )}
                    {!u.pending && (
                      <>
                        {u.role !== 'recruiter' && <button className="btn-secondary" onClick={()=>assign(u,'recruiter')}>Assign Recruiter</button>}
                        {u.role !== 'student' && <button className="btn-secondary" onClick={()=>assign(u,'student')}>Assign Student</button>}
                        <button className="btn-ghost" onClick={()=>revoke(u)}>Revoke</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr><td colSpan={5} className="empty">No users match filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination" role="navigation" aria-label="Pagination">
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="btn-ghost">Prev</button>
        <span className="page-status">Page {page} / {totalPages || 1}</span>
        <button disabled={page===totalPages || totalPages===0} onClick={()=>setPage(p=>p+1)} className="btn-ghost">Next</button>
      </div>
    </div>
  );
}
