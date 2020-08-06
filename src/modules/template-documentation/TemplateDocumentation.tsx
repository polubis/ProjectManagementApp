import React, { useState, useCallback, useEffect } from 'react';

import { Loader } from 'ui';

import ContentTree from './content-tree';
import TemplateDocumentationProvider, {
  useTemplateDocumentationProvider
} from './TemplateDocumentationProvider';

import csx from './TemplateDocumentation.scss';

const mock = [
  { id: 0, label: 'Basic informations', level: 0, childrenCount: 0, parentId: -1 },
  { id: 1, label: 'Setup & Instalation', level: 0, childrenCount: 0, parentId: -1 },
  { id: 2, label: 'Guide', level: 0, childrenCount: 3, parentId: 0 },
  { id: 3, label: 'Frontend', level: 1, childrenCount: 2, parentId: 2 },
  { id: 4, label: 'Backend', level: 2, childrenCount: 0, parentId: 3 },
  { id: 5, label: 'PHP', level: 2, childrenCount: 0, parentId: 3 },

  { id: 6, label: 'Testing', level: 0, childrenCount: 1, parentId: -1 },
  { id: 7, label: 'Deploy', level: 1, childrenCount: 1, parentId: 6 },
  { id: 8, label: 'Production', level: 2, childrenCount: 0, parentId: 7 }
];

const TemplateDocumentation = () => {
  const { documentation, loading, getTemplateDocumentation } = useTemplateDocumentationProvider();

  const [activeItem, setActiveItem] = useState<ContentTree.Item | null>(null);

  const [expandedItems, setExpandedItems] = useState<ContentTree.ExpandedItems>({});

  const handleClick: ContentTree.OnClick = useCallback(id => {
    const { idx, item } = ContentTree.find(id, mock);

    setActiveItem(item);
    setExpandedItems(ContentTree.expand(idx, mock));
  }, []);

  useEffect(() => {
    getTemplateDocumentation('https://github.com/jamiebuilds/react-loadable');
  }, []);

  return (
    <div className={csx.templateDocumentation}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ContentTree
            activeItem={activeItem}
            expandedItems={expandedItems}
            items={mock}
            onClick={handleClick}
          />

          {activeItem && activeItem.label}
        </>
      )}
    </div>
  );
};

export default () => (
  <TemplateDocumentationProvider>
    <TemplateDocumentation />
  </TemplateDocumentationProvider>
);
