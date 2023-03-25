import { useEffect } from 'react';

function useCtrlF(callback: () => void) {
  function handle(e: any) {
    if (e.key === 'f' && e.ctrlKey) {
      e.preventDefault();
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);
}

export default useCtrlF;
