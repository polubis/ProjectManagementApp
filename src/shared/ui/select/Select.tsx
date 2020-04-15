import React, { useState } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Menu } from '@material-ui/core';

import { Checkbox, Field } from '..';

import csx from './Select.scss';

export interface SelectItem {
  label: string;
  value: boolean;
}

export interface SelectProps {
  label: string;
  items: SelectItem[];
  placeholder?: string;
  onSelect(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void;
}

export const Select = ({ label, placeholder = label, items, onSelect }: SelectProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = ({ currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <Field label={label}>
      <div className={`${csx.select} ${isMenuOpen ? csx.menuOpen : ''}`}>
        <input placeholder={placeholder} disabled />
        <Button aria-haspopup="true" type="button" aria-controls={label} onClick={openMenu}>
          <ExpandMoreIcon />
        </Button>
        <Menu
          id={label}
          classes={{
            paper: csx.selectMenu
          }}
          getContentAnchorEl={null}
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={closeMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {items.map((item, idx) => (
            <Checkbox key={idx} dataIdx={idx} onChange={onSelect} {...item} />
          ))}
        </Menu>
      </div>
    </Field>
  );
};
