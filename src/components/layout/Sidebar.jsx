import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function buildNav(role) {
  if (role === 'student') {
    return [
      { to: '/dashboard/student', label: 'Dashboard', icon: '🎓' },
      { to: '/profile/builder', label: 'Profile Builder', icon: '🛠️' },
      { to: '/student/jobs', label: 'Jobs', icon: '💼' },
      { to: '/student/assessments', label: 'Assessments', icon: '🧪' },
      { to: '/student/credentials', label: 'Credentials', icon: '📜' },
      { to: '/settings', label: 'Settings', icon: '⚙️' }
    ];
  }
  if (role === 'recruiter') {
    return [
      { to: '/recruiter/dashboard', label: 'Dashboard', icon: '📊' },
      { to: '/recruiter/jobs/new', label: 'Post Job', icon: '📝' },
      { to: '/recruiter/interviews', label: 'Interviews', icon: '🗓️' },
      { to: '/recruiter/analytics', label: 'Analytics', icon: '📈' },
      { to: '/recruiter/applicants', label: 'Applicants', icon: '👥' },
      { to: '/settings', label: 'Settings', icon: '⚙️' }
    ];
  }
  if (role === 'admin') {
    return [
      { to: '/dashboard/admin', label: 'Dashboard', icon: '📊' },
      { to: '/admin/roles', label: 'Roles', icon: '🧩' },
      { to: '/admin/institutions', label: 'Institutions', icon: '🏛️' },
      { to: '/admin/audit', label: 'Audit Logs', icon: '🗂️' },
  { to: '/admin/api', label: 'API', icon: '🔌' },
      { to: '/settings', label: 'Settings', icon: '⚙️' }
    ];
  }
  return [ { to: '/', label: 'Home', icon: '🏠' } ];
}

export function Sidebar({ collapsed, onNavigate }) {
  const { user } = useAuth();
  const navItems = useMemo(()=> buildNav(user?.role), [user?.role]);
  return (
    <nav className={['sidebar', collapsed ? 'collapsed' : ''].join(' ')} aria-label="Main navigation">
      <ul className="sidebar-nav">
        {navItems.map(item => (
          <li key={item.to}>
            <NavLink
              onClick={onNavigate}
              to={item.to}
              end={/\/dashboard\//.test(item.to) || item.to === '/'}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) => 'sidebar-link sidebar-item' + (isActive ? ' active' : '')}
            >
              <span aria-hidden className="icon fs-base">{item.icon}</span>
              <span className="label ellipsis">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto fs-xs opacity-75 pad-footer ls-05">
        v0.1.0
      </div>
    </nav>
  );
}
