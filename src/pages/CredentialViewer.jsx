import React from 'react';

/*
  CredentialViewer Page
  ---------------------
  Displays list of certificates / credentials with status badges.
  Notes / Future Integrations:
    - TODO(API): Fetch user credential list with pagination
    - TODO(BLOCKCHAIN): Each credential may include on-chain transaction hash; provide verification link
    - TODO(API): Endpoint to refresh verification status (re-query issuing authority / blockchain)
    - TODO(UX): Add filters (Verified, Pending, Expired), search bar
    - TODO(SECURITY): Signed download URLs for certificate PDFs
*/

const CREDS = [
  { id: 'c1', name: 'JavaScript Fundamentals Assessment', issuer: 'HireLedger', issueDate: '2025-09-12', status: 'Verified', hash: '0xabc123...def' },
  { id: 'c2', name: 'Data Structures Quiz', issuer: 'HireLedger', issueDate: '2025-08-03', status: 'Pending', hash: null },
  { id: 'c3', name: 'SQL Mastery Badge', issuer: 'HireLedger', issueDate: '2025-07-21', status: 'Verified', hash: '0x9e88ff...34b' },
  { id: 'c4', name: 'Frontend Performance Evaluation', issuer: 'HireLedger', issueDate: '2025-06-30', status: 'Verified', hash: '0x44ad88...91e' },
];

function Status({ status }) {
  const color = status === 'Verified' ? 'var(--success-500, #16a34a)' : 'var(--warn-500, #d97706)';
  return <span className="cred-badge" style={{ '--cred-color': color }}>{status}</span>;
}

export default function CredentialViewer() {
  return (
    <div className="credential-page">
      <header className="cred-head">
        <h1>Credentials</h1>
        <p className="sub">Your verified achievements & assessments.</p>
      </header>
      <div className="cred-table-wrap" role="region" aria-label="Credential list">
        <table className="cred-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Issuer</th>
              <th scope="col">Issued</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {CREDS.map(c => (
              <tr key={c.id}>
                <td data-label="Name">{c.name}</td>
                <td data-label="Issuer">{c.issuer}</td>
                <td data-label="Issued">{c.issueDate}</td>
                <td data-label="Status"><Status status={c.status} /></td>
                <td data-label="Action">
                  <div className="cred-actions">
                    {c.hash && <button className="btn-ghost" onClick={()=>alert('TODO: open blockchain explorer '+c.hash)}>Verify</button>}
                    <button className="btn-secondary" onClick={()=>alert('TODO: download credential PDF')}>Download</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {CREDS.length === 0 && (
          <div className="empty-state">
            <p>No credentials yet.</p>
            <button className="btn-primary" onClick={()=>alert('Take an assessment first!')}>Take Assessment</button>
          </div>
        )}
      </div>
    </div>
  );
}
