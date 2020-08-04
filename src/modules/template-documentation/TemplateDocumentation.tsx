import React, { useState, useCallback, useEffect } from 'react';

import ContentTree from './content-tree';

import csx from './TemplateDocumentation.scss';

const mock = [
  { id: 0, label: 'Basic informations', level: 0, childrenCount: 0, parentId: -1 },
  { id: 1, label: 'Setup & Instalation', level: 0, childrenCount: 0, parentId: -1 },
  { id: 2, label: 'Guide', level: 0, childrenCount: 3, parentId: 0 },
  { id: 3, label: 'Frontend', level: 1, childrenCount: 3, parentId: 2 },
  { id: 4, label: 'Backend', level: 2, childrenCount: 0, parentId: 3 },

  { id: 5, label: 'Testing', level: 0, childrenCount: 1, parentId: -1 },
  { id: 6, label: 'Deploy', level: 1, childrenCount: 1, parentId: 5 },
  { id: 7, label: 'Production', level: 2, childrenCount: 0, parentId: 6 }
];

const TemplateDocumentation = () => {
  const [activeItem, setActiveItem] = useState<ContentTree.Item | null>(null);

  const [expandedItems, setExpandedItems] = useState<ContentTree.ExpandedItems>({});

  const handleClick: ContentTree.OnClick = useCallback(id => {
    const { idx, item } = ContentTree.findById(id, mock);

    setActiveItem(item);
    setExpandedItems(prevExpandedItems =>
      ContentTree.makeExpandedItems(idx, mock, prevExpandedItems)
    );
  }, []);

  useEffect(() => {
    setActiveItem(mock[0]);
  }, []);

  return (
    <div className={csx.templateDocumentation}>
      <ContentTree
        activeItem={activeItem}
        expandedItems={expandedItems}
        items={mock}
        onClick={handleClick}
      />

      {activeItem && activeItem.label}
    </div>
  );
};

export default TemplateDocumentation;
