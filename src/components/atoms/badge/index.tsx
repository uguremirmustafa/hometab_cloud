import { Size, Variant } from '@src/types';
import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
  variant?: Variant;
}
function Badge(props: IProps) {
  const { children, size = 'md', variant = 'contained', className, ...rest } = props;

  const cls = `${className ?? ''} px-3 py-1 text-md rounded-full`;
  return (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
