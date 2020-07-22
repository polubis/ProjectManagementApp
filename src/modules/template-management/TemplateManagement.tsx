import React from 'react';

import { Loader } from 'ui';

import { usePatternsProvider } from 'core/patterns';
import { useTechnologiesProvider } from 'core/technologies';

import TemplateForm from './template-form';

import { useTemplateManagementConfig } from '.';

import csx from './TemplateManagement.scss';
import TemplateDetailsProvider from 'shared/providers/template-details';

const TemplateManagement = () => {
  const { loading: loadingTechnologies } = useTechnologiesProvider();

  const { loading: loadingPatterns } = usePatternsProvider();

  const { loading: loadingConfig, config } = useTemplateManagementConfig();

  const loading = loadingPatterns || loadingTechnologies || loadingConfig;

  return (
    <div className={csx.templateManagement}>
      {loading ? <Loader /> : <TemplateForm config={config} />}
    </div>
  );
};

export default () => (
  <TemplateDetailsProvider>
    <TemplateManagement />
  </TemplateDetailsProvider>
);
