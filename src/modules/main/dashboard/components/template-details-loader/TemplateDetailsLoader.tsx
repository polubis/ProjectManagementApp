import React, { FC, memo } from 'react';

import csx from './TemplateDetailsLoader.scss';

const TemplateDetailsLoader: FC = memo(
  () => {
    return (
      <div className={csx.templateDetailsLoader}>
        <div className={csx.tags}>
          <div />
          <div />
          <div />
        </div>

        <div className={csx.stats}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>

        <div className={csx.title} />

        <div className={csx.description} />

        <div className={csx.technologies} />

        <div className={csx.patterns} />
      </div>
    );
  },
  () => true
);

export default TemplateDetailsLoader;
