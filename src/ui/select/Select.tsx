import React, { useState, useCallback, useMemo, ChangeEvent } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Chip } from '@material-ui/core';

import { FieldBase, Menu, SelectItem, Checkbox } from '..';

import csx from './Select.scss';

namespace Select {
  export namespace Events {
    export type Select = ChangeEvent<HTMLInputElement>;
  }

  export type OnSelect = (event: Events.Select, checked?: boolean) => void;

  export interface Item {
    dataIdx: number | string;
    label: string;
  }

  export interface Props {
    label: string;
    items: Item[];
    value: { [key: string]: boolean };
    className?: string;
    openClass?: string;
    error?: string;
    placeholder?: string;
    onSelect: OnSelect;
  }

  export interface MenuProps {
    onSelect: OnSelect;
  }
}

const Select = ({
  label,
  placeholder = label,
  className,
  openClass = csx.menuOpen,
  error,
  value,
  items,
  onSelect
}: Select.Props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = useCallback(
    ({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setAnchorEl(currentTarget);
    },
    []
  );

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const isMenuOpen = Boolean(anchorEl);

  const selectedItems = useMemo(() => items.filter(({ dataIdx }) => value[dataIdx]).reverse(), [
    items,
    value
  ]);

  const mappedItems = useMemo(
    () =>
      items.map(
        ({ dataIdx, label }) =>
          ({
            dataIdx,
            label,
            value: !!value[dataIdx]
          } as Checkbox.Props)
      ),
    [items, value]
  );

  return (
    <FieldBase className={className} label={label} error={error}>
      <div className={`${csx.select} ${isMenuOpen ? openClass : ''}`}>
        <div className={csx.selectedItems}>
          {selectedItems.length > 0 ? (
            selectedItems.map(({ dataIdx, label }) => (
              <Chip
                key={dataIdx}
                data-idx={dataIdx}
                label={label}
                className={csx.selectedItem}
                onClick={onSelect as any}
                size="small"
                variant="outlined"
              />
            ))
          ) : (
            <span className={csx.placeholder}>{placeholder}</span>
          )}
        </div>

        <Button
          aria-haspopup="true"
          type="button"
          aria-controls={label}
          className={csx.toggleBtn}
          onClick={openMenu}
        >
          <ExpandMoreIcon />
        </Button>

        {isMenuOpen && (
          <Menu<Checkbox.Props, Select.MenuProps>
            width={400}
            id={label}
            anchorEl={anchorEl}
            items={mappedItems}
            onClose={closeMenu}
            onSelect={onSelect}
          >
            {SelectItem}
          </Menu>
        )}
      </div>
    </FieldBase>
  );
};

Select.select = (
  e: Select.Events.Select,
  value: boolean,
  values: { [key: string]: boolean } = {}
) => ({ ...values, [+e.currentTarget.getAttribute('data-idx')]: value });

Select.makeItems = (items: any[], idKey: string, labelKey: string) =>
  items.map(
    (item) =>
      ({
        dataIdx: item[idKey],
        label: item[labelKey]
      } as Select.Item)
  );

Select.makeValues = (items: any[], idKey: string, value = true) =>
  items.reduce((prev, curr) => ({ ...prev, [curr[idKey]]: value }), {});

Select.getChecked = (value: { [key: string]: boolean }) =>
  Object.keys(value).filter((k) => value[k]);

export default Select;
