import React, { FC } from 'react';

import SearchIcon from '@material-ui/icons/Search';

import csx from './NavigationSearch.scss';

namespace NavigationSearch {
  export interface Props {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  }
}

const NavigationSearch: FC<NavigationSearch.Props> = ({ onChange }) => {
  return (
    <div className={csx.navigationSearch}>
      <label htmlFor="search">
        <SearchIcon />
      </label>
      <input id="search" autoComplete="off" placeholder="Search..." onChange={onChange} />
    </div>
  );
};

export default NavigationSearch;
