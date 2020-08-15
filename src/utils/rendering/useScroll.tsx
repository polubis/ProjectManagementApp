import { useEffect, useCallback, useState } from 'react';

import { throttle } from '..';

export const useScroll = (offset = 0) => {
  const [bottomExceeded, setIsBottomExceeded] = useState(false);

  const onScroll = useCallback(() => {
    setIsBottomExceeded(window.innerHeight + window.scrollY >= document.body.offsetHeight - offset);
  }, []);

  useEffect(() => {
    const debouncedOnScroll = throttle(onScroll, 200);

    document.addEventListener('scroll', debouncedOnScroll);

    return () => {
      document.removeEventListener('scroll', debouncedOnScroll);
    };
  }, []);

  return bottomExceeded;
};
