import React from 'react';

import csx from './MainPageBasicInformation.scss';
import { TemplatesSearch } from 'views/templates';

export const MainPageBasicInformation = () => {
  return (
    <div className={csx.basicInformationContainer}>
      <p className={csx.heading}>
        <span>Simplified</span> and faster project development process
      </p>
      <p className={csx.description}>
        Use <span>Jupi.io</span> to boost your development process with high quality templates
        prepared by developers community from around the world
      </p>

      <TemplatesSearch />
    </div>
  );
};
