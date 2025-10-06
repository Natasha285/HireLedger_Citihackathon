import React from 'react';

export default function Dashboard() {
  return (
    <div className="grid cols-3">
      <section className="surface" aria-labelledby="metrics-heading">
        <h2 id="metrics-heading">Metrics</h2>
        <p className="muted">Key hiring KPIs will appear here.</p>
      </section>
      <section className="surface" aria-labelledby="pipeline-heading">
        <h2 id="pipeline-heading">Pipeline</h2>
        <p className="muted">Candidate stages overview.</p>
      </section>
      <section className="surface" aria-labelledby="tasks-heading">
        <h2 id="tasks-heading">Tasks</h2>
        <p className="muted">Action items & reminders.</p>
      </section>
    </div>
  );
}
