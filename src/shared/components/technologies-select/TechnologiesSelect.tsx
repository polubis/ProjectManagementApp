import React, { useMemo, useState, useCallback } from 'react';
import { FixedSizeList } from 'react-window';

import CodeIcon from '@material-ui/icons/Code';
import SearchIcon from '@material-ui/icons/Search';

import { useMenu, Button, Menu, Checkbox } from 'ui';

import { Form } from 'utils';

import { Technology, TechnologiesSelectListItem } from '..';

import csx from './TechnologiesSelect.scss';

namespace TechnologiesSelect {
  export type OnSelect = (dataIdx: string | number, checked: boolean) => void;

  export interface Item {
    dataIdx: string | number;
    label: string;
    value: boolean;
  }

  export interface Props {
    items: Item[];
    onSelect: OnSelect;
  }
}

const MENU_WIDTH = 390;

const filterItems = (phrase: string, items: TechnologiesSelect.Item[]) =>
  phrase ? items.filter(item => item.label.toLowerCase().includes(phrase.toLowerCase())) : items;

const getChecked = (items: TechnologiesSelect.Item[]) => () =>
  items.filter(({ value }) => value).reverse();

const TechnologiesSelect = ({ items, onSelect }: TechnologiesSelect.Props) => {
  const [phrase, setPhrase] = useState('');

  const [anchorEl, isMenuOpen, openMenu, closeMenu] = useMenu();

  const handleChange = useCallback((e: Form.Events.Change) => {
    setPhrase(e.target.value);
  }, []);

  const handleSelect: Checkbox.OnChange = useCallback(
    (e, checked) => {
      onSelect(e.currentTarget.getAttribute('data-idx'), checked);
    },
    [onSelect]
  );

  const itemData = useMemo(
    () =>
      ({
        items: filterItems(phrase, items),
        onSelect: handleSelect
      } as TechnologiesSelectListItem.Data),
    [phrase, items, handleSelect]
  );

  const checkedItems = useMemo(getChecked(items), [items]);

  return (
    <>
      <Button theme="primaryTransparent" className={csx.btn} onClick={openMenu}>
        <CodeIcon />
      </Button>

      {isMenuOpen && (
        <Menu
          keepMounted={false}
          width={MENU_WIDTH}
          anchorEl={anchorEl}
          className={csx.menu}
          onClose={closeMenu}
        >
          <header>
            <SearchIcon />
            <input
              autoFocus
              autoComplete="off"
              placeholder="Search technologies..."
              onChange={handleChange}
            />
          </header>

          <div className={csx.list}>
            <FixedSizeList
              itemSize={50}
              height={300}
              width={MENU_WIDTH}
              itemCount={itemData.items.length}
              itemData={itemData}
            >
              {TechnologiesSelectListItem}
            </FixedSizeList>
          </div>

          {checkedItems.length > 0 && (
            <div className={csx.checkedItems}>
              {checkedItems.map(item => (
                <Technology
                  key={item.dataIdx}
                  name={item.label}
                  avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png"
                  onClick={() => onSelect(item.dataIdx, false)}
                />
              ))}
            </div>
          )}
        </Menu>
      )}
    </>
  );
};

export default TechnologiesSelect;
