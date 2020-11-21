import React, { useEffect } from 'react';

import { TemplateCategory } from 'core/api';

import { TemplatesGrid } from 'shared/components';

import TemplatesProvider, { useTemplatesProvider } from 'src/modules/templates/TemplatesProvider';

import csx from './RecentTemplates.scss';

const RecentTemplates = () => {
  const { templates, pendingRequests, getTemplates } = useTemplatesProvider();

  useEffect(() => {
    getTemplates({
      page: 1,
      limit: 4,
      category: TemplateCategory.RECENT,
      query: '',
      technologiesIds: [],
      patternsIds: [],
    });
  }, []);

  return (
    <section className={csx.recentTemplates}>
      <div className={csx.wrapper}>
        <h5>Recent templates</h5>

        <TemplatesGrid
          className={csx.templatesGrid}
          pathname={`/app/templates/${TemplateCategory.RECENT}`}
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
    <RecentTemplates />
  </TemplatesProvider>
);
