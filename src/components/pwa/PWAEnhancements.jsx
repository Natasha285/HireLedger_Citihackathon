import React, { useEffect, useState } from 'react';

/*
  PWAEnhancements
  ---------------
  Handles offline banner & install prompt (mock style, real event hooks where possible).
  TODO(CACHE): Show list of cached routes for offline access.
  TODO(INSTALL): Analytics on install acceptance.
*/

export function PWAEnhancements() {
  const [offline, setOffline] = useState(!navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    function update() { setOffline(!navigator.onLine); }
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);

  useEffect(() => {
    function beforeInstall(e) {
      e.preventDefault();
      setDeferredPrompt(e); // save prompt
      setShowInstall(true);
    }
    window.addEventListener('beforeinstallprompt', beforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', beforeInstall);
  }, []);

  async function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice; // { outcome } could be inspected
    setShowInstall(false);
    setDeferredPrompt(null);
  }

  return (
    <>
      {offline && (
        <div className="offline-banner" role="alert" aria-live="assertive">Offline mode – changes will not sync until connection returns.</div>
      )}
      {showInstall && (
        <div className="install-prompt" role="dialog" aria-modal="true" aria-label="Install application">
          <div><strong>Install HireLedger?</strong></div>
          <p className="muted small">Get quicker access and offline support.</p>
          <div className="install-actions">
            <button className="btn-secondary" onClick={()=>setShowInstall(false)}>Later</button>
            <button className="btn-primary" onClick={install}>Install</button>
          </div>
        </div>
      )}
    </>
  );
}
