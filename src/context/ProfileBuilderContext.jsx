import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const STORAGE_KEY = 'hl_profile_builder_v1';

export const steps = [
  'personal',
  'education',
  'skills',
  'projects',
  'resume',
  'certificates',
  'review'
];

const defaultData = {
  personal: { firstName: '', lastName: '', email: '', phone: '' },
  education: [{ school: '', degree: '', start: '', end: '', gpa: '' }],
  skills: { core: [], tools: [], languages: [] },
  projects: [{ name: '', description: '', link: '' }],
  resume: { file: null },
  certificates: [],
};

const ProfileBuilderContext = createContext(null);

export function ProfileBuilderProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultData, ...JSON.parse(raw) };
    } catch(e) { /* ignore */ }
    return defaultData;
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [dirty, setDirty] = useState(false);

  const saveRef = useRef(null);
  useEffect(() => {
    if (!dirty) return;
    if (saveRef.current) clearTimeout(saveRef.current);
    saveRef.current = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) { /* ignore */ }
      setDirty(false);
    }, 600); // debounce save
  }, [data, dirty]);

  const updateSection = useCallback((section, value) => {
    setData(prev => ({ ...prev, [section]: value }));
    setDirty(true);
  }, []);

  const next = useCallback(() => setCurrentStep(s => { const n = Math.min(s + 1, steps.length - 1); setDirty(true); return n; }), []);
  const prev = useCallback(() => setCurrentStep(s => { const n = Math.max(s - 1, 0); setDirty(true); return n; }), []);
  const goTo = useCallback((index) => { setDirty(true); setCurrentStep(() => Math.min(Math.max(index,0), steps.length -1)); }, []);
  const reset = useCallback(() => { setData(defaultData); setCurrentStep(0); setDirty(true); }, []);

  const value = {
    data, updateSection,
    currentStep, steps, next, prev, goTo, reset,
  saveDraft: () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}; setDirty(false); },
    dirty
  };
  return <ProfileBuilderContext.Provider value={value}>{children}</ProfileBuilderContext.Provider>;
}

export function useProfileBuilder() {
  const ctx = useContext(ProfileBuilderContext);
  if (!ctx) throw new Error('useProfileBuilder must be used within ProfileBuilderProvider');
  return ctx;
}
