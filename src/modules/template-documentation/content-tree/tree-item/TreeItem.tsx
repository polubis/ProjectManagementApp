import React from 'react';
import { ListChildComponentProps } from 'react-window';

import ChevronIcon from '@material-ui/icons/ChevronRight';

import ContentTree from '..';

import csx from './TreeItem.scss';

namespace TreeItem {
  export interface Data {
    activeItem: ContentTree.Item | null;
    expandedItems: ContentTree.ExpandedItems;
    items: ContentTree.Item[];
    onClick(e: ContentTree.Events.Click): void;
  }

  export interface Props extends Omit<ListChildComponentProps, 'data'> {
    data: Data;
  }
}

const ITEM_INDENDATION = 20,
  ULTER_ITEM_INDENDATION = 8,
  DOT_ADDITIONAL_SPACE = 1;

const TreeItem = ({
  style,
  index,
  data: { activeItem, expandedItems, items, onClick }
}: TreeItem.Props) => {
  const { id, childrenCount, label, level, parentId } = items[index];

  return (
    <div
      className={`${csx.treeItem} ${activeItem && activeItem.id === id ? csx.active : ''} ${
        expandedItems[id] ? csx.expanded : ''
      }`}
      data-idx={id}
      style={{
        ...style,
        paddingLeft: `${level * ITEM_INDENDATION +
          (level === 0 ? 0 : level * ULTER_ITEM_INDENDATION)}px`
      }}
      onClick={onClick}
    >
      {expandedItems[parentId] && (
        <div
          className={csx.dot}
          style={{
            left: `${level * ITEM_INDENDATION -
              ITEM_INDENDATION +
              (level === 1 ? 0 : ULTER_ITEM_INDENDATION + DOT_ADDITIONAL_SPACE)}px`
          }}
        />
      )}
      
      {childrenCount > 0 && <ChevronIcon />}
      
      <span className={csx.label} title={label}>
        {label}
      </span>
    </div>
  );
};

export default TreeItem;
