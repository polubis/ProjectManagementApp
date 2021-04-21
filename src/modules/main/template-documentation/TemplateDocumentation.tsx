import React, { FC } from 'react';

import Navigation from './navigation';

import csx from './TemplateDocumentation.scss';

const TemplateDocumentation: FC = () => {
  return (
    <div className={csx.templateDocumentation}>
      <Navigation />
    </div>
  );
};

export default TemplateDocumentation;
