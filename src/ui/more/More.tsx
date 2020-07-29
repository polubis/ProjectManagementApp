import React, { ReactElement } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button, Menu, useMenu } from '..';

import csx from './More.scss';

namespace More {
  export type Props = {
    children: ReactElement[];
    width?: number;
  };

  export namespace Events {
    export type OnClick = React.MouseEvent<HTMLElement, MouseEvent>;
  }

  export interface InjectedProps {
    onClick(e: Events.OnClick): void;
  }
}

const More = ({ children, width = 160 }: More.Props) => {
  const [anchorEl, isMenuOpen, openMenu, closeMenu] = useMenu();

  const enhancedChildren = React.Children.map(children, (child: ReactElement<More.InjectedProps>) =>
    React.cloneElement(child, {
      ...child.props,
      onClick: (e: More.Events.OnClick) => {
        if (child.props.onClick) {
          child.props.onClick(e);
        }
        closeMenu();
      }
    } as More.InjectedProps)
  );

  return (
    <>
      <Button className={csx.btn} onClick={openMenu}>
        MORE
        <ExpandMoreIcon />
      </Button>

      {isMenuOpen && (
        <Menu
          keepMounted={false}
          className={csx.menu}
          anchorEl={anchorEl}
          width={width}
          onClose={closeMenu}
        >
          {enhancedChildren.map((children, idx) => (
            <Button key={idx} theme="primaryTransparent">
              {children}
            </Button>
          ))}
        </Menu>
      )}
    </>
  );
};

export default More;
