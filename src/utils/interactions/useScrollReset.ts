import { useEffect } from 'react';

export const useScrollReset = <T>(trigger: T): void => {
  useEffect(() => {
    if (window.scroll) {
      window.scroll({
        left: 0,
        top: 0
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [trigger]);
};
