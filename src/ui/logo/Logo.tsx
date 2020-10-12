import React from 'react';

import { IMGS_PATH } from 'consts';

import csx from './Logo.scss';

export const Logo = () => {
  return <img className={csx.root} src={IMGS_PATH + '/Logo.png'} alt="Jupi.io Logo" />;
};
