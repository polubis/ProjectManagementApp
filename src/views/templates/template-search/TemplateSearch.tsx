import React, { useState } from 'react';

import { Button, Menu } from '@material-ui/core';

import ChevronIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';

import csx from './TemplateSearch.scss';

export const TemplateSearch = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <form className={csx.templateSearch}>
      <input placeholder="Find your template..." className={csx.input} />
      <Button
        type="button"
        aria-controls="simple-menu"
        aria-haspopup="true"
        className={csx.technologiesBtn}
        onClick={handleClick}
      >
        All technologies
        <ChevronIcon />
      </Button>
      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        siema
      </Menu>
      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};
