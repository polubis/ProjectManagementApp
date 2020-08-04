import React, { useCallback, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import ChevronIcon from '@material-ui/icons/ChevronRight';

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

  export interface TreeChildData {
    activeItem: Item | null;
    expandedItems: ExpandedItems;
    items: Item[];
    onClick(e: Events.Click): void;
  }

  export interface TreeChildProps extends Omit<ListChildComponentProps, 'data'> {
    data: TreeChildData;
  }

  export type OnClick = (id: number) => void;

  export interface Props {
    activeItem: Item | null;
    expandedItems: ExpandedItems;
    items: Item[];
    onClick: OnClick;
  }
}

const TREE_PADDING = 38,
  ITEM_INDENDATION = 20,
  ULTER_ITEM_INDENDATION = 8,
  TREE_STYLES: React.CSSProperties = { padding: TREE_PADDING };

const TreeItem = ({
  style,
  index,
  data: { activeItem, expandedItems, items, onClick }
}: ContentTree.TreeChildProps) => {
  const { id, childrenCount, label, level } = items[index];

  return (
    <div
      className={`${csx.treeItem} ${activeItem && activeItem.id === id ? csx.active : ''} ${
        expandedItems[id] ? csx.expanded : ''
      }`}
      data-idx={id}
      style={{
        ...style,
        paddingLeft: `${level * ITEM_INDENDATION +
          (childrenCount > 0 || level === 0 ? 0 : ULTER_ITEM_INDENDATION)}px`
      }}
      onClick={onClick}
    >
      {childrenCount > 0 && <ChevronIcon />}
      <span title={label}>{label}</span>
    </div>
  );
};

const filterItems = (expandedItems: ContentTree.ExpandedItems, items: ContentTree.Item[]) => () =>
  items.filter(item => !item.level || !!expandedItems[item.parentId]);

const findById = (
  id: number,
  items: ContentTree.Item[]
): { idx: number; item: ContentTree.Item } => {
  const idx = items.findIndex(item => item.id === id);

  return { idx, item: items[idx] };
};

const makeExpandedItems = (
  idx: number,
  items: ContentTree.Item[],
  prevExpandedItems: ContentTree.ExpandedItems
) => {
  const item = items[idx],
    expanded = !!!prevExpandedItems[item.id],
    expandedItems = {};

  if (!expanded && !!item.childrenCount) {
    for (let i = idx + 1; ({ length } = items), i < length; i++) {
      expandedItems[items[i].id] = false;

      if (item.level === items[item.id].level) {
        break;
      }
    }
  }

  return { ...prevExpandedItems, [item.id]: expanded, ...expandedItems };
};

const ContentTree = ({ activeItem, expandedItems, items, onClick }: ContentTree.Props) => {
  const [size, setSize] = useState(null);

  const ref = useRef(null);

  const handleClick = useCallback(
    (e: ContentTree.Events.Click) => {
      onClick(+e.currentTarget.getAttribute('data-idx'));
    },
    [onClick]
  );

  const filteredItems = useMemo(filterItems(expandedItems, items), [expandedItems, items]);

  const itemsData: ContentTree.TreeChildData = useMemo(
    () => ({
      activeItem,
      expandedItems,
      items: filteredItems,
      onClick: handleClick
    }),
    [activeItem, expandedItems, filteredItems, onClick]
  );

  useLayoutEffect(() => {
    const { height, width } = ref.current.getBoundingClientRect() as ClientRect | DOMRect;

    setSize({ height: height - TREE_PADDING * 2, width: width - TREE_PADDING * 2 });
  }, []);

  return (
    <div className={csx.contentTree} ref={ref} style={TREE_STYLES}>
      {size && (
        <FixedSizeList
          itemCount={filteredItems.length}
          itemData={itemsData}
          itemSize={52}
          height={size.height}
          width={size.width}
        >
          {TreeItem}
        </FixedSizeList>
      )}
    </div>
  );
};

ContentTree.findById = findById;

ContentTree.makeExpandedItems = makeExpandedItems;

export default ContentTree;
