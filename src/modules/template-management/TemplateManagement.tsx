import React from 'react';

import { usePatternsProvider } from 'core/patterns';
import { useTechnologiesProvider } from 'core/technologies';

import TemplateForm from './template-form';

import csx from './TemplateManagement.scss';

const TemplateManagement = () => {
  const { loading: loadingPatterns } = usePatternsProvider();

  const { loading: loadingTechnologies } = useTechnologiesProvider();

  return (
    <div className={csx.templateManagement}>
      {!loadingPatterns && !loadingTechnologies && <TemplateForm />}
    </div>
  );
};

export default TemplateManagement;
