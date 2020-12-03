import React from 'react';

import { CreateTemplateButton } from 'shared/components';

import csx from './TemplatesContent.scss';

const TemplatesContent = (): JSX.Element => {
  return (
    <div className={csx.templatesContent}>
      <h3>Templates</h3>
      <span>Use filters and find template</span>

      <CreateTemplateButton />
    </div>
  );
};

export default TemplatesContent;
