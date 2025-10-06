import React from 'react';
function cx(...parts){return parts.filter(Boolean).join(' ');}

export function Avatar({ label, className, size=32 }) {
  const style = { '--avatar-size': size + 'px', '--avatar-fs': (size * 0.5) + 'px' };
  return (
    <div
      className={cx('avatar', className)}
      style={style}
      aria-hidden
    >
      {label?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
}
