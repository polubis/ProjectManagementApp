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

  export interface Props {
    label: string;
    items: Checkbox.Props[];
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

  const selectedItems = useMemo(() => {
    return items.filter(({ value }) => value).reverse();
  }, [items]);

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
            items={items}
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

Select.updateItems = (
  items: Checkbox.Props[],
  e: Select.Events.Select,
  value: boolean,
  unselectOthers = false
): Checkbox.Props[] => {
  const id = +e.currentTarget.getAttribute('data-idx');

  if (unselectOthers) {
    return items.map(item => (id === item.dataIdx ? { ...item, value } : { ...item, value: false }));
  } else {
    return items.map(item => (id === item.dataIdx ? { ...item, value } : item));
  }
};

Select.makeItems = (items: any[], idKey: string, labelKey: string) => {
  return items.map(
    item =>
      ({
        dataIdx: item[idKey],
        label: item[labelKey],
        value: false
      } as Checkbox.Props)
  );
};

export default Select;
