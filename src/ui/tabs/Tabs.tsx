import React, { ReactElement, useCallback, memo } from 'react';

import { Button } from '..';

import csx from './Tabs.scss';

namespace Tabs {
  export interface Props {
    active: string;
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    onClick(label: string): void;
  }
}

const Tabs = memo(
  ({ active, children, className = '', onClick }: Tabs.Props): JSX.Element => {
    const enhancedChildren = React.Children.map(children, (child: ReactElement) => ({
      Component: child,
      label: child ? child.props.children : '',
    }));

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        onClick(e.currentTarget.getAttribute('data-label'));
      },
      [onClick]
    );

    return (
      <nav className={`${csx.tabs} ${className}`}>
        {enhancedChildren
          .filter(({ Component }) => !!Component)
          .map(({ Component, label }, idx) => (
            <Button
              key={idx}
              data-label={label}
              active={active ? active.toLowerCase() === label.toLowerCase() : false}
              className={csx.tab}
              theme="secondary"
              onClick={handleClick}
            >
              {Component}
            </Button>
          ))}
      </nav>
    );
  }
);

export default Tabs;
