import React, { ReactElement, memo } from 'react';

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

const Tabs = memo(({
  active, children, className = '', onClick,
}: Tabs.Props) => {
  const enhancedChildren = React.Children.map(children, (child: ReactElement) => ({
    Component: child,
    label: child ? child.props.children : '',
  }));

  return (
    <nav className={`${csx.tabs} ${className}`}>
      {enhancedChildren.map(({ Component, label }, idx) => (
        <Button
          key={idx}
          active={active ? active.toLowerCase() === label.toLowerCase() : false}
          className={csx.tab}
          theme="secondary"
          onClick={() => onClick(label)}
        >
          {Component}
        </Button>
      ))}
    </nav>
  );
});

export default Tabs;
