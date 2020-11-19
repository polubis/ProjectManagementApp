import { useRef, useLayoutEffect, useState } from 'react';

type State = {
  height: number;
  width: number;
} | null;

type Return = [React.MutableRefObject<any>, State];

export const useSizeTracking = (heightGap = 0, widthGap = 0): Return => {
  const [size, setSize] = useState<State>(null);

  const ref = useRef(null);

  useLayoutEffect(() => {
    const { height, width } = ref.current.getBoundingClientRect() as
      | ClientRect
      | DOMRect;

    setSize({ height: height - heightGap, width: width - widthGap });
  }, []);

  return [ref, size];
};
