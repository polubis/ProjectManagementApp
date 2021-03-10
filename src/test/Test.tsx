import React, { useEffect, useState } from 'react';

import csx from './Test.scss';
import Grid from './grid-2';
import GridItem from './grid-2/GridItem';
import { useGridManagement } from './grid-2/useGridManagement';
import GridItemResizer from './grid-2/GridItemResizer';

type OwnData = { background: string };

const CONFIG: Grid.Config = {
  rowsCount: 3,
  columnsCount: 4,
  rowsGap: 24,
  columnsGap: 24,
  rowsHeightCreator: () => '1fr',
  columnsWidthCreator: () => '1fr',
};

const POSITIONS: Grid.Positions<OwnData> = [
  { cellsIds: '1,3', groupId: 0, data: { background: 'red' } },
  { cellsIds: '4,8', groupId: 0, data: { background: 'red' } },
  { cellsIds: '5,7', groupId: 0, data: { background: 'blue' } },
  { cellsIds: '9,10', groupId: 0, data: { background: 'red' } },
  { cellsIds: '11,12', groupId: 0, data: { background: 'red' } },
];

const Test = () => {
  const [positions, updatePositions] = useGridManagement(CONFIG, POSITIONS);
  console.log(positions);
  useEffect(() => {
    setTimeout(() => {
      updatePositions([
        { cellsIds: '1,3', groupId: 0, data: { background: 'white' } },
        { cellsIds: '4,8', groupId: 0, data: { background: 'white' } },
        { cellsIds: '5,7', groupId: 1, data: { background: 'white' } },
      ]);
    }, 3000);
  }, []);

  const [currentlyResized, setCurrentlyResized] = useState('');

  const toggleCurrentlyResized = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { cellsIds } = e.currentTarget.dataset;
    setCurrentlyResized((prevCurrentlyResized) => (prevCurrentlyResized ? '' : cellsIds));
  };

  return (
    <div className={csx.test} style={{ padding: '20px' }}>
      <Grid config={CONFIG}>
        {positions.map(({ cellsIds, groupId, data }, idx) => (
          <GridItem
            key={idx}
            style={{ background: '#003577' }}
            cellsIds={cellsIds}
            groupId={groupId}
            resizing={cellsIds === currentlyResized}
            onClick={toggleCurrentlyResized}
          >
            {cellsIds}
            {groupId}
            {cellsIds === currentlyResized && <GridItemResizer />}
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default Test;
