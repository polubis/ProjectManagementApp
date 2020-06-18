import React, { useState, useCallback, useMemo, ChangeEvent } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Chip } from '@material-ui/core';

import { FieldBase, Menu, SelectItem, Checkbox } from '..';

import csx from './Select.scss';

namespace Select {
  export type OnSelect = (event: ChangeEvent<HTMLInputElement>, checked?: boolean) => void;

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
    return items.filter(({ value }) => value);
  }, [items]);

  return (
    <FieldBase className={className} label={label} error={error}>
      <div className={`${csx.select} ${isMenuOpen ? openClass : ''}`}>
        <div className={csx.selectedItems}>
          {selectedItems.length > 0 ? (
            selectedItems.map(({ dataId, label }) => (
              <Chip
                key={dataId}
                data-id={dataId}
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

export default Select;