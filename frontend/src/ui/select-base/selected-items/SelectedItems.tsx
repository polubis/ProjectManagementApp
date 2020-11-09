import React, { memo, Fragment } from 'react';

import { SelectBase } from '..';

import csx from './SelectedItems.scss';

namespace SelectedItems {
  export interface Props {
    items: SelectBase.Item[];
    renderItem: SelectBase.RenderSelectItem;
  }
}

const SelectedItems = memo(
  ({ items, renderItem }: SelectedItems.Props) => {
    const selectedItems = items.filter(({ value }) => value);

    if (!selectedItems.length) {
      return null;
    }

    return (
      <footer className={csx.selectedItems}>
        {selectedItems.map(item => (
          <Fragment key={item.dataIdx}>{renderItem(item)}</Fragment>
        ))}
      </footer>
    );
  },
  (prev, next) => prev.items === next.items
);

export default SelectedItems;
