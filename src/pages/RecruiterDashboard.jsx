import React from 'react';
import '../styles/pages/RecruiterDashboard.css';

/*
  RecruiterDashboard
  ------------------
  KPI overview for recruiter performance.
  TODO(API): Replace static metrics with aggregated backend analytics.
  TODO(ANALYTICS): Track interaction (view filters, date range selection, exports).
*/

const metrics = [
  { key: 'activeJobs', label: 'Active Jobs', value: 7, delta: '+2 this week' },
  { key: 'applicants', label: 'Applicants', value: 142, delta: '+18' },
  { key: 'conversion', label: 'Interview Rate', value: '32%', delta: '+4%' },
  { key: 'offers', label: 'Offers Extended', value: 12, delta: '+3' }
];

export default function RecruiterDashboard() {
  return (
    <div className="recruiter-dashboard">
      <header className="surface dash-head">
        <h1>Recruiter Dashboard</h1>
        <p className="muted small">High-level overview (static mock data)</p>
      </header>
      <section className="recruiter-dashboard" aria-label="Key performance indicators">
        {metrics.map(m => (
          <div key={m.key} className="recruiter-kpi-card" role="group" aria-label={m.label}>
            <h3>{m.label}</h3>
            <div className="recruiter-kpi-metric">{m.value}</div>
            <div className="recruiter-kpi-trend">{m.delta}</div>
          </div>
        ))}
      </section>
      <section className="surface kpi-notes">
        <h2 className="h-sm">Insights (Coming Soon)</h2>
        <ul className="muted list-tight">
          <li>Trend charts for funnel conversion</li>
          <li>Campus performance comparisons</li>
          <li>Time-to-fill velocity metrics</li>
        </ul>
      </section>
    </div>
  );
}
