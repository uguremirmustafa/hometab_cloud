import { LoadingIcon } from '@src/assets/icons';
import { useApp } from '@src/lib/store';
import React from 'react';

function LoadingIndicator() {
  const { loading } = useApp();

  if (!loading) {
    return null;
  }

  return (
    <span className="absolute top-1 left-1 flex items-center gap-1">
      <LoadingIcon size={18} />
      <span>Saving...</span>
    </span>
  );
}

export default LoadingIndicator;
