import React from 'react';
import { useProfileBuilder } from '../../context/ProfileBuilderContext.jsx';

export default function ReviewStep() {
  const { data, goTo, steps } = useProfileBuilder();
  const sectionLink = (name) => <button className="link-btn" type="button" onClick={()=>goTo(steps.indexOf(name))}>Edit</button>;
  return (
    <div className="col" style={{gap:'1.25rem'}}>
      <div className="surface" style={{padding:'1rem'}}>
        <h3 className="mt-0">Personal {sectionLink('personal')}</h3>
        <p className="fs-sm">{data.personal.firstName} {data.personal.lastName}<br />{data.personal.email}<br />{data.personal.phone}</p>
      </div>
      <div className="surface" style={{padding:'1rem'}}>
        <h3 className="mt-0">Education {sectionLink('education')}</h3>
        <ul className="fs-sm" style={{margin:0,paddingLeft:'1.1rem'}}>
          {data.education.map((e,i)=>(<li key={i}>{e.degree} @ {e.school} ({e.start}-{e.end}) GPA {e.gpa}</li>))}
        </ul>
      </div>
      <div className="surface" style={{padding:'1rem'}}>
        <h3 className="mt-0">Skills {sectionLink('skills')}</h3>
        <p className="fs-sm"><strong>Core:</strong> {data.skills.core.join(', ')||'—'}</p>
        <p className="fs-sm"><strong>Tools:</strong> {data.skills.tools.join(', ')||'—'}</p>
        <p className="fs-sm"><strong>Languages:</strong> {data.skills.languages.join(', ')||'—'}</p>
      </div>
      <div className="surface" style={{padding:'1rem'}}>
        <h3 className="mt-0">Projects {sectionLink('projects')}</h3>
        <ul className="fs-sm" style={{margin:0,paddingLeft:'1.1rem'}}>
          {data.projects.map((p,i)=>(<li key={i}>{p.name} – {p.link || 'no link'}<br /><span className="muted">{p.description}</span></li>))}
        </ul>
      </div>
      <div className="surface" style={{padding:'1rem'}}>
        <h3 className="mt-0">Resume {sectionLink('resume')}</h3>
        <p className="fs-sm">{data.resume.file ? data.resume.file.name : 'No file uploaded'}</p>
      </div>
      <div className="surface" style={{padding:'1rem'}}>
        <h3 className="mt-0">Certificates {sectionLink('certificates')}</h3>
        <ul className="fs-sm" style={{margin:0,paddingLeft:'1.1rem'}}>
          {data.certificates.map((c,i)=>(<li key={i}>{c.file.name}</li>))}
        </ul>
      </div>
      <div className="muted fs-xs">Submit placeholder will send consolidated payload. (TODO integrate API)</div>
    </div>
  );
}
