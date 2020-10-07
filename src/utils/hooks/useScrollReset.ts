import { useEffect } from 'react';

const top: ScrollToOptions = {
  top: 0,
  left: 0,
  behavior: 'smooth'
};

export const useScrollReset = function <T>(trigger: T) {
  useEffect(() => {
    try {
      window.scroll(top);
    } catch {
      window.scrollTo(0, 0);
    }
  }, [trigger]);

  return null;
};
