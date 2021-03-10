import React from 'react';

import csx from './Test.scss';
import Grid from './grid/components/grid/Grid';
import GridItem from './grid/components/grid/GridItem';

const rowsCreator = () => '1fr';
const colsCreator = () => '1fr';

const Test = () => {
  return (
    <div className={csx.test}>
      <Grid
        rows={3}
        cols={3}
        rowGap={24}
        colGap={24}
        rowsCreator={rowsCreator}
        colsCreator={colsCreator}
      >
        <GridItem cellsIds="1,3" style={{ background: 'red' }} />
        <GridItem cellsIds="4,5" style={{ background: 'red' }} />
        <GridItem cellsIds="4,5" groupId={1} style={{ background: 'blue' }} />
        <GridItem cellsIds="7,8" style={{ background: 'red' }} />
        <GridItem cellsIds="6,9" style={{ background: 'red' }} />
      </Grid>
    </div>
  );
};

export default Test;
