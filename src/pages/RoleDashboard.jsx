import React from 'react';
import Dashboard from './Dashboard.jsx';
import StudentDashboard from './StudentDashboard.jsx';
import Jobs from './Jobs.jsx';
import Candidates from './Candidates.jsx';
import Settings from './Settings.jsx';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const roleToComponent = {
  student: StudentDashboard,
  recruiter: Jobs,
  admin: Candidates
};

export default function RoleDashboard() {
  const { role } = useParams();
  const { user } = useAuth();
  if (!['student','recruiter','admin'].includes(role)) return <Navigate to={user ? `/dashboard/${user.role}` : '/login'} replace />;
  if (user && user.role !== role) return <Navigate to={`/dashboard/${user.role}`} replace />;
  const Component = roleToComponent[role] || Dashboard;
  return (
    <div className="col gap-lg">
      <div className="surface dash-header">
        <h1 className="dash-title">{role} Dashboard</h1>
        <span className="muted dash-sub">Role-based view</span>
      </div>
      <Component />
      {role === 'admin' && (
        <div className="surface">
          <h2>Admin Panel (Placeholder)</h2>
          <p className="muted">Future: manage roles, system metrics, bulk operations.</p>
        </div>
      )}
    </div>
  );
}
