import React from 'react';
import { render, screen } from '@testing-library/react';

import Grid from '../Grid';
import { _GridItem_ } from './mocks';

describe('<Grid>', () => {
  it('renders children', () => {
    render(
      <Grid rows={3} cols={3}>
        <_GridItem_ cellsIds="1,1">Children</_GridItem_>
      </Grid>
    );

    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('assigns className', () => {
    render(
      <Grid className="my-class" rows={3} cols={3}>
        <_GridItem_ cellsIds="1,1">Children</_GridItem_>
      </Grid>
    );

    expect(screen.getByText('Children').parentElement.className).toBe('my-class');
  });

  it('assigns layout style', () => {
    render(
      <Grid className="my-class" rows={3} cols={3} style={{ background: 'red' }}>
        <_GridItem_ cellsIds="1,1">Children</_GridItem_>
      </Grid>
    );

    const {
      display,
      background,
      gridTemplateColumns,
      gridTemplateRows,
      position,
    } = screen.getByText('Children').parentElement.style;

    expect(display).toBeTruthy();
    expect(background).toBeTruthy();
    expect(gridTemplateColumns).toBeTruthy();
    expect(gridTemplateRows).toBeTruthy();
    expect(position).toBeTruthy();
  });

  it('allows to add other properties', () => {
    render(
      <Grid className="my-class" rows={3} cols={3} style={{ background: 'red' }} lang="pl">
        <_GridItem_ cellsIds="1,1">Children</_GridItem_>
      </Grid>
    );

    expect(screen.getByText('Children').parentElement.lang).toBeTruthy();
  });

  describe('assigns style for every children', () => {
    it('assigns style for every children', () => {
      render(
        <Grid className="my-class" rows={3} cols={3}>
          <_GridItem_ cellsIds="1,1" style={{ background: 'red' }}>
            Children
          </_GridItem_>
        </Grid>
      );

      expect(screen.getByText('Children').style.background).toBe('red');
      expect(screen.getByText('Children').style.gridRow).toBe('1/1');
      expect(screen.getByText('Children').style.gridColumn).toBe('1/1');
    });
  });

  describe('allows to overwrite', () => {
    it('rows height', () => {
      render(
        <Grid rows={3} cols={3} rowsCreator={() => '400px'}>
          <_GridItem_ cellsIds="1,1" style={{ background: 'red' }}>
            Children
          </_GridItem_>
        </Grid>
      );

      expect(screen.getByText('Children').parentElement.style.gridTemplateRows).toBe(
        '400px 400px 400px'
      );
    });

    it('columns height', () => {
      render(
        <Grid rows={3} cols={3} colsCreator={() => '400px'}>
          <_GridItem_ cellsIds="1,1" style={{ background: 'red' }}>
            Children
          </_GridItem_>
        </Grid>
      );

      expect(screen.getByText('Children').parentElement.style.gridTemplateColumns).toBe(
        '400px 400px 400px'
      );
    });
  });
});
