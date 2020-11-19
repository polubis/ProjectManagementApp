import React, { useCallback, ReactElement, useMemo } from 'react';

import { SelectBase, Tag } from 'ui';

import { Pattern } from 'core/api';
import { usePatternsProvider } from 'core/patterns';

import ListItem from './list-item';

import csx from './PatternsSelect.scss';

namespace PatternsSelect {
  export interface Props {
    children: ReactElement;
    value: { [key: string]: boolean };
    onSelect: SelectBase.OnSelect;
  }
}

const makeItems = (
  patterns: Pattern[],
  value: { [key: string]: boolean }
) => () =>
  patterns.map(
    ({ id, name }) =>
      ({
        dataIdx: `${id}`,
        label: name,
        value: !!value[id],
      } as SelectBase.Item)
  );

const PatternsSelect = ({
  children,
  value,
  onSelect,
}: PatternsSelect.Props) => {
  const { loading, patterns } = usePatternsProvider();

  const handleSelect = useCallback(
    (e: Tag.Events.Click) => {
      const dataIdx = e.currentTarget.getAttribute('data-idx');
      onSelect(dataIdx, false);
    },
    [onSelect]
  );

  const items = useMemo(makeItems(patterns, value), [patterns, value]);

  return (
    <SelectBase
      loading={loading}
      listItem={ListItem}
      items={items}
      renderSelectedItem={({ dataIdx, label }) => (
        <Tag
          key={dataIdx}
          className={csx.tag}
          dataIdx={dataIdx}
          label={label}
          onClick={handleSelect}
        />
      )}
      onSelect={onSelect}
    >
      {children}
    </SelectBase>
  );
};

export default PatternsSelect;
