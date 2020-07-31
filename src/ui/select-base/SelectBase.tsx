import React, { ReactElement, ReactNode, ComponentType, useCallback, useMemo } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { Checkbox, Menu, useMenu } from '..';

import csx from './SelectBase.scss';

// ON OFF SEKCJI
// SEARCH
// WYBOR KOMPONENTU W STOPCE

namespace SelectBase {
  export namespace Events {
    export type Click = React.MouseEvent<HTMLElement, MouseEvent>;
  }

  export type OnSelect = (dataIdx: string, value: boolean) => void;

  export interface Item {
    dataIdx: string;
    label: string;
    value: boolean;
  }

  export interface ListChildData {
    items: Item[];
    onSelect: Checkbox.OnChange;
  }

  // Poprawic typowanie zeby bral tylko komponenty
  export type Children = [ReactNode, ComponentType<ListChildComponentProps>];

  export interface Props {
    children: Children;
    items: Item[];
    height?: number;
    itemSize?: number;
    width?: number;
    onSelect: OnSelect;
  }

  export interface ListChildProps extends Omit<ListChildComponentProps, 'data'> {
    data: ListChildData;
  }
}

const CONTROL = 0,
  LIST_ITEM = 1;

const SelectBase = ({
  children,
  items,
  height = 300,
  itemSize = 48,
  width = 300,
  onSelect
}: SelectBase.Props) => {
  const [anchorEl, isMenuOpen, openMenu, closeMenu] = useMenu();

  const handleSelect: Checkbox.OnChange = useCallback(
    (e, value) => {
      onSelect(e.currentTarget.getAttribute('data-idx'), value);
    },
    [onSelect]
  );

  const enhancedChildren = React.Children.map(children, (child: ReactElement, idx) => {
    if (idx === CONTROL) {
      return React.cloneElement(child, {
        ...child.props,
        onClick: (e: SelectBase.Events.Click) => {
          if (child.props.onClick) {
            child.props.onClick(e);
          }

          openMenu(e);
        }
      });
    }

    return child;
  });

  const itemsData: SelectBase.ListChildData = useMemo(
    () => ({
      items,
      onSelect: handleSelect
    }),
    [items, handleSelect]
  );

  return (
    <>
      {enhancedChildren[CONTROL]}

      {isMenuOpen && (
        <Menu anchorEl={anchorEl} width={width} onClose={closeMenu}>
          <FixedSizeList
            itemCount={items.length}
            itemData={itemsData}
            itemSize={itemSize}
            height={height}
            width={width}
          >
            {children[LIST_ITEM]}
          </FixedSizeList>
        </Menu>
      )}
    </>
  );
};

export default SelectBase;
