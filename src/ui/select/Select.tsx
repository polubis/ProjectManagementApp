import React, { useMemo, useCallback } from 'react';
import { FixedSizeList } from 'react-window';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Chip } from '@material-ui/core';

import { FieldBase, Menu, SelectItem, Checkbox, useMenu } from '..';

import csx from './Select.scss';

namespace Select {
  export type OnSelect = (dataIdx: string | number, checked: boolean) => void;

  export interface Item {
    dataIdx: number | string;
    label: string;
    value?: boolean;
  }

  export interface Props {
    label: string;
    items: Item[];
    className?: string;
    error?: string;
    placeholder?: string;
    onSelect: OnSelect;
  }

  export interface MenuProps {
    onSelect: OnSelect;
  }
}

const MENU_WIDTH = 400;

const getChecked = (items: Select.Item[]) => items.filter(({ value }) => value).reverse();

const Select = ({
  label,
  placeholder = label,
  className,
  error,
  items,
  onSelect
}: Select.Props) => {
  const [anchorEl, isMenuOpen, openMenu, closeMenu] = useMenu();

  const checkedItems = useMemo(() => getChecked(items), [items]);

  const handleSelect: Checkbox.OnChange = useCallback(
    (e, checked) => {
      onSelect(e.currentTarget.getAttribute('data-idx'), checked);
    },
    [onSelect]
  );

  const itemData = useMemo(
    () =>
      ({
        items,
        onSelect: handleSelect
      } as SelectItem.Data),
    [items, handleSelect]
  );

  return (
    <FieldBase className={className} label={label} error={error}>
      <div className={`${csx.select} ${isMenuOpen ? csx.opened : ''}`}>
        <div className={csx.selectedItems}>
          {checkedItems.length > 0 ? (
            checkedItems.map(({ dataIdx, label }) => (
              <Chip
                key={dataIdx}
                data-idx={dataIdx}
                label={label}
                className={csx.selectedItem}
                onClick={() => onSelect(dataIdx, false)}
                size="small"
                variant="outlined"
              />
            ))
          ) : (
            <span className={csx.placeholder}>{placeholder}</span>
          )}
        </div>

        <Button className={csx.toggleBtn} onClick={openMenu}>
          <ExpandMoreIcon />
        </Button>

        {isMenuOpen && (
          <Menu keepMounted={false} width={MENU_WIDTH} anchorEl={anchorEl} onClose={closeMenu}>
            <FixedSizeList
              itemSize={40}
              height={MENU_WIDTH}
              width={MENU_WIDTH}
              itemCount={itemData.items.length}
              itemData={itemData}
            >
              {SelectItem}
            </FixedSizeList>
          </Menu>
        )}
      </div>
    </FieldBase>
  );
};

Select.makeItems = (items: any[], idKey: string, labelKey: string) =>
  items.map(
    item =>
      ({
        dataIdx: item[idKey],
        label: item[labelKey]
      } as Select.Item)
  );

Select.makeValues = (items: any[], idKey: string, value = true) =>
  items.reduce((prev, curr) => ({ ...prev, [curr[idKey]]: value }), {});

Select.getChecked = (value: { [key: string]: boolean }) => Object.keys(value).filter(k => value[k]);

export default Select;
