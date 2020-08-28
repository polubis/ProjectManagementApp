import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import AdminTabCategory from './models';
import AdminTabCategories from './admin-tab-categories/AdminTabCategories';
import TechnologiesTab from './technologies-tab/TechnologiesTab';
import PatternsTab from './patterns-tab/PatternsTab';

import csx from './Admin.scss';

const renderTabContent = (category: string) => {
  let component: JSX.Element;
  switch (category) {
    case AdminTabCategory.TECHNOLOGIES:
      component = <TechnologiesTab />;
      break;
    case AdminTabCategory.PATTERNS:
      component = <PatternsTab />;
      break;
  }

  return component;
};

const Admin = () => {
  const { category } = useParams();

  const tabContent = useMemo(() => renderTabContent(category), [category]);

  return (
    <div className={csx.adminContainer}>
      <AdminTabCategories />
      {tabContent}
    </div>
  );
};

export default Admin;
