import { Size, Variant } from '@src/types';
import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: Variant;
}
function Button(props: IProps) {
  const { children, size = 'md', variant = 'contained', className, ...rest } = props;

  const cls = `btn btn-${size} btn-${variant} ${className ?? ''}`;

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export default Button;
