import { useState, useCallback } from 'react';

type Return = [
  Element,
  boolean,
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  () => void
];

export const useMenu = (): Return => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = useCallback(({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(currentTarget);
  }, []);

  const close = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return [anchorEl, Boolean(anchorEl), open, close];
};
