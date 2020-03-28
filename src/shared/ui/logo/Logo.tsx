import React from 'react';

import csx from './Logo.scss';

export const Logo = () => {
  return <img className={csx.root} src={window.location.origin + '/public/images/Logo.png'} />;
};
