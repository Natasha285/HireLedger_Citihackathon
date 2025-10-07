import React, { useState, useMemo } from 'react';
import '../styles/pages/AdminRoles.css';
import { AdminConsole } from '../components/layout/AdminConsole.jsx';

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

  const metrics = useMemo(() => {
    const pending = USERS.filter(u => u.pending).length;
    const recruiters = USERS.filter(u => u.role === 'recruiter').length;
    const students = USERS.filter(u => u.role === 'student').length;
    return [
      { label: 'Total Users', value: USERS.length, delta: '+12 new this month' },
      { label: 'Pending Approvals', value: pending, delta: 'Resolve within 24h', tone: pending > 0 ? 'alert' : undefined },
      { label: 'Active Recruiters', value: recruiters, delta: '+3 added this week', tone: 'success' },
      { label: 'Active Students', value: students, delta: '+9 onboarding' }
    ];
  }, []);

  const toolbar = (
    <>
      <label className="small">Filter Role
        <select value={filterRole} onChange={e=>{ setPage(1); setFilterRole(e.target.value); }}>
          <option value="">All</option>
          <option value="student">Students</option>
          <option value="recruiter">Recruiters</option>
        </select>
      </label>
      <button type="button" className="btn-secondary" onClick={()=>alert('Mock invite user')}>Invite User</button>
    </>
  );

  function approve(u) { alert('Mock approve ' + u.id); /* TODO(API) */ }
  function reject(u) { alert('Mock reject ' + u.id); /* TODO(API) */ }
  function assign(u, role) { alert(`Mock assign ${role} to ${u.id}`); /* TODO(API) */ }
  function revoke(u) { alert('Mock revoke roles for ' + u.id); /* TODO(API) */ }

  return (
    <AdminConsole
      title="Role Management"
      description="Assign permissions, approve access requests, and monitor critical changes across the talent marketplace."
      metrics={metrics}
      toolbar={toolbar}
    >
      <section className="admin-card" role="region" aria-label="User roles table">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(u => (
              <tr key={u.id} className={u.pending ? 'is-pending' : ''}>
                <td data-label="Name">
                  <div className="cell-primary">{u.name}</div>
                </td>
                <td data-label="Email">
                  <div className="cell-secondary">{u.email}</div>
                </td>
                <td data-label="Role">
                  <span className="badge badge-neutral">{u.role}</span>
                </td>
                <td data-label="Status">
                  {u.pending ? (
                    <span className="badge badge-warning">Pending {u.requestedRole}</span>
                  ) : (
                    <span className="badge badge-success">Active</span>
                  )}
                </td>
                <td data-label="Actions">
                  <div className="row gap-xs wrap">
                    {u.pending ? (
                      <>
                        <button className="btn-primary" onClick={()=>approve(u)}>Approve</button>
                        <button className="btn-ghost" onClick={()=>reject(u)}>Reject</button>
                      </>
                    ) : (
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
              <tr>
                <td colSpan={5} className="admin-empty">No users match filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <div className="admin-pagination" role="navigation" aria-label="Pagination">
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="btn-ghost">Prev</button>
        <span className="page-status">Page {page} / {totalPages || 1}</span>
        <button disabled={page===totalPages || totalPages===0} onClick={()=>setPage(p=>p+1)} className="btn-ghost">Next</button>
      </div>
    </AdminConsole>
  );
}
