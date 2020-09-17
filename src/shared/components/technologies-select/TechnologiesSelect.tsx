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
    ({ id, name, pictureUrl }) =>
      ({
        dataIdx: '' + id,
        label: name,
        value: !!value[id],
        pictureUrl
      } as SelectBase.Item)
  );

const TechnologiesSelect = ({ children, value, onSelect }: TechnologiesSelect.Props) => {
  const { loading, technologies } = useTechnologiesProvider();

  const items = useMemo(makeItems(technologies, value), [technologies, value]);

  const getPictureUrl = (items: SelectBase.Item[], dataIdx: string): string => {
    const index = parseInt(dataIdx) - 1;
    return items[index]['pictureUrl'];
  };

  return (
    <SelectBase
      loading={loading}
      listItem={ListItem}
      items={items}
      renderSelectedItem={({ dataIdx, label }) => (
        <TechnologyChip
          avatar={getPictureUrl(items, dataIdx)}
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
