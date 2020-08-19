import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { throttleTime, map, tap } from 'rxjs/operators';

export const useBottomScrollDetection = (offset = 1000, tTime = 250) => {
  const [bottomExceeded, setIsBottomExceeded] = useState(false);

  useEffect(() => {
    const isBottomExceeded = () =>
      window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;

    const sub = fromEvent(document, 'scroll')
      .pipe(throttleTime(tTime), map(isBottomExceeded), tap(setIsBottomExceeded))
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return bottomExceeded;
};
