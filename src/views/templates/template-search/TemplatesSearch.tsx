import React, { useState, useCallback, useContext } from 'react';

import { Button } from '@material-ui/core';

import ChevronIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';

import { TechnologiesContext } from 'providers/technologies';

import { Menu } from 'shared/ui';

import csx from './TemplatesSearch.scss';

export const TemplatesSearch = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { technologies, isLoading } = useContext(TechnologiesContext);

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

  return (
    <form className={csx.templatesSearch}>
      <input placeholder="Find your template..." className={csx.input} />

      <Button
        type="button"
        aria-controls="technologies-menu"
        aria-haspopup="true"
        className={`${csx.technologiesBtn} ${isMenuOpen ? csx.technologiesBtnActive : ''}`}
        disabled={isLoading}
        onClick={openMenu}
      >
        All technologies
        <ChevronIcon />
      </Button>

      {isMenuOpen && (
        <Menu
          id="technologies-menu"
          anchorEl={anchorEl}
          items={technologies}
          onSelect={() => {}}
          onClose={closeMenu}
        />
      )}

      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};
