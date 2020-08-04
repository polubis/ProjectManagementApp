import React, { useEffect } from 'react';

import TemplateDocumentationProvider, {
  useTemplateDocumentationProvider
} from './TemplateDocumentationProvider';

import ContentTree from './content-tree';

import csx from './TemplateDocumentation.scss';

const TemplateDocumentation = () => {
  const { documentation, loading, getTemplateDocumentation } = useTemplateDocumentationProvider();

  useEffect(() => {
    getTemplateDocumentation('https://github.com/jamiebuilds/react-loadable');
  }, []);

  return (
    <div className={csx.templateDocumentation}>
      <ContentTree />
    </div>
  );
};

export default () => (
  <TemplateDocumentationProvider>
    <TemplateDocumentation />
  </TemplateDocumentationProvider>
);
