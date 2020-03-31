import React from 'react';

import { SearchCategories, TemplateSearch, TemplateTiles } from '.';

import csx from './TemplatesView.scss';

const TemplatesView = () => {
  return (
    <div className={csx.templatesView}>
      <SearchCategories />
      <TemplateSearch />
      <TemplateTiles />
    </div>
  );
};

export default TemplatesView;
