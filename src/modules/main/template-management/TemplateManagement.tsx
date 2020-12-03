import React from 'react';
import { useRouteMatch } from 'react-router';

import { Loader } from 'ui';

import { usePatternsProvider } from 'shared/providers/patterns';
import { useTechnologiesProvider } from 'shared/providers/technologies';
import TemplateDetailsProvider from 'shared/providers/template-details';
import { TemplateAuthorGuard } from 'shared/guards';

import TemplateForm from './template-form';

import { useTemplateManagementConfig } from '.';

import csx from './TemplateManagement.scss';

const TemplateManagement = (): JSX.Element => {
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

export default (): JSX.Element => (
  <TemplateDetailsProvider>
    <TemplateManagement />
  </TemplateDetailsProvider>
);
