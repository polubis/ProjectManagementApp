import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';

import { Loader, Tree } from 'ui';

import { TemplateDocumentation } from 'core/api';

import ContentTree from './content-tree';
import TemplateDocumentationProvider, {
  useTemplateDocumentationProvider,
} from './TemplateDocumentationProvider';

import csx from './TemplateDocumentation.scss';

const makeContentTreeItems = ({ headings = [] }: TemplateDocumentation) => () => {
  if (!headings.length) {
    return [];
  }

  const getLevel = (type: string) => +type.slice(1);

  const getMinLevel = () => headings.reduce((acc, { type }) => {
    const level = getLevel(type);

    return level < acc ? level : acc;
  }, getLevel(headings[0].type));

  const minLevel = getMinLevel();

  return headings.map(
    ({
      id, childrenCount, parentId, text, type,
    }) => ({
      id,
      childrenCount,
      parentId,
      label: text,
      level: getLevel(type) - minLevel,
    } as Tree.Item),
  );
};

const TemplateDocumentation = () => {
  const { documentation, loading, getTemplateDocumentation } = useTemplateDocumentationProvider();

  const [activeItem, setActiveItem] = useState<Tree.Item | null>(null);

  const [expandedItems, setExpandedItems] = useState<Tree.ExpandedItems>({});

  const treeItems = useMemo(makeContentTreeItems(documentation), [documentation]);

  const handleClick: Tree.OnClick = useCallback(
    (id) => {
      const { idx, item } = Tree.find(id, treeItems);

      setActiveItem(item);
      setExpandedItems(Tree.expand(idx, treeItems));
    },
    [treeItems],
  );

  useEffect(() => {
    getTemplateDocumentation('https://github.com/jamiebuilds/react-loadable');
  }, []);

  useEffect(() => {
    if (treeItems.length > 0) {
      setActiveItem(treeItems[0]);
      setExpandedItems(Tree.expand(0, treeItems));
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
