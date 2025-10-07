import React, { useState, useMemo } from 'react';
import '../styles/pages/AdminApi.css';
import { AdminConsole } from '../components/layout/AdminConsole.jsx';

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

  const metrics = useMemo(() => ([
    { label: 'Active Integrations', value: 3, delta: 'All services responding', tone: 'success' },
    { label: 'API Keys', value: '2', delta: 'Rotate every 30 days' },
    { label: 'Last Rotation', value: '14 days ago', delta: 'Schedule upcoming rotation' },
    { label: 'Alerts', value: '0', delta: 'No incidents', tone: 'success' }
  ]), []);

  const toolbar = (
    <>
      <label className="small">Environment
        <select defaultValue="production">
          <option value="production">Production</option>
          <option value="staging">Staging</option>
          <option value="sandbox">Sandbox</option>
        </select>
      </label>
      <button type="button" className="btn-secondary" onClick={()=>alert('Mock connectivity test')}>Run Connectivity Test</button>
    </>
  );

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
    <AdminConsole
      title="API Integrations"
      description="Connect HireLedger to assessments, verification, and messaging platforms with secure rotation workflows."
      metrics={metrics}
      toolbar={toolbar}
    >
      <form onSubmit={save} className="api-form" aria-describedby="apiFormNotes">
        <p id="apiFormNotes" className="visually-hidden">This form is static for demo purposes.</p>

        <section className="admin-card">
          <header className="section-header">
            <h2>Endpoints</h2>
            <p>Define service hosts that power assessments, credential verification, and recruiter messaging.</p>
          </header>
          <div className="field-grid">
            <label className="field">Assessment Service URL
              <input value={form.assessmentEndpoint} onChange={e=>update('assessmentEndpoint', e.target.value)} />
            </label>
            <label className="field">Verification Service URL
              <input value={form.verificationEndpoint} onChange={e=>update('verificationEndpoint', e.target.value)} />
            </label>
            <label className="field">Messaging Service URL
              <input value={form.messagingEndpoint} onChange={e=>update('messagingEndpoint', e.target.value)} />
            </label>
          </div>
          <div className="section-foot">
            <button type="button" className="btn-ghost" onClick={()=>alert('Mock ping services')}>Ping Services</button>
          </div>
        </section>

        <section className="admin-card">
          <header className="section-header">
            <h2>Keys</h2>
            <p>Rotate sensitive credentials frequently and restrict usage with key-scoped permissions.</p>
          </header>
          <div className="field-grid">
            <label className="field">Public API Key
              <input value={form.publicApiKey} onChange={e=>update('publicApiKey', e.target.value)} />
            </label>
            <label className="field">Secret Key (masked)
              <input value={form.secretApiKey} onChange={e=>update('secretApiKey', e.target.value)} type="password" />
            </label>
          </div>
          <div className="section-foot">
            <button type="button" className="btn-secondary" onClick={rotateKey}>Rotate Key</button>
          </div>
        </section>

        <div className="form-footer">
          <button type="submit" className="btn-primary">Save Changes</button>
          {status && <span className={"status-msg "+status.type}>{status.msg}</span>}
        </div>
      </form>
    </AdminConsole>
  );
}
