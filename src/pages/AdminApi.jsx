import React, { useState } from 'react';
import '../styles/pages/AdminApi.css';

/*
  AdminApi Page
  -------------
  Manage integration endpoints & API keys (mock only).
  TODO(API): Securely fetch & update integration configs.
  TODO(SECURITY): Keys should be encrypted at rest and masked in UI.
  TODO(AUDIT): Log changes to integrations & rotations.
  TODO(ROTATION): Add rotate key workflow with confirmation and grace deactivation.
*/

const INITIAL = {
  assessmentEndpoint: 'https://api.example.com/assessments',
  verificationEndpoint: 'https://chain.example.com/verify',
  messagingEndpoint: 'https://api.example.com/messaging',
  publicApiKey: 'pub_demo_123456',
  secretApiKey: 'sec_demo_*****'
};

export default function AdminApi() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState(null);

  function update(key, value) { setForm(f => ({ ...f, [key]: value })); }
  function save(e) {
    e.preventDefault();
    // TODO(API): PATCH /admin/integrations
    setStatus({ type: 'success', msg: 'Settings saved (mock).' });
  }

  function rotateKey() {
    // TODO(ROTATION): Request new key from backend & show only partial
    alert('Mock rotate key');
  }

  return (
    <div className="admin-api-page">
      <header className="surface admin-head">
        <h1>API Integrations</h1>
        <p className="muted small">Configure endpoints and keys (static).</p>
      </header>
      <form onSubmit={save} className="api-form">
        <section className="form-section">
          <h2 className="sec-title">Endpoints</h2>
          <label className="field">Assessment Service URL
            <input value={form.assessmentEndpoint} onChange={e=>update('assessmentEndpoint', e.target.value)} />
          </label>
          <label className="field">Verification Service URL
            <input value={form.verificationEndpoint} onChange={e=>update('verificationEndpoint', e.target.value)} />
          </label>
          <label className="field">Messaging Service URL
            <input value={form.messagingEndpoint} onChange={e=>update('messagingEndpoint', e.target.value)} />
          </label>
        </section>

        <section className="form-section">
          <h2 className="sec-title">Keys</h2>
          <label className="field">Public API Key
            <input value={form.publicApiKey} onChange={e=>update('publicApiKey', e.target.value)} />
          </label>
          <label className="field">Secret Key (masked)
            <input value={form.secretApiKey} onChange={e=>update('secretApiKey', e.target.value)} type="password" />
          </label>
          <button type="button" className="btn-secondary" onClick={rotateKey}>Rotate Key</button>
        </section>

        <div className="form-footer row gap-sm">
          <button type="submit" className="btn-primary">Save</button>
          {status && <span className={"status-msg "+status.type}>{status.msg}</span>}
        </div>
      </form>
    </div>
  );
}
