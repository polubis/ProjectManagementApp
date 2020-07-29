import React, { useEffect } from 'react';

import { TemplatesCategories } from 'core/api';

import { TemplatesGrid } from 'shared/components';

import TemplatesProvider, { useTemplatesProvider } from 'src/modules/templates/TemplatesProvider';

import csx from './RecommendedTemplates.scss';

const RecommendedTemplates = () => {
  const { templates, loading, getTemplates } = useTemplatesProvider();

  useEffect(() => {
    getTemplates({
      page: 1,
      limit: 4,
      category: TemplatesCategories.RECOMMENDED,
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
          path="/app/templates/all"
          spaceholdersCount={4}
          loading={loading}
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
