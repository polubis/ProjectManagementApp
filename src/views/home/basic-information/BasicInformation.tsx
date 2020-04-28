import React from 'react';

import { TemplatesSearch } from 'views/templates';

import csx from './BasicInformation.scss';

export const BasicInformation = () => {
  return (
    <div className={csx.basicInformation}>
      <p className={csx.heading}>
        <span>Simplified</span> and faster project development process
      </p>
      
      <p className={csx.description}>
        Use <span>Jupi.io</span> to boost your development process with high quality templates
        prepared by developers community from around the world
      </p>
      {/* Templates search actually breaks whole layout, need to find out why */}
      <TemplatesSearch />
    </div>
  );
};