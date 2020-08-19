import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { tap, map, debounceTime } from 'rxjs/operators';

export const useScroll = (debounce = 100, offset = 1000) => {
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    const toBottomExceeded = () =>
      window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;

    const sub = fromEvent(document, 'scroll')
      .pipe(
        map(toBottomExceeded),
        debounceTime(debounce),
        tap((bottom) => setBottom(bottom))
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return bottom;
};
