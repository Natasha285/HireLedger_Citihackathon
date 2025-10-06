import React from 'react';
import { useProfileBuilder } from '../../context/ProfileBuilderContext.jsx';
import FileDrop from './FileDrop.jsx';

export default function CertificatesStep() {
  const { data, updateSection } = useProfileBuilder();
  const certs = data.certificates;
  const addFiles = (files) => updateSection('certificates', [...certs, ...files.map(f=>({ file:f }))]);
  const remove = (idx) => updateSection('certificates', certs.filter((_,i)=>i!==idx));
  return (
    <div className="col" style={{gap:'1rem', maxWidth:720}}>
      <FileDrop label="Upload Certificates (PDF/Image)" accept="pdf,.png,.jpg,.jpeg" multiple onFiles={addFiles} />
      <ul className="file-list">
        {certs.map((c,i)=>{
          const sizeKB = Math.round(c.file.size / 1024);
          return (
            <li key={i} className="file-row">
              <span>{c.file.name} <span className="muted">({sizeKB} KB)</span></span>
              <button type="button" className="btn btn-sm danger" onClick={()=>remove(i)}>Remove</button>
            </li>
          );
        })}
      </ul>
      <div className="muted fs-xs">Validation & size limits TODO</div>
    </div>
  );
}
