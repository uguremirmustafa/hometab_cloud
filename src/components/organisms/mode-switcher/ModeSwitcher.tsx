import { MoonIcon, SunIcon } from '@src/assets/icons';
import useLocalState from '@src/hooks/useLocalState';
import React, { useEffect } from 'react';

function ModeSwitcher() {
  const [mode, setMode] = useLocalState<'light' | 'dark'>('hometab-mod', 'dark');

  function toggleMode() {
    setMode((old) => (old === 'dark' ? 'light' : 'dark'));
  }

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <button onClick={toggleMode} className="transition animate-wave">
      {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default ModeSwitcher;
