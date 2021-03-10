import React, { useEffect } from 'react';

import csx from './Test.scss';
import Grid from './grid/components/grid/Grid';
import GridItem from './grid/components/grid/GridItem';
import { Positions, GridConfig } from './grid/models/core';
import { usePositions } from './grid/core/usePositions';

type OwnData = { background: string };

const CONFIG: GridConfig = {
  rows: 3,
  cols: 4,
  rowGap: 24,
  colGap: 24,
  rowsCreator: () => '1fr',
  colsCreator: () => '1fr',
};

const POSITIONS: Positions<OwnData> = [
  { cellsIds: '1,3', groupId: 0, data: { background: 'red' } },
  { cellsIds: '4,8', groupId: 0, data: { background: 'red' } },
  { cellsIds: '5,7', groupId: 1, data: { background: 'blue' } },
  { cellsIds: '9,10', groupId: 0, data: { background: 'red' } },
  { cellsIds: '11,12', groupId: 0, data: { background: 'red' } },
];

const Test = () => {
  const [positions, updatePositions] = usePositions(CONFIG, POSITIONS);

  useEffect(() => {
    setTimeout(() => {
      updatePositions([
        { cellsIds: '1,3', groupId: 0, data: { background: 'white' } },
        { cellsIds: '4,8', groupId: 0, data: { background: 'white' } },
        { cellsIds: '5,7', groupId: 1, data: { background: 'white' } },
      ]);
    }, 3000);
  }, []);

  return (
    <div className={csx.test}>
      <Grid {...CONFIG}>
        {positions.map(({ cellsIds, groupId, data }, idx) => (
          <GridItem
            key={idx}
            cellsIds={cellsIds}
            groupId={groupId}
            style={{ background: data.background }}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Test;

// const positions = [{ cellsIds: '1,1', id: 0, groupId: 0, componentName: 'STRING', data: null }];

// const positions = {
//   cellsIds: {
//     componentId: 'MY_COMPONENT',
//   },
// };

// {
/* <DynamicGrid
  rows={3}
  cols={3}
  rowGap={24}
  colGap={24}
  rowsCreator={rowsCreator}
  colsCreator={colsCreator}
>
  {(update) => (
      <GridItem cellsIds="1,3" style={{ background: 'red' }} onClick={() => {}} />
      <GridItem cellsIds="4,5" style={{ background: 'red' }} />
      <GridItem cellsIds="4,5" groupId={1} style={{ background: 'blue' }} />
      <GridItem cellsIds="7,8" style={{ background: 'red' }} />
      <GridItem cellsIds="6,9" style={{ background: 'red' }} />
  )}

</DynamicGrid>; */
// }
