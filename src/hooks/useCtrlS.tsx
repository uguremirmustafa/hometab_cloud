import { useEffect } from 'react';

function useCtrlS(callback: () => void) {
  function handle(e: any) {
    if (e.key === 's' && e.ctrlKey) {
      e.preventDefault();
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);
}

export default useCtrlS;
