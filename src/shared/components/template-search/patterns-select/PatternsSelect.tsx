import React, { useCallback } from 'react';

import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import { SelectBase, Tag } from 'ui';

import { Pattern } from 'core/api';
import { usePatternsProvider } from 'core/patterns';

import ControlButton from '../control-button';
import ListItem from './list-item';

import csx from './PatternsSelect.scss';

namespace PatternsSelect {
  export interface Props {
    value: { [key: string]: boolean };
    onSelect: SelectBase.OnSelect;
  }
}

const makeItems = (patterns: Pattern[], value: { [key: string]: boolean }) =>
  patterns.map(
    ({ id, name }) =>
      ({
        dataIdx: '' + id,
        label: name,
        value: !!value[id]
      } as SelectBase.Item)
  );

const PatternsSelect = ({ value, onSelect }: PatternsSelect.Props) => {
  const { patterns } = usePatternsProvider();

  const handleSelect = useCallback(
    (e: Tag.Events.Click) => {
      const dataIdx = e.currentTarget.getAttribute('data-idx');
      onSelect(dataIdx, false);
    },
    [onSelect]
  );

  return (
    <SelectBase
      listItem={ListItem}
      items={makeItems(patterns, value)}
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
      <ControlButton value={value}>
        <PlaylistAddIcon />
      </ControlButton>
    </SelectBase>
  );
};

export default PatternsSelect;
