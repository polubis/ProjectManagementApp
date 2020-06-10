import React, { useState, useCallback } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Chip } from '@material-ui/core';

import { FieldBase, SelectProps, Menu, selectMenuConfig } from '..';

import csx from './Select.scss';

export const Select = ({ label, placeholder = label, error, items, onSelect }: SelectProps) => {
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

  const selectedItems = items.filter(({ value }) => value);

  return (
    <FieldBase label={label} error={error}>
      <div className={`${csx.select} ${isMenuOpen ? csx.menuOpen : ''}`}>
        <div className={csx.selectedItems}>
          {selectedItems.length > 0 ? (
            selectedItems.map(({ id, label }) => (
              <Chip
                key={id}
                data-id={id}
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
          <Menu
            {...selectMenuConfig}
            id={label}
            anchorEl={anchorEl}
            onClose={closeMenu}
            onSelect={onSelect}
            items={items}
          />
        )}
      </div>
    </FieldBase>
  );
};
