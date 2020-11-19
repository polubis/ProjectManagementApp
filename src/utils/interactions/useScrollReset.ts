import { useEffect } from 'react';

export const useScrollReset = <T>(trigger: T, smooth = false): void => {
  useEffect(() => {
    if (window.scroll) {
      window.scroll({
        left: 0,
        top: 0,
        behavior: smooth ? 'smooth' : 'auto',
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [trigger]);
};
