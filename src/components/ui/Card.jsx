import React from 'react';
function cx(...parts){return parts.filter(Boolean).join(' ');}

export function Card({ elevated, className, children, ...rest }) {
  return (
    <div className={cx('surface', elevated && 'card-elevated', className)} {...rest}>
      {children}
    </div>
  );
}
