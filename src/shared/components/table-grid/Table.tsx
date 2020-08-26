import React, { useMemo } from 'react';

import csx from './Table.scss';
import { FixedSizeList } from 'react-window';

namespace Table {
  export interface Cell {
    width?: number;
    component: JSX.Element | string | number;
  }

  export interface Row {
    [key: string]: Cell;
  }

  export interface Props {
    data: Row[];
    header: string[];
  }
}

const Table = ({ data, header }: Table.Props) => {
  const renderTableBody = useMemo(
    () =>
      data.map((entry) =>
        Object.values(entry).map((cell, i) => <span key={i}>{cell.component}</span>)
      ),
    [data, header]
  );

  const headerToData = header.reduce(
    (prev: Object, x: string, i: number) => ({ ...prev, [i]: { component: x } }),
    {}
  );

  const Row = ({ index, style }) => {
    let currentWidth = 70;
    const row = Object.values(data[index]).map((cell, i) => {
      const renderCell = (
        <span
          style={{ ...style, left: currentWidth, top: index * style.height, width: '' }}
          key={i + index}
        >
          {cell.component}
        </span>
      );

      currentWidth += cell.width + 40;

      return renderCell;
    });
    return <>{row}</>;
  };

  return (
    <div>
      <FixedSizeList
        className={csx.grid}
        height={500}
        width={1350}
        itemData={data}
        itemCount={data.length}
        itemSize={80}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default Table;
