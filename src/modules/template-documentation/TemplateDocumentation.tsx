import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { TemplateDocumentation } from 'core/api';

import { Loader } from 'ui';

import ContentTree from './content-tree';
import TemplateDocumentationProvider, {
  useTemplateDocumentationProvider
} from './TemplateDocumentationProvider';

import csx from './TemplateDocumentation.scss';

const makeContentTreeItems = ({ headings, readmeLines }: TemplateDocumentation) => () => {
  if (!headings.length) {
    return [];
  }

  const getLevel = (type: string) => +type.slice(1);

  const minLevel = headings.reduce((acc, { type }) => {
    const level = getLevel(type);

    return level < acc ? level : acc;
  }, getLevel(headings[0].type));

  return headings.map(
    ({ id, childrenCount, parentId, type }) =>
      ({
        id,
        childrenCount,
        parentId,
        label: readmeLines[id].lineItems[0].content,
        level: getLevel(type) - minLevel
      } as ContentTree.Item)
  );
};

const TemplateDocumentation = () => {
  const { documentation, loading, getTemplateDocumentation } = useTemplateDocumentationProvider();

  const [activeItem, setActiveItem] = useState<ContentTree.Item | null>(null);

  const [expandedItems, setExpandedItems] = useState<ContentTree.ExpandedItems>({});

  const treeItems = useMemo(makeContentTreeItems(documentation), [documentation]);

  const handleClick: ContentTree.OnClick = useCallback(
    (id) => {
      const { idx, item } = ContentTree.find(id, treeItems);

      setActiveItem(item);
      setExpandedItems(ContentTree.expand(idx, treeItems));
    },
    [treeItems]
  );

  useEffect(() => {
    getTemplateDocumentation('https://github.com/jamiebuilds/react-loadable');
  }, []);

  useEffect(() => {
    if (treeItems.length > 0) {
      const [firstItem] = treeItems;

      setActiveItem(firstItem);
      setExpandedItems(ContentTree.expand(0, treeItems));
    }
  }, [treeItems]);

  return (
    <div className={csx.templateDocumentation}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ContentTree
            activeItem={activeItem}
            expandedItems={expandedItems}
            items={treeItems}
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
