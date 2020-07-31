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

const SelectItem = ({ style, index, data: { items, onSelect } }: SelectBase.ListChildProps) => {
  const { dataIdx, label, value } = items[index];

  return (
    <div className={csx.selectItem} style={style}>
      <Checkbox
        dataIdx={dataIdx}
        label={
          <TechnologyChip
            name={label}
            avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png"
          />
        }
        value={value}
        onChange={onSelect}
      />
    </div>
  );
};

const getSelected = (value: { [key: string]: boolean }) => () =>
  Object.values(value).filter((v) => v).length;

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

  const selectedCount = useMemo(getSelected(value), [value]);

  const items = useMemo(makeItems(technologies, value), [technologies, value]);

  return (
    <SelectBase items={items} onSelect={onSelect}>
      <Button
        className={`${csx.btn} ${selectedCount > 0 ? csx.active : ''}`}
        theme="primaryTransparent"
      >
        <CodeIcon />
        {selectedCount > 0 && <b>{selectedCount}</b>}
      </Button>
      {SelectItem}
    </SelectBase>
  );
};

export default TechnologySelect;
