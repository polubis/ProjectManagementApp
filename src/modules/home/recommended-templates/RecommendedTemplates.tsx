import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import TemplateTile from 'src/modules/templates/template-tiles/template-tile';

import { templatesMock } from 'src/mocks/templates';

import csx from './RecommendedTemplates.scss';

export const RecommendedTemplates = () => {
  const { push } = useHistory();

  const goToDetails = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const templateId = e.currentTarget.getAttribute('data-id');
    push(`app/templates/all/${templateId}`);
  }, []);

  const templates = templatesMock.slice(0, 4);

  return (
    <section className={csx.recommendedTemplates}>
      <div className={csx.templatesContainer}>
        <h2 className={csx.heading}>Recommended templates</h2>
        {templates.map((template, idx) => (
          <TemplateTile key={idx} template={template} onClick={goToDetails} />
        ))}
      </div>
    </section>
  );
};
