import React, { useMemo, ReactElement } from 'react';

import { SelectBase } from 'ui';

import { Technology } from 'core/api';
import { useTechnologiesProvider } from 'core/technologies';

import { TechnologyChip } from 'shared/components';

import ListItem from './list-item';

import csx from './TechnologiesSelect.scss';

namespace TechnologiesSelect {
  export interface Props {
    children: ReactElement;
    value: { [key: string]: boolean };
    onSelect: SelectBase.OnSelect;
  }
}

const makeItems = (technologies: Technology[], value: { [key: string]: boolean }) => () =>
  technologies.map(
    ({ id, name }) =>
      ({
        dataIdx: '' + id,
        label: name,
        value: !!value[id]
      } as SelectBase.Item)
  );

const TechnologiesSelect = ({ children, value, onSelect }: TechnologiesSelect.Props) => {
  const { loading, technologies } = useTechnologiesProvider();

  const items = useMemo(makeItems(technologies, value), [technologies, value]);

  return (
    <SelectBase
      loading={loading}
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
      {children}
    </SelectBase>
  );
};

export default TechnologiesSelect;
