import React from 'react';
import { Redirect } from 'react-router';

import { Loader } from 'ui';

import { usePatternsProvider } from 'core/patterns';
import { useTechnologiesProvider } from 'core/technologies';
import { useAuthProvider } from 'core/auth';

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

  const {
    user: { username }
  } = useAuthProvider();

  const { loading: loadingConfig, config } = useTemplateManagementConfig();

  const loading = loadingPatterns || loadingTechnologies || loadingConfig;

  return template !== null && template.addedBy !== username ? (
    <Redirect to="/" />
  ) : (
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
