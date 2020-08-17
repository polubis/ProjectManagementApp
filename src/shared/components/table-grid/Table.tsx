import React from 'react';

import csx from './Table.scss';

namespace Table {
  export interface Cell {
    value?: string | number;
    component?: JSX.Element;
    className?: string;
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
  return (
    <div className={csx.grid}>
      {header.map((key, i) => (
        <span className={csx.header} key={i}>
          <strong>{key}</strong>
        </span>
      ))}
      {data.map((entry, index) =>
        Object.values(entry).map(
          (cell, i) =>
            (cell.component && <span key={i}>{cell.component}</span>) || <span className={csx[cell.className]} key={i}>{cell.value}</span>
        )
      )}
    </div>
  );
};

export default Table;
