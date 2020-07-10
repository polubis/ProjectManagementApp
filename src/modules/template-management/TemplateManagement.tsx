import React from 'react';

import { Loader } from 'ui';

import { usePatternsProvider } from 'core/patterns';
import { useTechnologiesProvider } from 'core/technologies';

import TemplateDetailsProvider from 'shared/providers/template-details';

import TemplateForm from './template-form';

import { useTemplateManagementConfig } from '.';

import csx from './TemplateManagement.scss';

const TemplateManagement = () => {
  const [{ loading: loadingConfig, config }] = useTemplateManagementConfig();

  const { loading: loadingPatterns } = usePatternsProvider();

  const { loading: loadingTechnologies } = useTechnologiesProvider();

  const loading = loadingConfig || loadingPatterns || loadingTechnologies;

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
