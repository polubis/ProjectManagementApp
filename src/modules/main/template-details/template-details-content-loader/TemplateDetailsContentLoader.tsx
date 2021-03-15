import React, { FC, memo } from 'react';

import csx from './TemplateDetailsContentLoader.scss';

namespace TemplateDetailsContentLoader {
  export interface Props {
    className?: string;
  }
}

const TemplateDetailsContentLoader: FC<TemplateDetailsContentLoader.Props> = memo(
  ({ className }) => {
    return (
      <div className={`${className} ${csx.templateDetailsContentLoader}`}>
        <header className={csx.actions}>
          <div />
          <div />
          <div />
        </header>

        <section>
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

          <div className={csx.authors}>
            <div />
            <div />
            <div />
          </div>
        </section>
      </div>
    );
  },
  () => true
);

TemplateDetailsContentLoader.defaultProps = {
  className: '',
};

export default TemplateDetailsContentLoader;
