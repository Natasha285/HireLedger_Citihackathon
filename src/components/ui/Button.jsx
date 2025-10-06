import React from 'react';

function cx(...parts){return parts.filter(Boolean).join(' ');}

export function Button({ variant = 'default', size = 'md', className, as:Comp='button', ...rest }) {
  const classes = cx(
    'btn',
    variant === 'primary' && 'primary',
    variant === 'ghost' && 'ghost',
    variant === 'danger' && 'danger',
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    className
  );
  return <Comp className={classes} {...rest} />;
}
