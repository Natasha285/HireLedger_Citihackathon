import React from 'react';
import { useProfileBuilder } from '../../context/ProfileBuilderContext.jsx';

export default function EducationStep() {
  const { data, updateSection } = useProfileBuilder();
  const list = data.education;
  const updateItem = (idx, patch) => {
    const next = list.map((it,i)=> i===idx ? { ...it, ...patch } : it);
    updateSection('education', next);
  };
  const add = () => updateSection('education', [...list, { school:'', degree:'', start:'', end:'', gpa:'' }]);
  const remove = (idx) => updateSection('education', list.filter((_,i)=>i!==idx));
  return (
    <div className="col" style={{gap:'1rem'}}>
      {list.map((ed,i)=>(
        <div key={i} className="surface" style={{padding:'1rem', display:'grid', gap:'.75rem'}}>
          <div className="grid cols-2" style={{gap:'.75rem'}}>
            <label className="field-group"><span>School</span><input value={ed.school} onChange={e=>updateItem(i,{school:e.target.value})} /></label>
            <label className="field-group"><span>Degree</span><input value={ed.degree} onChange={e=>updateItem(i,{degree:e.target.value})} /></label>
          </div>
          <div className="grid cols-3" style={{gap:'.75rem'}}>
            <label className="field-group"><span>Start</span><input value={ed.start} onChange={e=>updateItem(i,{start:e.target.value})} placeholder="2022" /></label>
            <label className="field-group"><span>End</span><input value={ed.end} onChange={e=>updateItem(i,{end:e.target.value})} placeholder="2026" /></label>
            <label className="field-group"><span>GPA</span><input value={ed.gpa} onChange={e=>updateItem(i,{gpa:e.target.value})} placeholder="3.8" /></label>
          </div>
          <div className="actions-row">
            {list.length>1 && <button type="button" className="btn danger btn-sm" onClick={()=>remove(i)}>Remove</button>}
          </div>
        </div>
      ))}
      <button type="button" className="btn ghost" onClick={add}>Add Education</button>
      <div className="muted fs-xs">Validation TODO</div>
    </div>
  );
}
