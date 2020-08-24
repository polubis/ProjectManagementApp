import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { TemplateDocumentation } from 'core/api';

import { Loader } from 'ui';

import ContentTree from './content-tree';
import TemplateDocumentationProvider, {
  useTemplateDocumentationProvider
} from './TemplateDocumentationProvider';

import csx from './TemplateDocumentation.scss';

const makeContentTreeItems = ({ headings = [] }: TemplateDocumentation) => () => {
  if (!headings.length) {
    return [];
  }

  const getLevel = (type: string) => +type.slice(1);

  const getMinLevel = () =>
    headings.reduce((acc, { type }) => {
      const level = getLevel(type);

      return level < acc ? level : acc;
    }, getLevel(headings[0].type));

  const minLevel = getMinLevel();

  return headings.map(
    ({ id, childrenCount, parentId, text, type }) =>
      ({
        id,
        childrenCount,
        parentId,
        label: text,
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
      setActiveItem(treeItems[0]);
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
