// Accessibility helpers
export function setAriaBusy(el, busy = true) {
  if (!el) return;
  el.setAttribute('aria-busy', busy ? 'true' : 'false');
}

export function announce(message) {
  let liveRegion = document.getElementById('visually-hidden-live');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'visually-hidden-live';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-9999px';
    document.body.appendChild(liveRegion);
  }
  liveRegion.textContent = message;
}
