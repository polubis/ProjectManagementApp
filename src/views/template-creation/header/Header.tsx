import React, { memo } from 'react';

import csx from './Header.scss';

interface HeaderProps {
  label: string;
  description: string;
}

export const Header = memo(({ label, description }: HeaderProps) => {
  return (
    <>
      <h5 className={csx.title}>{label}</h5>
      <span className={csx.description}>{description}</span>
    </>
  );
});
