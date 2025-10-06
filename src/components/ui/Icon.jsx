import React from 'react';

// Simple inline icon wrapper; could be replaced with an icon library later.
export function Icon({ children, size=16, label }) {
  const style = { '--icon-size': size + 'px', fontSize: 'var(--icon-size)' };
  return (
    <span aria-label={label} role={label ? 'img' : undefined} className="icon" style={style}>
      {children}
    </span>
  );
}
