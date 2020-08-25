import React, { useMemo } from 'react';

import csx from './Table.scss';

namespace Table {
  export interface Cell {
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
  const renderTableBody = () =>
    useMemo(
      () =>
        data.map((entry) =>
          Object.values(entry).map((cell, i) => <span key={i}>{cell.component}</span>)
        ),
      [data, header]
    );
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${header.length}, 1fr)`
      }}
      className={csx.grid}
    >
      {header.map((key, i) => (
        <span key={i} className={csx.header}>
          {key}
        </span>
      ))}
      {renderTableBody()}
    </div>
  );
};

export default Table;
