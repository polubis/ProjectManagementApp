import React, { FC, memo } from 'react';

import { TemplateTileSmallLoader } from 'shared/components';

import csx from './TemplatesListLoader.scss';

const PLACEHOLDERS = Array.from({ length: 3 }, (_, i) => i);

const TemplatesListLoader: FC = () => {
  return (
    <>
      {PLACEHOLDERS.map((placeholder) => (
        <TemplateTileSmallLoader key={placeholder} className={csx.item} />
      ))}
    </>
  );
};

export default TemplatesListLoader;
