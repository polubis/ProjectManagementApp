import React, { useEffect } from 'react';

import { TemplateCategory } from 'core/api';

import { TemplatesGrid } from 'shared/components';

import TemplatesProvider, { useTemplatesProvider } from 'src/modules/templates/TemplatesProvider';

import csx from './RecommendedTemplates.scss';

const RecommendedTemplates = () => {
  const { templates, pendingRequests, getTemplates } = useTemplatesProvider();

  useEffect(() => {
    getTemplates({
      page: 1,
      limit: 4,
      category: TemplateCategory.RECOMMENDED,
      query: '',
      technologiesIds: [],
      patternsIds: []
    });
  }, []);

  return (
    <section className={csx.recommendedTemplates}>
      <div className={csx.wrapper}>
        <h5>Recommended templates</h5>

        <TemplatesGrid
          className={csx.templatesGrid}
          pathname={`/app/templates/${TemplateCategory.RECOMMENDED}`}
          spaceholdersCount={4}
          loading={!!pendingRequests}
          templates={templates}
        />
      </div>
    </section>
  );
};

export default () => (
  <TemplatesProvider>
    <RecommendedTemplates />
  </TemplatesProvider>
);
