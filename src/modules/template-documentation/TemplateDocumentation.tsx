import React, { useEffect, useState } from 'react';

import TemplateDocumentationProvider, {
  useTemplateDocumentationProvider
} from './TemplateDocumentationProvider';

import ContentTree from './content-tree';

import csx from './TemplateDocumentation.scss';
import Toolbar from './toolbar/Toolbar';
import ContentGrid from './content-grid/ContentGrid';

const TemplateDocumentation = () => {
  const { documentation, loading, getTemplateDocumentation } = useTemplateDocumentationProvider();

  useEffect(() => {
    getTemplateDocumentation('https://github.com/jamiebuilds/react-loadable');
  }, []);

  const content: ContentGrid.ContentMap = {
    0: 'A',
    1: 'A',
    3: 'A',
    4: 'A',
    2: 'B',
    5: 'B',
    7: 'C'
  };

  const components: ContentGrid.ComponentsMap = {
    'A': (style) => <div style={style}>A</div>,
    'B': (style) => <div style={style}>B</div>,
    'C': (style) => <div style={style}>C</div>,
  };

  return (
    <div className={csx.templateDocumentation}>
      <ContentGrid cols={3} content={content} components={components} rows={4} />
    </div>
  );
};

export default () => (
  <TemplateDocumentationProvider>
    <TemplateDocumentation />
  </TemplateDocumentationProvider>
);
