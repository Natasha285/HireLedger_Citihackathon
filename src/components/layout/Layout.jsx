import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Sidebar } from './Sidebar.jsx';

export function Layout({ children, onToggleTheme, theme }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <div className={[ 'layout-root', collapsed ? 'sidebar-collapsed' : '', mobileOpen ? 'sidebar-mobile-open' : '' ].join(' ')}>
      <Navbar
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={collapsed}
        onToggleTheme={onToggleTheme}
        theme={theme}
      />
      <Sidebar collapsed={collapsed} onNavigate={closeMobile} />
      {mobileOpen && <div onClick={closeMobile} aria-hidden className="sidebar-overlay" />}
      <main id="main" className="main" role="main" tabIndex={-1}>
        {content}
      </main>
    </div>
  );
}
