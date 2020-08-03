import React, { useMemo } from 'react';

import CodeIcon from '@material-ui/icons/Code';

import { Technology } from 'core/api';
import { useTechnologiesProvider } from 'core/technologies';

import { SelectBase, Button, Checkbox } from 'ui';

import { TechnologyChip } from '..';

import csx from './TechnologySelect.scss';

namespace TechnologySelect {
  export interface Props {
    value: { [key: string]: boolean };
    onSelect: SelectBase.OnSelect;
  }
}

const ListItem = ({ style, index, data: { items, onSelect } }: SelectBase.ListChildProps) => {
  const { dataIdx, label, value } = items[index];

  return (
    <div className={csx.listItem} style={style}>
      <Checkbox
        dataIdx={dataIdx}
        label={
          <TechnologyChip
            avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png"
            name={label}
          />
        }
        value={value}
        onChange={onSelect}
      />
    </div>
  );
};

const getSelectedCount = (value: { [key: string]: boolean }) => () =>
  Object.values(value).filter(v => v).length;

const makeItems = (technologies: Technology[], value: { [key: string]: boolean }) => () =>
  technologies.map(
    ({ id, name }) =>
      ({
        dataIdx: '' + id,
        label: name,
        value: !!value[id]
      } as SelectBase.Item)
  );

const TechnologySelect = ({ value, onSelect }) => {
  const { technologies } = useTechnologiesProvider();

  const selectedCount = useMemo(getSelectedCount(value), [value]);

  const items = useMemo(makeItems(technologies, value), [technologies, value]);

  return (
    <SelectBase
      listItem={ListItem}
      items={items}
      renderSelectedItem={({ dataIdx, label }) => (
        <TechnologyChip
          avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png"
          className={csx.selectItem}
          name={label}
          onClick={() => onSelect(dataIdx, false)}
        />
      )}
      onSelect={onSelect}
    >
      <Button
        className={`${csx.btn} ${selectedCount > 0 ? csx.active : ''}`}
        theme="primaryTransparent"
      >
        <CodeIcon />
        {selectedCount > 0 && <b>{selectedCount}</b>}
      </Button>
    </SelectBase>
  );
};

export default TechnologySelect;
