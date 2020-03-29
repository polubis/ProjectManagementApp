import React from 'react';

import { SearchCategories } from '.';

import csx from './TemplatesView.scss';

const TemplatesView = () => {
  return (
    <div className={csx.templatesView}>
      <SearchCategories />
    </div>
  );
};

export default TemplatesView;
