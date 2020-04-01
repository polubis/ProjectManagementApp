import React, { useState } from 'react';

import { Button, Checkbox, FormControlLabel, Menu } from '@material-ui/core';

import ChevronIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';

import csx from './TemplateSearch.scss';

const technologies = [
  { id: 0, name: 'React JS', image: '' },
  { id: 1, name: 'Angular JS', image: '' },
  { id: 2, name: 'Vue JS', image: '' },
  { id: 3, name: 'Svelte', image: '' }
];

export const TemplateSearch = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <form className={csx.templateSearch}>
      <input placeholder="Find your template..." className={csx.input} />
      <Button
        type="button"
        aria-controls="technologies-menu"
        aria-haspopup="true"
        className={`${csx.technologiesBtn} ${isMenuOpen ? csx.technologiesBtnActive : ''}`}
        onClick={handleClick}
      >
        All technologies
        <ChevronIcon />
      </Button>
      <Menu
        id="technologies-menu"
        classes={{
          paper: csx.technologiesMenu
        }}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {technologies.map(tech => (
          <FormControlLabel
            key={tech.id}
            control={
              <Checkbox
                classes={{ root: csx.technologyCheckbox, checked: csx.technologyCheckboxChecked }}
              />
            }
            label={tech.name}
          />
        ))}
      </Menu>
      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};
