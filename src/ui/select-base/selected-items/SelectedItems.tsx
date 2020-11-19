import React, { memo, Fragment } from 'react';

import { SelectBase } from '..';

import csx from './SelectedItems.scss';

namespace SelectedItems {
  export interface Props<T> {
    items: SelectBase.Item<T>[];
    renderItem: SelectBase.RenderSelectItem<T>;
  }
}

const SelectedItems = memo(
  <T extends Object>({ items, renderItem }: SelectedItems.Props<T>) => {
    const selectedItems = items.filter(({ value }) => value);

    if (!selectedItems.length) {
      return null;
    }

    return (
      <footer className={csx.selectedItems}>
        {selectedItems.map((item) => (
          <Fragment key={item.dataIdx}>{renderItem(item)}</Fragment>
        ))}
      </footer>
    );
  },
  (prev, next) => prev.items === next.items,
);

export default SelectedItems;
