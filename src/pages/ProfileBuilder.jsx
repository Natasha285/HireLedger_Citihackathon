import React from 'react';
import '../styles/pages/ProfileBuilder.css';
import { ProfileBuilderProvider, useProfileBuilder, steps } from '../context/ProfileBuilderContext.jsx';
import PersonalStep from '../components/profile/PersonalStep.jsx';
import EducationStep from '../components/profile/EducationStep.jsx';
import SkillsStep from '../components/profile/SkillsStep.jsx';
import ProjectsStep from '../components/profile/ProjectsStep.jsx';
import ResumeStep from '../components/profile/ResumeStep.jsx';
import CertificatesStep from '../components/profile/CertificatesStep.jsx';
import ReviewStep from '../components/profile/ReviewStep.jsx';

function StepProgress() {
  const { currentStep, goTo } = useProfileBuilder();
  return (
    <ol className="pb-progress" aria-label="Profile completion steps">
      {steps.map((s, i) => {
        const state = i === currentStep ? 'current' : i < currentStep ? 'done' : 'upcoming';
        return (
          <li key={s} className={`pb-step ${state}`}>
            <button type="button" onClick={() => goTo(i)} aria-current={i===currentStep ? 'step' : undefined}>{s.replace(/^[a-z]/,c=>c.toUpperCase())}</button>
          </li>
        );
      })}
    </ol>
  );
}

function StepContainer() {
  const { currentStep } = useProfileBuilder();
  const key = steps[currentStep];
  const map = {
    personal: <PersonalStep />,
    education: <EducationStep />,
    skills: <SkillsStep />,
    projects: <ProjectsStep />,
    resume: <ResumeStep />,
    certificates: <CertificatesStep />,
    review: <ReviewStep />
  };
  return (
    <div className="pb-step-card surface">
      {map[key]}
    </div>
  );
}

function StickyFooter() {
  const { currentStep, next, prev, saveDraft, steps, data } = useProfileBuilder();
  const isLast = currentStep === steps.length - 1;
  const submit = () => {
    // TODO: Replace with real API submission
    // Consolidated payload example below
    console.log('SUBMIT_PROFILE_PAYLOAD', data);
    alert('Submission placeholder. Check console for payload.');
  };
  return (
    <div className="pb-footer">
      <div className="pb-footer-inner">
        <div className="muted fs-xs">Progress: {currentStep + 1} / {steps.length}</div>
        <div className="actions-row">
          <button type="button" className="btn ghost" onClick={saveDraft}>Save Draft</button>
          {currentStep > 0 && <button type="button" className="btn" onClick={prev}>Back</button>}
          {!isLast && <button type="button" className="btn primary" onClick={next}>Next</button>}
          {isLast && <button type="button" className="btn primary" onClick={submit}>Submit Profile</button>}
        </div>
      </div>
    </div>
  );
}

export default function ProfileBuilder() {
  return (
    <ProfileBuilderProvider>
      <div className="pb-layout">
        <StepProgress />
        <StepContainer />
        <StickyFooter />
      </div>
    </ProfileBuilderProvider>
  );
}
