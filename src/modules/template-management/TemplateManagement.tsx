import React from 'react';
import { useRouteMatch } from 'react-router';

import { Loader } from 'ui';

import { usePatternsProvider } from 'core/patterns';
import { useTechnologiesProvider } from 'core/technologies';

import { TemplateAuthorGuard } from 'shared/guards';
import TemplateDetailsProvider from 'shared/providers/template-details';

import TemplateForm from './template-form';

import { useTemplateManagementConfig } from '.';

import csx from './TemplateManagement.scss';

const TemplateManagement = () => {
  const {
    params: { id },
  } = useRouteMatch<{ id: string }>();

  const { loading: loadingTechnologies } = useTechnologiesProvider();

  const { loading: loadingPatterns } = usePatternsProvider();

  const { loading: loadingConfig, config } = useTemplateManagementConfig();

  const loading = loadingPatterns || loadingTechnologies || loadingConfig;

  return (
    <div className={csx.templateManagement}>
      {loading ? (
        <Loader />
      ) : id ? (
        <TemplateAuthorGuard redirect="/app/templates">
          <TemplateForm config={config} />
        </TemplateAuthorGuard>
      ) : (
        <TemplateForm config={config} />
      )}
    </div>
  );
};

export default () => (
  <TemplateDetailsProvider>
    <TemplateManagement />
  </TemplateDetailsProvider>
);
