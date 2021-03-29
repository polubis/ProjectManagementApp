import React, { useState, useCallback } from 'react';

import { Disclaimer } from 'ui';

import { CreateTemplateButton } from 'shared/components';
import { Guard } from 'shared/guards';
import { useTemplatesHistoryProvider } from 'shared/providers/templates-history';
import { useFavouriteTemplatesProvider } from 'shared/providers/favourite-templates';

import ContentHeader from '../content-header';
import TemplatesList from './templates-list';

import csx from './TemplatesContent.scss';

const TABS = {
  SAVED: 'Saved',
  HISTORY: 'History',
};

const TABS_TITLES = {
  [TABS.SAVED]: 'No saved templates',
  [TABS.HISTORY]: 'No templates in history',
};

const TABS_DESCRIPTIONS = {
  [TABS.SAVED]: 'You can save templates by viewing them in the detail view',
  [TABS.HISTORY]: 'Templates are added to the history as you view them',
};

const TemplatesContent = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(TABS.SAVED);

  const {
    templates: favouriteTemplates,
    removeTemplateFromFavourites,
  } = useFavouriteTemplatesProvider();

  const { templates: templatesHistory, removeTemplateFromHistory } = useTemplatesHistoryProvider();

  const handleTabClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { name } = e.currentTarget.dataset;

    setActiveTab(name);
  }, []);

  const handleDelete = useCallback(
    (templateId: string) => {
      if (activeTab === TABS.SAVED) {
        removeTemplateFromFavourites(templateId);
      } else {
        removeTemplateFromHistory(templateId);
      }
    },
    [activeTab, removeTemplateFromFavourites, removeTemplateFromHistory]
  );

  const templates = activeTab === TABS.SAVED ? favouriteTemplates : templatesHistory;

  return (
    <div className={csx.templatesContent}>
      <ContentHeader description="Use filters and find template" title="Templates" />
      <Guard.Protected>
        {({ user: { connectedWithGithub } }) => (
          <>
            {connectedWithGithub && <CreateTemplateButton />}

            <div className={csx.navigation}>
              <span
                data-name={TABS.SAVED}
                className={`${csx.navItem} ${TABS.SAVED === activeTab ? csx.navItemActive : ''}`}
                onClick={handleTabClick}
              >
                {TABS.SAVED}
              </span>
              <span
                data-name={TABS.HISTORY}
                className={`${csx.navItem} ${TABS.HISTORY === activeTab ? csx.navItemActive : ''}`}
                onClick={handleTabClick}
              >
                {TABS.HISTORY}
              </span>
            </div>
            {templates.length > 0 ? (
              <TemplatesList templates={templates} onDelete={handleDelete} />
            ) : (
              <Disclaimer
                className={csx.disclaimer}
                description={TABS_DESCRIPTIONS[activeTab]}
                title={TABS_TITLES[activeTab]}
              />
            )}
          </>
        )}
      </Guard.Protected>
    </div>
  );
};

export default TemplatesContent;
