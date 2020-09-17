import React, { useEffect } from 'react';

import { TemplateCategory } from 'core/api';

import { TemplatesGrid } from 'shared/components';

import TemplatesProvider, { useTemplatesProvider } from 'src/modules/templates/TemplatesProvider';

import csx from './TopTemplates.scss';

const TopTemplates = () => {
  const { templates, pendingRequests, getTemplates } = useTemplatesProvider();

  useEffect(() => {
    getTemplates({
      page: 1,
      limit: 4,
      category: TemplateCategory.TOP,
      query: '',
      technologiesIds: [],
      patternsIds: []
    });
  }, []);

  return (
    <section className={csx.topTemplates}>
      <div className={csx.wrapper}>
        <h5>Top templates</h5>

        <TemplatesGrid
          pathname={`/app/templates/${TemplateCategory.TOP}`}
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
    <TopTemplates />
  </TemplatesProvider>
);
