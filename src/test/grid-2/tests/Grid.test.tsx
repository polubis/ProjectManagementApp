import React from 'react';
import { render, screen } from '@testing-library/react';

import Grid from '../Grid';
import GridItem from '../GridItem';

describe('<Grid>', () => {
  const _CONFIG_: Grid.Config = {
    rowsCount: 3,
    columnsCount: 4,
    rowsGap: 16,
    columnsGap: 12,
    rowsHeightCreator: () => '250px',
    columnsWidthCreator: () => '200px',
  };

  it('renders children', () => {
    render(
      <Grid config={_CONFIG_}>
        <GridItem cellsIds="1">Children</GridItem>
        <GridItem cellsIds="2">Children</GridItem>
      </Grid>
    );

    expect(screen.queryAllByText('Children').length).toBe(2);
  });

  describe('creates grid layout style', () => {
    const testStyle = (style: CSSStyleDeclaration): void => {
      expect(style.getPropertyValue('display')).toBe('grid');
      expect(style.getPropertyValue('position')).toBe('relative');
      expect(style.getPropertyValue('gap')).toBe('16px 12px');
      expect(style.getPropertyValue('grid-template-rows')).toBe('250px 250px 250px');
      expect(style.getPropertyValue('grid-template-columns')).toBe('200px 200px 200px 200px');
    };

    it('when no additional style given', () => {
      render(
        <Grid config={_CONFIG_}>
          <GridItem cellsIds="1">Children</GridItem>
        </Grid>
      );

      const { style } = screen.queryByText('Children').parentElement;

      testStyle(style);
    });

    it('when additional style given', () => {
      render(
        <Grid config={_CONFIG_} style={{ background: 'red', gap: '16px' }}>
          <GridItem cellsIds="1">Children</GridItem>
        </Grid>
      );

      const { style } = screen.queryByText('Children').parentElement;

      testStyle(style);
      expect(style.getPropertyValue('background')).toBe('red');
    });
  });

  it('allows to add other properties to grid container', () => {
    render(
      <Grid config={_CONFIG_} className="my-class">
        <GridItem cellsIds="1">Children</GridItem>
      </Grid>
    );

    expect(screen.getByText('Children').parentElement.classList.length).toBe(1);
  });

  describe('creates grid children style', () => {
    it('when no additional style given', () => {
      const _LABELS_ = ['Children1', 'Children2', 'Children3', 'Children4'];

      render(
        <Grid config={_CONFIG_}>
          <GridItem cellsIds="1">{_LABELS_[0]}</GridItem>
          <GridItem cellsIds="5,8" groupId={0}>
            {_LABELS_[1]}
          </GridItem>
          <GridItem cellsIds="2,3" groupId={1}>
            {_LABELS_[2]}
          </GridItem>
          <GridItem
            cellsIds="9"
            style={{ background: 'red', zIndex: 1, gridRow: '2/2', gridColumn: '1/6' }}
          >
            {_LABELS_[3]}
          </GridItem>
        </Grid>
      );

      expect(screen.getByText(_LABELS_[0]).style.getPropertyValue('grid-row')).toBe('1/1');
      expect(screen.getByText(_LABELS_[0]).style.getPropertyValue('grid-column')).toBe('1/1');
      expect(screen.getByText(_LABELS_[0]).style.getPropertyValue('z-index')).toBe('');
      expect(screen.getByText(_LABELS_[0]).style.getPropertyValue('position')).toBe('relative');

      expect(screen.getByText(_LABELS_[1]).style.getPropertyValue('grid-row')).toBe('2/2');
      expect(screen.getByText(_LABELS_[1]).style.getPropertyValue('grid-column')).toBe('1/5');
      expect(screen.getByText(_LABELS_[1]).style.getPropertyValue('z-index')).toBe('0');
      expect(screen.getByText(_LABELS_[1]).style.getPropertyValue('position')).toBe('relative');

      expect(screen.getByText(_LABELS_[2]).style.getPropertyValue('grid-row')).toBe('1/1');
      expect(screen.getByText(_LABELS_[2]).style.getPropertyValue('grid-column')).toBe('2/4');
      expect(screen.getByText(_LABELS_[2]).style.getPropertyValue('z-index')).toBe('1');
      expect(screen.getByText(_LABELS_[2]).style.getPropertyValue('position')).toBe('relative');

      expect(screen.getByText(_LABELS_[3]).style.getPropertyValue('grid-row')).toBe('3/3');
      expect(screen.getByText(_LABELS_[3]).style.getPropertyValue('grid-column')).toBe('1/1');
      expect(screen.getByText(_LABELS_[3]).style.getPropertyValue('z-index')).toBe('');
      expect(screen.getByText(_LABELS_[3]).style.getPropertyValue('position')).toBe('relative');
      expect(screen.getByText(_LABELS_[3]).style.getPropertyValue('background')).toBe('red');
    });
  });
});
