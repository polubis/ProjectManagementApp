import React, { ReactElement, ComponentType, useCallback, useMemo, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import SearchIcon from '@material-ui/icons/Search';

import { Form } from 'utils';

import { Checkbox, Menu, useMenu } from '..';

import csx from './SelectBase.scss';

// ON OFF SEKCJI
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

  export type Children = [ReactElement, ComponentType<ListChildComponentProps>];

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

const filterItems = (phrase: string, items: SelectBase.Item[]) => () =>
  phrase ? items.filter(({ label }) => label.toLowerCase().includes(phrase.toLowerCase())) : items;

const SelectBase = ({
  children,
  items,
  height = 300,
  itemSize = 48,
  width = 300,
  onSelect
}: SelectBase.Props) => {
  const [phrase, setPhrase] = useState('');

  const [anchorEl, isMenuOpen, openMenu, closeMenu] = useMenu();

  const handleSelect: Checkbox.OnChange = useCallback(
    (e, value) => {
      onSelect(e.currentTarget.getAttribute('data-idx'), value);
    },
    [onSelect]
  );

  const handleChange = useCallback((e: Form.Events.Change) => {
    setPhrase(e.target.value);
  }, []);

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

  const filteredItems = useMemo(filterItems(phrase, items), [phrase, items]);

  const itemsData: SelectBase.ListChildData = useMemo(
    () => ({
      items: filteredItems,
      onSelect: handleSelect
    }),
    [filteredItems, handleSelect]
  );

  return (
    <>
      {enhancedChildren[CONTROL]}

      {isMenuOpen && (
        <Menu anchorEl={anchorEl} keepMounted={false} width={width} onClose={closeMenu}>
          <div className={csx.menu}>
            <header>
              <SearchIcon />
              <input placeholder="Filter items..." onChange={handleChange} />
            </header>

            <FixedSizeList
              itemCount={filteredItems.length}
              itemData={itemsData}
              itemSize={itemSize}
              height={height}
              width={width}
            >
              {children[LIST_ITEM]}
            </FixedSizeList>
          </div>
        </Menu>
      )}
    </>
  );
};

export default SelectBase;
