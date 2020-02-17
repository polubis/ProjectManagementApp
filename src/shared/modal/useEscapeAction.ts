import { useEffect } from 'react';
import { UseEscapeActionProps } from './models';

export const useEscapeAction = ({open, callback, key }: UseEscapeActionProps) => {

  const handleKey = (event: KeyboardEvent) => {
    if (event.key === key) return callback();
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKey);
    }

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  });


};
