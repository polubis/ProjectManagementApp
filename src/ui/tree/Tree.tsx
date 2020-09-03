import React, { useCallback, useMemo } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { useSizeTracking } from 'utils';

import csx from './Tree.scss';

namespace Tree {
  export namespace Events {
    export type Click = React.MouseEvent<HTMLElement, MouseEvent>;
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
    children: React.ComponentType<ListChildComponentProps>;
    expandedItems: ExpandedItems;
    items: Item[];
    onClick: OnClick;
  }

  export interface ItemData {
    activeItem: Item | null;
    expandedItems: ExpandedItems;
    items: Item[];
    onClick(e: Events.Click): void;
  }

  export interface ItemProps extends Omit<ListChildComponentProps, 'data'> {
    data: ItemData;
  }
}

const ITEM_SIZE = 52;

const find = (id: number, items: Tree.Item[]): { idx: number; item: Tree.Item } => {
  const idx = items.findIndex((item) => item.id === id);

  return { idx, item: items[idx] };
};

const expand = (idx: number, items: Tree.Item[]) => (prevExpandedItems: Tree.ExpandedItems) => {
  const item = items[idx],
    expanded = !!prevExpandedItems[item.id],
    expandedItems: Tree.ExpandedItems = { ...prevExpandedItems, [item.id]: !expanded };

  const shouldCollapse = expanded && !!item.childrenCount;

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

const filterItems = (expandedItems: Tree.ExpandedItems, items: Tree.Item[]) => () =>
  items.filter((item) => !item.level || !!expandedItems[item.parentId]);

const Tree = ({ activeItem, children, expandedItems, items, onClick }: Tree.Props) => {
  const [ref, size] = useSizeTracking();

  const handleClick = useCallback(
    (e: Tree.Events.Click) => {
      onClick(+e.currentTarget.getAttribute('data-idx'));
    },
    [onClick]
  );

  const filteredItems = useMemo(filterItems(expandedItems, items), [expandedItems, items]);

  const itemsData: Tree.ItemData = useMemo(
    () => ({
      activeItem,
      expandedItems,
      items: filteredItems,
      onClick: handleClick
    }),
    [activeItem, expandedItems, filteredItems, onClick]
  );

  return (
    <div className={csx.tree} ref={ref}>
      {size && (
        <FixedSizeList
          itemCount={filteredItems.length}
          itemData={itemsData}
          itemSize={ITEM_SIZE}
          {...size}
        >
          {children}
        </FixedSizeList>
      )}
    </div>
  );
};

Tree.expand = expand;
Tree.find = find;

export default Tree;
