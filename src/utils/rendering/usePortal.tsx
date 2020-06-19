import { useEffect, useMemo, ReactPortal, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const usePortal = (): ((children: ReactNode) => ReactPortal | null) => {
  const el = useMemo(() => {
    return document.createElement('div');
  }, []);

  useEffect(() => {
    document.body.prepend(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return (children) => createPortal(children, el);
};
