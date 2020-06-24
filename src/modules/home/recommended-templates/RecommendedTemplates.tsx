import React from 'react';

import { TemplateTile } from 'src/modules/templates';

import { templatesMock } from 'src/mocks/templates';

import csx from './RecommendedTemplates.scss';

export const RecommendedTemplates = () => {
  return (
    <section className={csx.recommendedTemplates}>
      <div className={csx.templatesContainer}>
        <h2 className={csx.heading}>Recommended templates</h2>

        <TemplateTile onClick={() => console.log('siema')} template={templatesMock[0]} />
        <TemplateTile onClick={() => console.log('siema')} template={templatesMock[1]} />
        <TemplateTile onClick={() => console.log('siema')} template={templatesMock[2]} />
        <TemplateTile onClick={() => console.log('siema')} template={templatesMock[3]} />
      </div>
    </section>
  );
};
