import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

/*
  Settings Page Enhancements
  -------------------------
  TODO(API): Persist profile & notification preferences.
  TODO(SECURITY): Validate email / input sanitation server-side.
  TODO(PREFERENCES): Add timezone & language options.
*/

export default function Settings() {
  const { user, logout } = useAuth();
  const { push } = useToast();
  const [email, setEmail] = useState(user?.email || '');
  const [digest, setDigest] = useState(true);
  const [alerts, setAlerts] = useState(true);

  function save() {
    // TODO(API): PATCH /user/preferences
    push('Preferences saved', { type: 'success' });
  }

  return (
    <div className="surface settings-page">
      <h1>Settings</h1>
      <form aria-label="Preferences" className="settings-form" onSubmit={e=>{ e.preventDefault(); save(); }}>
        <fieldset className="set-section">
          <legend className="set-legend">Profile</legend>
          <label className="settings-field">Email
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>
        </fieldset>
        <fieldset className="set-section">
          <legend className="set-legend">Notifications</legend>
          <label className="settings-inline">
            <input type="checkbox" checked={digest} onChange={e=>setDigest(e.target.checked)} />
            <span>Weekly summary digest</span>
          </label>
          <label className="settings-inline">
            <input type="checkbox" checked={alerts} onChange={e=>setAlerts(e.target.checked)} />
            <span>Important event alerts</span>
          </label>
        </fieldset>
        <div className="row gap-sm wrap">
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" className="btn-ghost" onClick={()=>logout()}>Logout</button>
        </div>
      </form>
    </div>
  );
}
