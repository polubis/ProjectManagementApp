import React, { ReactElement } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button, Menu, MoreItem, useMenu } from '..';

import csx from './More.scss';

namespace More {
  export type Props = {
    children: ReactElement[];
    width?: number;
    itemSize?: number;
  };

  export namespace Events {
    export type OnClick = React.MouseEvent<HTMLElement, MouseEvent>;
  }

  export interface InjectedProps {
    onClick(e: Events.OnClick): void;
  }
}

const More = ({ children, itemSize = 48, width = 160 }: More.Props) => {
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
      <Button className={csx.moreBtn} onClick={openMenu}>
        MORE
        <ExpandMoreIcon />
      </Button>

      {isMenuOpen && (
        <Menu<ReactElement, {}>
          anchorEl={anchorEl}
          items={enhancedChildren}
          itemSize={itemSize}
          height={children.length * itemSize}
          width={width}
          onClose={closeMenu}
        >
          {MoreItem}
        </Menu>
      )}
    </>
  );
};

export default More;
