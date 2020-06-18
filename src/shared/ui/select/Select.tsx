import React, { useState, useCallback, useMemo } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Chip } from '@material-ui/core';

import { FieldBase, SelectProps, SelectMenuProps, Menu, SelectItem, Checkbox } from '..';

import csx from './Select.scss';

export const Select = ({
  label,
  placeholder = label,
  className,
  openClass = csx.menuOpen,
  error,
  items,
  onSelect
}: SelectProps) => {
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
          <Menu<Checkbox.Props, SelectMenuProps>
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
