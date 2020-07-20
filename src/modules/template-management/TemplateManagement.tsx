import React from 'react';

import { Loader } from 'ui';

import { usePatternsProvider } from 'core/patterns';
import { useTechnologiesProvider } from 'core/technologies';
import { Guard } from 'core/auth';

import TemplateDetailsProvider, {
  useTemplateDetailsProvider
} from 'shared/providers/template-details';

import TemplateForm from './template-form';

import { useTemplateManagementConfig } from '.';

import csx from './TemplateManagement.scss';

const TemplateManagement = () => {
  const { loading: loadingTechnologies } = useTechnologiesProvider();

  const { loading: loadingPatterns } = usePatternsProvider();

  const { template } = useTemplateDetailsProvider();

  const { loading: loadingConfig, config } = useTemplateManagementConfig();

  const loading = loadingPatterns || loadingTechnologies || loadingConfig;

  return (
    template && <Guard.OnlyAuthor author={template.addedBy}>
      <div className={csx.templateManagement}>
      {loading ? <Loader /> : <TemplateForm config={config} />}
    </div>
    </Guard.OnlyAuthor>
  )
};

export default () => (
  <TemplateDetailsProvider>
    <TemplateManagement />
  </TemplateDetailsProvider>
);
