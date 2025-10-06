import React, { useMemo } from 'react';
import '../styles/pages/StudentDashboard.css';
import { useAuth } from '../context/AuthContext.jsx';

export default function StudentDashboard() {
  const { user } = useAuth();

  // Mock data
  const profileCompletion = 68; // percent
  const jobs = useMemo(()=>[
    { id:1, company:'TechNova', logo:'🛰️', title:'Frontend Intern', salary:'$25/hr', tags:['React','UI','CSS'], location:'Remote' },
    { id:2, company:'DataForge', logo:'📊', title:'Data Analyst Intern', salary:'$28/hr', tags:['SQL','Python','ETL'], location:'NYC' },
    { id:3, company:'CloudSpan', logo:'☁️', title:'DevOps Trainee', salary:'$30/hr', tags:['AWS','Terraform','CI/CD'], location:'Remote' },
    { id:4, company:'SecureStack', logo:'🔐', title:'Security Research Intern', salary:'$32/hr', tags:['AppSec','OWASP','SAST'], location:'Austin, TX' }
  ],[]);

  const applications = [
    { id:1, job:'Frontend Intern', company:'TechNova', stage:'Interview', stages:['Applied','Screen','Interview','Offer'] },
    { id:2, job:'Data Analyst Intern', company:'DataForge', stage:'Screen', stages:['Applied','Screen','Interview','Offer'] },
    { id:3, job:'DevOps Trainee', company:'CloudSpan', stage:'Applied', stages:['Applied','Screen','Interview','Offer'] }
  ];

  const interviews = [
    { id:1, job:'Frontend Intern', company:'TechNova', date:'Oct 14, 10:00 AM EST', type:'Technical' },
    { id:2, job:'Security Research Intern', company:'SecureStack', date:'Oct 18, 2:30 PM EST', type:'Behavioral' }
  ];

  const skillInsights = [
    { skill:'React', level:4 },
    { skill:'Python', level:3 },
    { skill:'SQL', level:3 },
    { skill:'AWS', level:2 }
  ];

  const notifications = [
    { id:1, type:'app', text:'Your application for Frontend Intern moved to Interview stage.' },
    { id:2, type:'reminder', text:'Upcoming interview with TechNova in 3 days.' },
    { id:3, type:'tip', text:'Add more project details to improve profile strength.' },
    { id:4, type:'job', text:'New role: AI Research Intern at DataForge.' },
    { id:5, type:'skill', text:'Trending skill: Rust is gaining demand.' }
  ];

  return (
    <div className="student-dash-grid">
      <section className="surface hero" aria-labelledby="hero-heading">
        <h2 id="hero-heading" className="mt-0">Welcome back, {user?.email.split('@')[0] || 'Student'} 👋</h2>
        <div className="progress-wrap" aria-label="Profile completion" role="group">
          <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={profileCompletion}>
            <span style={{width: profileCompletion + '%'}} />
          </div>
          <span className="progress-text fs-xs muted">Profile {profileCompletion}% complete</span>
        </div>
      </section>

      <section className="surface job-feed" aria-labelledby="jobs-heading">
        <div className="section-head">
          <h3 id="jobs-heading" className="mt-0">Job Feed</h3>
          <button className="btn btn-sm ghost">View All</button>
        </div>
        <div className="job-grid">
          {jobs.map(j => (
            <article key={j.id} className="job-card" aria-label={`${j.title} at ${j.company}`}>
              <div className="job-head">
                <div className="logo" aria-hidden>{j.logo}</div>
                <div className="meta">
                  <h4 className="job-title">{j.title}</h4>
                  <span className="company muted fs-xs">{j.company}</span>
                </div>
              </div>
              <div className="job-tags">
                {j.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="job-info fs-xs"><span>{j.location}</span> • <span>{j.salary}</span></div>
              <div className="job-actions">
                <button className="btn btn-sm primary">Apply</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="surface status-tracker" aria-labelledby="status-heading">
        <h3 id="status-heading" className="mt-0">Application Status</h3>
        <ul className="app-list">
          {applications.map(app => (
            <li key={app.id} className="app-row">
              <div className="app-meta">
                <strong className="fs-sm">{app.job}</strong>
                <span className="muted fs-xs">{app.company}</span>
              </div>
              <ol className="stage-line" aria-label={`Progress for ${app.job}`}>
                {app.stages.map(stage => {
                  const currentIndex = app.stages.indexOf(app.stage);
                  const idx = app.stages.indexOf(stage);
                  const state = idx < currentIndex ? 'done' : idx === currentIndex ? 'current':'upcoming';
                  return <li key={stage} className={`stage ${state}`}>{stage}</li>;
                })}
              </ol>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface interviews" aria-labelledby="interviews-heading">
        <h3 id="interviews-heading" className="mt-0">Upcoming Interviews</h3>
        <ul className="interview-list">
          {interviews.map(iv => (
            <li key={iv.id} className="interview-row">
              <div className="iv-meta">
                <strong className="fs-sm">{iv.job}</strong>
                <span className="muted fs-xs">{iv.company}</span>
              </div>
              <div className="iv-time fs-xs">{iv.date}</div>
              <span className="badge">{iv.type}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface skills" aria-labelledby="skills-heading">
        <h3 id="skills-heading" className="mt-0">Skill Insights</h3>
        <div className="skill-bars">
          {skillInsights.map(s => (
            <div key={s.skill} className="skill-bar" aria-label={`${s.skill} proficiency ${s.level} of 5`}>
              <span className="label fs-xs">{s.skill}</span>
              <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={5} aria-valuenow={s.level}><span style={{width:(s.level/5)*100+'%'}} /></div>
            </div>
          ))}
        </div>
      </section>

      <aside className="surface notifications" aria-labelledby="notifications-heading">
        <h3 id="notifications-heading" className="mt-0">Notifications</h3>
        <ul className="notif-list" role="list">
          {notifications.map(n => (
            <li key={n.id} className={`notif ${n.type}`}>{n.text}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
