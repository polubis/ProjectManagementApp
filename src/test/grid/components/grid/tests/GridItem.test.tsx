import React from 'react';
import { render, screen } from '@testing-library/react';

import GridItem from '../GridItem';

describe('<GridItem>', () => {
  it('renders children', () => {
    render(
      <GridItem cellsIds="1,1">
        <div>Children</div>
      </GridItem>
    );

    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('assigns style', () => {
    render(
      <GridItem cellsIds="1,1" style={{ background: 'red' }}>
        Children
      </GridItem>
    );

    expect(screen.getByText('Children').style.background).toBe('red');
  });
});
