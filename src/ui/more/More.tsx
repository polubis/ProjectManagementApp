import React, { ReactElement } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button, Menu, useMenu } from '..';

import csx from './More.scss';

namespace More {
  export type Props = {
    children: ReactElement[];
  };

  export namespace Events {
    export type Click = React.MouseEvent<HTMLElement, MouseEvent>;
  }

  export interface InjectedProps {
    onClick(e: Events.Click): void;
  }
}

const More = ({ children }: More.Props) => {
  const [anchorEl, menuOpen, openMenu, closeMenu] = useMenu();

  const enhancedChildren = React.Children.map(children, (child: ReactElement<More.InjectedProps>) =>
    React.cloneElement(child, {
      ...child.props,
      onClick: (e: More.Events.Click) => {
        if (child.props.onClick) {
          child.props.onClick(e);
        }
        closeMenu();
      }
    } as More.InjectedProps)
  );

  return (
    <>
      <Button className={csx.moreBtn} onClick={openMenu}>
        MORE
        <ExpandMoreIcon />
      </Button>

      {menuOpen && (
        <Menu anchorEl={anchorEl} width={160} onClose={closeMenu}>
          {enhancedChildren.map((children, idx) => (
            <Button key={idx} theme="primaryTransparent" className={csx.item}>
              {children}
            </Button>
          ))}
        </Menu>
      )}
    </>
  );
};

export default More;
