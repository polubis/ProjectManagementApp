import React from 'react';
import { useRouteMatch } from 'react-router';

import { AdminRouteProps, Category } from './models'
import AdminCategories from './admin-categories';
import TechnologiesTab from './technologies-tab/TechnologiesTab';
import PatternsTab from './patterns-tab/PatternsTab';
import { useRouteValidation } from './hooks';

import csx from './Admin.scss';

const tabs = {
  [Category.TECHNOLOGIES]: <TechnologiesTab />,
  [Category.PATTERNS]: <PatternsTab />,
};

const Admin = () => {
  const {
    params: { category }
  } = useRouteMatch<AdminRouteProps>();

  useRouteValidation();

  return (
    <div className={csx.adminContainer}>
      <AdminCategories />
      {tabs[category]}
    </div>
  );
};

export default Admin;
