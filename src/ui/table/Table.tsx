import React, { useMemo } from 'react';

import csx from './Table.scss';

namespace Table {
  export interface ColSize {
    min: string;
    max: string;
  }

  export interface ConfigItem {
    key: string;
    label: string;
    size?: ColSize;
  }

  export type Config = {
    [key: string]: {
      col?: (key: string) => React.ReactNode;
      label?: string;
      row?: (key: string, data: any) => React.ReactNode;
      size?: ColSize;
    };
  };

  export interface Props {
    className?: string;
    config: Config;
    data: any[];
  }
}

const getConfigItems = (config: Table.Config): Table.ConfigItem[] => {
  const keys = Object.keys(config);

  return keys.map(
    (key) => ({
      key,
      label: config[key].label ? config[key].label : key,
      size: config[key].size ? config[key].size : { min: '150px', max: '1fr' },
    } as Table.ConfigItem),
  );
};

const getGridTemplateColumns = (items: Table.ConfigItem[]): string => items.map(({ size }) => `minmax(${size.min}, ${size.max})`).join(' ');

const Table = ({ className = '', config, data }: Table.Props) => {
  const items = useMemo(() => getConfigItems(config), [config]);

  const gridTemplateColumns = useMemo(() => getGridTemplateColumns(items), [config]);

  return (
    <table className={`${csx.table} ${className}`} style={{ gridTemplateColumns }}>
      <thead>
        {items.map(({ key, label }) => (
          <tr key={label}>
            <th>{config[key].col ? config[key].col(key) : label}</th>
          </tr>
        ))}
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            {items.map(({ key }) => (
              <td key={key}>
                <div>{config[key].row ? config[key].row(key, item) : item[key]}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.getConfigItems = getConfigItems;
Table.getGridTemplateColumns = getGridTemplateColumns;

export default Table;
