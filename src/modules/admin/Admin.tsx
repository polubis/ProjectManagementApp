import React from 'react';
import { useParams } from 'react-router-dom';
import csx from './Admin.scss';
import AdminTabCategories, { AdminTabCategory } from './admin-tab-categories/AdminTabCategories';
import TechnologiesTab from './technologies-tab/TechnologiesTab';
import PatternsTab from './patterns-tab/PatternsTab';

const Admin = () => {
  const { category } = useParams();

  const renderTabContent = () => {
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

  const tabContent = React.useMemo(renderTabContent, [category]);

  return (
    <div className={csx.container}>
      <AdminTabCategories />
      {/* <TechnologiesTab />
      <PatternsTab /> */}
      {tabContent}
    </div>
  );
};

export default Admin;
