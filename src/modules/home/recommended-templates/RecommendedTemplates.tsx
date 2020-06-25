import React, { useCallback } from 'react';

import { useHistory } from 'react-router';

import { TemplateTile } from 'src/modules/templates';

import { templatesMock } from 'src/mocks/templates';

import csx from './RecommendedTemplates.scss';

export const RecommendedTemplates = () => {
  const { push, location } = useHistory();

  const goToDetails = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const templateId = e.currentTarget.getAttribute('data-id');
      push(`app/templates/all/${templateId}`);
    },
    [location]
  );

  const recommendedTemplates = templatesMock.slice(0, 4);
  
  return (
    <section className={csx.recommendedTemplates}>
      <div className={csx.templatesContainer}>
        <h2 className={csx.heading}>Recommended templates</h2>
        {recommendedTemplates.map((template, idx) => {
          return <TemplateTile onClick={goToDetails} template={template} key={idx} />;
        })}
      </div>
    </section>
  );
};
