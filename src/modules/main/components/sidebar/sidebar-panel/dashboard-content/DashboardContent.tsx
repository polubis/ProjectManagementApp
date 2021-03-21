import React from 'react';

import ContentHeader from '../content-header';

import csx from './DashboardContent.scss';

const DashboardContent = (): JSX.Element => {
  return (
    <div className={csx.dashboardContent}>
      <ContentHeader description="Core informations in single palce" title="Dashboard" />
    </div>
  );
};

export default DashboardContent;
