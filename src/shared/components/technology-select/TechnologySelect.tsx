import React, { memo } from 'react';

import { Technology } from 'core/api';
import { useTechnologiesProvider } from 'core/technologies';

import { SelectBase } from 'ui';

import { TechnologyChip } from '..';

import ControlButton from './control-button';
import ListItem from './list-item';

import csx from './TechnologySelect.scss';

namespace TechnologySelect {
  export interface Props {
    value: { [key: string]: boolean };
    onSelect: SelectBase.OnSelect;
  }
}

const makeItems = (technologies: Technology[], value: { [key: string]: boolean }) =>
  technologies.map(
    ({ id, name }) =>
      ({
        dataIdx: '' + id,
        label: name,
        value: !!value[id]
      } as SelectBase.Item)
  );

const TechnologySelect = memo(
  ({ value, onSelect }: TechnologySelect.Props) => {
    const { technologies } = useTechnologiesProvider();

    return (
      <SelectBase
        listItem={ListItem}
        items={makeItems(technologies, value)}
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
        <ControlButton value={value} />
      </SelectBase>
    );
  },
  (prev, next) => prev.value === next.value
);

export default TechnologySelect;
