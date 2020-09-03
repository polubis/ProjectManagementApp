import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Category } from './models';
import AdminCategories from './admin-categories/AdminCategories';
import TechnologiesTab from './technologies-tab/TechnologiesTab';
import PatternsTab from './patterns-tab/PatternsTab';

import csx from './Admin.scss';

const tabs = {
  [Category.TECHNOLOGIES]: <TechnologiesTab />,
  [Category.PATTERNS]: <PatternsTab />,
};

const Admin = () => {
  const { category } = useParams();

  return (
    <div className={csx.adminContainer}>
      <AdminCategories />
      {tabs[category]}
    </div>
  );
};

export default Admin;
