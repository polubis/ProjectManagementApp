import React from 'react';

import csx from './Table.scss';

namespace Table {
  export interface Cell {
    value: string | number;
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
      {data.length > 0 && Object.keys(data[0]).map((key, i) => <div key={i}>{key}</div>)}
        {/* add rows here */}
      {/* {Object.entries(data).map(([_, entry], i) => (
        <div key={i}>{entry.component || entry.value}</div>
      ))} */}
    </div>
  );
};

export default Table;
