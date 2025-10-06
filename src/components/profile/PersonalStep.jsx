import React from 'react';
import { useProfileBuilder } from '../../context/ProfileBuilderContext.jsx';

export default function PersonalStep() {
  const { data, updateSection } = useProfileBuilder();
  const p = data.personal;
  const handle = (field) => (e) => updateSection('personal', { ...p, [field]: e.target.value });
  return (
    <div className="grid" style={{gap:'1rem', maxWidth:620}}>
      <label className="field-group">
        <span>First Name <abbr title="Required" aria-label="Required">*</abbr></span>
        <input value={p.firstName} onChange={handle('firstName')} placeholder="Jane" />
      </label>
      <label className="field-group">
        <span>Last Name <abbr title="Required" aria-label="Required">*</abbr></span>
        <input value={p.lastName} onChange={handle('lastName')} placeholder="Doe" />
      </label>
      <label className="field-group">
        <span>Email <span className="muted fs-xs" title="Use institutional email if possible">(why?)</span></span>
        <input type="email" value={p.email} onChange={handle('email')} placeholder="you@university.edu" />
      </label>
      <label className="field-group">
        <span>Phone <span className="muted fs-xs" title="International format recommended">(info)</span></span>
        <input value={p.phone} onChange={handle('phone')} placeholder="(+1) 555-1234" />
      </label>
      <div className="muted fs-xs">Validation TODO: ensure required fields not empty.</div>
    </div>
  );
}
