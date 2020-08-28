import csx from './Table.scss';
import React, { useMemo } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';

namespace Table {
  export interface Cell {
    component: JSX.Element | string | number;
  }

  export interface Row {
    [key: string]: Cell;
  }

  export type TableConfig = Omit<FixedSizeListProps, 'children' | 'itemCount'>;

  export interface Props {
    data: Row[];
    config: TableConfig;
  }
}

const Table = ({ data, config }: Table.Props) => {
  const Row = ({ index, style }) => {
    const cells = Object.values(data[index]).map((cell, i) => (
      <div key={i + index}>{cell.component}</div>
    ));

    return (
      <div
        key={index}
        className={csx.table}
        style={{
          ...style,
          gridTemplateColumns: `repeat(${Object.keys(data[index]).length}, 1fr)`
        }}
      >
        {cells}
      </div>
    );
  };

  return (
    <div>
      <FixedSizeList itemCount={data.length} {...config}>
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default Table;
