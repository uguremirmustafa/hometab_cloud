import React from 'react';
import SettingsButton from '../settings-button';

function ConfigBar() {
  return (
    <div className="absolute top-4 right-4 flex gap-4">
      <SettingsButton />
    </div>
  );
}

export default ConfigBar;
