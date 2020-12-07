import React from 'react';

import csx from './ContentLoader.scss';

const ContentLoader = (): JSX.Element => {
  return (
    <div className={csx.contentLoader}>
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
};

export default ContentLoader;
