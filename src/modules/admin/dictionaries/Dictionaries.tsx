import React from 'react';
import { useRouteMatch } from 'react-router';

import Categories from './categories';
import PatternsTab from './patterns-tab';
import TechnologiesTab from './technologies-tab';
import { useRouteValidation } from './hooks';

import { Category, RouteProps } from '.';

import csx from './Dictionaries.scss';

const tabs = {
  [Category.TECHNOLOGIES]: <TechnologiesTab />,
  [Category.PATTERNS]: <PatternsTab />
};

const Dictionaries = () => {
  const {
    params: { category }
  } = useRouteMatch<RouteProps>();

  useRouteValidation(category);

  return (
    <div className={csx.dictionaries}>
      <Categories />

      {tabs[category]}
    </div>
  );
};

export default Dictionaries;
