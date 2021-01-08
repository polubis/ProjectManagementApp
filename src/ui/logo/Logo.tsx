import React from 'react';

import { IMGS_PATH } from 'consts';

import csx from './Logo.scss';

interface LogoProps {
  path?: string;
}

export const Logo = ({ path = IMGS_PATH }: LogoProps) => {
  return <img className={csx.root} src={`${path}/Logo.png`} alt="Jupi.io Logo" />;
};
