import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Tabs } from '..';

describe('<Tabs>', () => {
  it('assigns className', () => {
    const { container } = render(
      <Tabs active="Item" className="class" onClick={() => {}}>
        <>Item</>
        <>Item1</>
      </Tabs>,
    );

    expect(container.querySelector('.class')).toBeInTheDocument();
  });

  it('renders children', () => {
    const { rerender } = render(
      <Tabs active="Item" className="class" onClick={() => {}}>
        <>Item</>
        <>Item1</>
      </Tabs>,
    );

    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Item1')).toBeInTheDocument();

    rerender(
      <Tabs active="Item" className="class" onClick={() => {}}>
        <>Item3</>
      </Tabs>,
    );

    expect(screen.getByText('Item3')).toBeInTheDocument();
  });

  it('highlights active', () => {
    render(
      <Tabs active="Item" className="class" onClick={() => {}}>
        <>Item</>
        <>Item1</>
      </Tabs>,
    );

    expect(screen.getByText('Item').closest('button').className).toContain('active');
    expect(screen.getByText('Item1').closest('button').className).not.toContain('active');
  });

  it('calls onClick', () => {
    const spy = jest.fn();
    render(
      <Tabs active="Item" className="class" onClick={spy}>
        <>Item</>
        <>Item1</>
      </Tabs>,
    );

    fireEvent.click(screen.getByText('Item'));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith('Item');
  });
});
