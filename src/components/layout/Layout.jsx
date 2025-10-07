import React, { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Sidebar } from './Sidebar.jsx';

export function Layout({ children, onToggleTheme, theme }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const recruiterThemeActive = useMemo(() => location.pathname.startsWith('/recruiter/'), [location.pathname]);
  const adminThemeActive = useMemo(
    () => location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard/admin'),
    [location.pathname]
  );
  const toggleSidebar = () => {
    // On desktop toggle collapse, on mobile toggle open
    if (window.matchMedia('(max-width: 960px)').matches) {
      setMobileOpen(o => !o);
    } else {
      setCollapsed(c => !c);
    }
  };
  const closeMobile = () => setMobileOpen(false);
  const content = children ? children : <Outlet />;
  const layoutClassName = [
    'layout-root',
    collapsed ? 'sidebar-collapsed' : '',
    mobileOpen ? 'sidebar-mobile-open' : '',
    recruiterThemeActive ? 'recruiter-theme' : '',
    adminThemeActive ? 'admin-theme' : ''
  ].filter(Boolean).join(' ');
  const mainClassName = [
    'main',
    recruiterThemeActive ? 'recruiter-theme-main' : '',
    adminThemeActive ? 'admin-theme-main' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={layoutClassName}>
      <Navbar
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={collapsed}
        onToggleTheme={onToggleTheme}
        theme={theme}
      />
      <Sidebar collapsed={collapsed} onNavigate={closeMobile} />
      {mobileOpen && <div onClick={closeMobile} aria-hidden className="sidebar-overlay" />}
      <main id="main" className={mainClassName} role="main" tabIndex={-1}>
        {content}
      </main>
    </div>
  );
}
