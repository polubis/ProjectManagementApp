import { useEffect, useCallback } from 'react';

import { throttle } from 'utils';

export const useScroll = (callback: Function, offset = 0) => {
  const onScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - offset) {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    const debouncedOnScroll = throttle(onScroll, 200);

    document.addEventListener('scroll', debouncedOnScroll);

    return () => {
      document.removeEventListener('scroll', debouncedOnScroll);
    };
  }, []);
};
