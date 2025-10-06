import { useEffect } from 'react';

// Basic keyboard navigation helper (e.g., trap focus or global shortcuts placeholder)
export function useKeyboardNav(callbacks = {}) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        callbacks.onCommandPalette && callbacks.onCommandPalette();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callbacks]);
}
