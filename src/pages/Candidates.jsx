import React from 'react';

export default function Candidates() {
  return (
    <div className="surface">
      <h1>Candidates</h1>
      <p className="muted">Search, filter & review applicants.</p>
      <div className="grid cols-2 candidate-grid">
        {[1,2,3,4].map(i => (
          <div key={i} className="surface candidate-card">
            <strong>Candidate {i}</strong>
            <p className="candidate-status">Status: Screening</p>
            <button className="primary open-profile">Open Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}
