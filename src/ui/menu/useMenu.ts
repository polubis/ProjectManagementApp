import { useState, useCallback } from 'react';

type UseMenu = () => [
  Element,
  boolean,
  (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  () => void
];

export const useMenu: UseMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = useCallback(
    ({ currentTarget }: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setAnchorEl(currentTarget);
    },
    []
  );

  const close = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return [anchorEl, Boolean(anchorEl), open, close];
};
