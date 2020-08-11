import React, { useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';

import { useSizeTracking } from 'utils';

import TreeItem from './tree-item';

import csx from './ContentTree.scss';

namespace ContentTree {
  export namespace Events {
    export type Click = React.MouseEvent<HTMLDivElement, MouseEvent>;
  }

  export type ExpandedItems = { [key: string]: boolean };

  export type Item = {
    id: number;
    label: string;
    level: number;
    childrenCount: number;
    parentId: number;
  };

  export type OnClick = (id: number) => void;

  export interface Props {
    activeItem: Item | null;
    expandedItems: ExpandedItems;
    items: Item[];
    onClick: OnClick;
  }
}

const TREE_PADDING = 38,
  ITEM_SIZE = 52,
  TREE_STYLES: React.CSSProperties = { padding: TREE_PADDING };

const find = (id: number, items: ContentTree.Item[]): { idx: number; item: ContentTree.Item } => {
  const idx = items.findIndex((item) => item.id === id);

  return { idx, item: items[idx] };
};

const expand = (idx: number, items: ContentTree.Item[]) => (
  prevExpandedItems: ContentTree.ExpandedItems
) => {
  const item = items[idx],
    itemExpanded = !!prevExpandedItems[item.id],
    expandedItems = { ...prevExpandedItems, [item.id]: !itemExpanded };

  const shouldCollapse = itemExpanded && !!item.childrenCount;

  if (shouldCollapse) {
    for (let i = idx + 1; ({ length } = items), i < length; i++) {
      expandedItems[items[i].id] = false;

      if (item.level === items[i].level) {
        break;
      }
    }
  }

  return expandedItems;
};

const filterItems = (expandedItems: ContentTree.ExpandedItems, items: ContentTree.Item[]) => () =>
  items.filter((item) => !item.level || !!expandedItems[item.parentId]);

const ContentTree = ({ activeItem, expandedItems, items, onClick }: ContentTree.Props) => {
  const [ref, size] = useSizeTracking(TREE_PADDING * 2, TREE_PADDING * 2);

  const handleClick = useCallback(
    (e: ContentTree.Events.Click) => {
      onClick(+e.currentTarget.getAttribute('data-idx'));
    },
    [onClick]
  );

  const filteredItems = useMemo(filterItems(expandedItems, items), [expandedItems, items]);

  const itemsData: TreeItem.Data = useMemo(
    () => ({
      activeItem,
      expandedItems,
      items: filteredItems,
      onClick: handleClick
    }),
    [activeItem, expandedItems, filteredItems, onClick]
  );

  return (
    <div className={csx.contentTree} ref={ref} style={TREE_STYLES}>
      {size && (
        <FixedSizeList
          itemCount={filteredItems.length}
          itemData={itemsData}
          itemSize={ITEM_SIZE}
          height={size.height}
          width={size.width}
        >
          {TreeItem}
        </FixedSizeList>
      )}
    </div>
  );
};

ContentTree.find = find;
ContentTree.expand = expand;

export default ContentTree;
