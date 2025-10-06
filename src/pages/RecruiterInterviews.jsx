import React, { useState } from 'react';

/*
  RecruiterInterviews
  -------------------
  Calendar UI (mock) with week/month toggle, draggable interview slots, and invite modal.
  NOTE: True drag and drop libraries (e.g., dnd-kit) not integrated; using basic pointer handlers for placeholder.
  TODO(API): Fetch interviews for date range.
  TODO(API): Persist created/updated interview slot.
  TODO(INVITES): Trigger email/calendar invites (ICS generation) on confirmation.
  TODO(TIMEZONES): Normalize to recruiter timezone; show candidate local time tooltip.
  TODO(REALTIME): Subscribe to updates via WebSocket for collaborative scheduling.
*/

const MOCK_INTERVIEWS = [
  { id: 'i1', title: 'Frontend Screen', day: 2, start: '10:00', end: '10:45', candidate: 'Applicant 5' },
  { id: 'i2', title: 'Data Round', day: 3, start: '14:00', end: '15:00', candidate: 'Applicant 11' },
  { id: 'i3', title: 'HR Intro', day: 4, start: '09:30', end: '10:00', candidate: 'Applicant 2' }
];

const DAYS = ['Mon','Tue','Wed','Thu','Fri'];

export default function RecruiterInterviews() {
  const [view, setView] = useState('week'); // 'week' | 'month' (month = placeholder grid)
  const [slots, setSlots] = useState(MOCK_INTERVIEWS);
  const [draggingId, setDraggingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newSlot, setNewSlot] = useState({ title: '', candidate: '', day: 1, start: '09:00', end: '09:30' });

  function onDragStart(id) { setDraggingId(id); }
  function onDragEnd(day) {
    if (!draggingId) return;
    setSlots(s => s.map(sl => sl.id === draggingId ? { ...sl, day } : sl));
    setDraggingId(null);
  }

  function createSlot(e) {
    e.preventDefault();
    const id = 'i' + (slots.length + 1);
    setSlots(s => [...s, { id, ...newSlot }]);
    setShowModal(false);
    // TODO(API): POST /interviews
  }

  return (
    <div className="interviews-page">
      <header className="surface inter-head">
        <h1>Interview Scheduler</h1>
        <div className="row gap-sm">
          <div className="view-toggle" role="tablist" aria-label="Calendar view switch">
            {['week','month'].map(v => (
              <button key={v} role="tab" aria-selected={view===v} className={"toggle-btn" + (view===v ? ' active' : '')} onClick={()=>setView(v)}>{v}</button>
            ))}
          </div>
          <button className="btn-primary" onClick={()=>setShowModal(true)}>New Interview</button>
        </div>
      </header>

      {view === 'week' && (
        <div className="calendar-grid" role="grid" aria-label="Week schedule">
          <div className="cal-head" role="row">
            <div className="time-col" />
            {DAYS.map((d,i) => <div key={d} role="columnheader" className="day-head" onDragOver={e=>e.preventDefault()} onDrop={()=>onDragEnd(i+1)}>{d}</div>)}
          </div>
          <div className="cal-body">
            {slots.map(slot => (
              <div
                key={slot.id}
                className={"slot" + (draggingId===slot.id ? ' dragging' : '')}
                draggable
                aria-grabbed={draggingId===slot.id}
                onDragStart={()=>onDragStart(slot.id)}
                onDragEnd={()=>setDraggingId(null)}
                style={{ gridColumn: slot.day + 1 }}
                title={slot.candidate}
              >
                <strong>{slot.title}</strong>
                <span className="slot-time">{slot.start} - {slot.end}</span>
                <span className="slot-cand">{slot.candidate}</span>
              </div>
            ))}
            {/* Drop zones (visual columns) */}
            {DAYS.map((_,i)=>(
              <div key={i} className="drop-col" onDragOver={e=>e.preventDefault()} onDrop={()=>onDragEnd(i+1)} aria-hidden />
            ))}
          </div>
        </div>
      )}

      {view === 'month' && (
        <div className="month-placeholder surface">
          <p className="muted small">Month view placeholder. TODO: Implement grid of days & aggregated interviews.</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Create interview slot">
          <div className="modal">
            <header className="modal-head">
              <h2>New Interview</h2>
              <button className="icon-btn" aria-label="Close" onClick={()=>setShowModal(false)}>✕</button>
            </header>
            <form onSubmit={createSlot} className="modal-body col gap-sm">
              <label className="field">Title
                <input required value={newSlot.title} onChange={e=>setNewSlot(s=>({...s,title:e.target.value}))} />
              </label>
              <label className="field">Candidate
                <input required value={newSlot.candidate} onChange={e=>setNewSlot(s=>({...s,candidate:e.target.value}))} />
              </label>
              <label className="field">Day
                <select value={newSlot.day} onChange={e=>setNewSlot(s=>({...s,day:Number(e.target.value)}))}>{DAYS.map((d,i)=><option key={d} value={i+1}>{d}</option>)}</select>
              </label>
              <div className="row gap-sm">
                <label className="field grow">Start
                  <input type="time" value={newSlot.start} onChange={e=>setNewSlot(s=>({...s,start:e.target.value}))} />
                </label>
                <label className="field grow">End
                  <input type="time" value={newSlot.end} onChange={e=>setNewSlot(s=>({...s,end:e.target.value}))} />
                </label>
              </div>
              <footer className="modal-foot">
                <button type="submit" className="btn-primary">Create</button>
                <button type="button" className="btn-ghost" onClick={()=>setShowModal(false)}>Cancel</button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
