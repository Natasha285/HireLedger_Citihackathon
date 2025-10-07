import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icon } from '../ui/Icon.jsx';

const NAV_LINKS = [
  { to: '/admin/roles', label: 'Roles & Users', icon: '👥' },
  { to: '/admin/institutions', label: 'Institutions', icon: '🏛️' },
  { to: '/admin/audit', label: 'Audit Logs', icon: '🗒️' },
  { to: '/admin/api', label: 'API & Integrations', icon: '🔌' }
];

const TAB_LINKS = [
  { to: '/admin/roles', label: 'Manage Students' },
  { to: '/admin/institutions', label: 'Manage Recruiters' },
  { to: '/admin/audit', label: 'Reports' },
  { to: '/admin/api', label: 'System Settings' }
];

export function AdminConsole({
  title,
  description,
  metrics = [],
  toolbar,
  children
}) {
  const location = useLocation();
  return (
    <div className="admin-console">
      <aside className="admin-console__sidebar" aria-label="Admin navigation">
        <div className="admin-console__brand">
          <div className="avatar" aria-hidden>HQ</div>
          <div>
            <h2 className="visually-hidden">HireLedger Admin Portal</h2>
            <span className="admin-console__badge">Control Center</span>
          </div>
        </div>

        <nav className="admin-console__nav">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 'admin-console__nav-link' + (isActive ? ' active' : '')}
            >
              <Icon size={18} label={link.label}>{link.icon}</Icon>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-console__nav-footer">
          <span>Reliable analytics. Granular access control.</span>
          <span>Need help? Reach out to support@hireledger.io</span>
        </div>
      </aside>

      <div className="admin-console__main">
        <header className="admin-console__topbar">
          <div className="admin-console__headline">
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </div>
          <div className="admin-console__user" aria-label="Admin controls">
            <div className="avatar" aria-hidden>AA</div>
            <div className="user-info">
              <strong>Alex Admin</strong>
              <span>Global Administrator</span>
            </div>
            <div className="admin-console__user-actions">
              <button type="button">Settings</button>
              <button type="button" className="danger">Logout</button>
            </div>
          </div>
        </header>

        <div className="admin-console__tabstrip" role="tablist" aria-label="Admin sections">
          {TAB_LINKS.map(tab => {
            const isActive = location.pathname === tab.to;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                role="tab"
                aria-selected={isActive}
                className={'admin-console__tab' + (isActive ? ' active' : '')}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {metrics.length > 0 && (
          <section className="admin-console__metrics" aria-label="Key metrics">
            {metrics.map(metric => (
              <article
                key={metric.label}
                className={'metric-card' + (metric.tone ? ` metric-${metric.tone}` : '')}
              >
                <h3>{metric.label}</h3>
                <div className="value">{metric.value}</div>
                {metric.delta && <div className="delta">{metric.delta}</div>}
              </article>
            ))}
          </section>
        )}

        {toolbar && <div className="admin-console__toolbar">{toolbar}</div>}

        <div className="admin-console__content">
          {children}
        </div>
      </div>
    </div>
  );
}
