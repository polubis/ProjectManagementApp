import React from 'react';

import csx from './Table.scss';

namespace Table {
  export interface Cell {
    value?: string | number;
    component?: JSX.Element;
  }

  export interface Row {
    [key: string]: Cell;
  }

  export interface Props {
    data: Row[];
  }
}

const Table = ({ data }: Table.Props) => {
  return (
    <div className={csx.grid}>
      {data.length > 0 &&
        Object.keys(data[0]).map((key, i) => (
          <span key={i}>
            <strong>{key}</strong>
          </span>
        ))}
      {data.map((entry, index) =>
        Object.values(entry).map(
          (cell, i) =>
            (cell.component && <span key={i}>{cell.component}</span>) || <span key={i}>{cell.value}</span>
        )
      )}
    </div>
  );
};

export default Table;
