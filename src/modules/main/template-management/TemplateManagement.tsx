import React, { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { Loader } from 'ui';

import { usePatternsProvider } from 'shared/providers/patterns';
import { useTechnologiesProvider } from 'shared/providers/technologies';
import TemplateDetailsProvider from 'shared/providers/template-details';
import { useAuthProvider } from 'shared/providers/auth';
import { TemplateAuthorGuard } from 'shared/guards';

import TemplateForm from './template-form';

import { useTemplateManagementConfig } from '.';

import csx from './TemplateManagement.scss';

const TemplateManagement = (): JSX.Element => {
  const { replace } = useHistory();

  const {
    user: { connectedWithGithub },
  } = useAuthProvider();

  useEffect(() => {
    if (!connectedWithGithub) {
      replace('/app/templates');
    }
  }, [connectedWithGithub]);

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
