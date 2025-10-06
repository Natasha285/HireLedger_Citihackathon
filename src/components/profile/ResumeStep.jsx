import React from 'react';
import { useProfileBuilder } from '../../context/ProfileBuilderContext.jsx';
import FileDrop from './FileDrop.jsx';

export default function ResumeStep() {
  const { data, updateSection } = useProfileBuilder();
  const resume = data.resume;
  return (
    <div className="col" style={{gap:'1rem', maxWidth:600}}>
      <FileDrop label="Upload Resume (PDF)" accept="pdf" multiple={false} onFiles={(files)=>updateSection('resume', { file: files[0] || null })} />
      {resume.file && (()=>{ const sizeKB = Math.round(resume.file.size / 1024); return (
        <div className="surface" style={{padding:'.75rem 1rem', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <span className="fs-sm">{resume.file.name} <span className="muted">({sizeKB} KB)</span></span>
          <button type="button" className="btn btn-sm" onClick={()=>updateSection('resume', { file:null })}>Remove</button>
        </div>
      ); })()}
      <div className="muted fs-xs">Backend upload TODO</div>
    </div>
  );
}
