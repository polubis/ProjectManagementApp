import React from 'react';

import { Guard } from 'shared/guards';
import { CreateTemplateButton } from 'shared/components';

import ContentHeader from '../content-header';
import { useSidebarProvider } from '../../SidebarProvider';

import csx from './DashboardContent.scss';

const DashboardContent = (): JSX.Element => {
  const { toggleOpen } = useSidebarProvider();

  return (
    <div className={csx.dashboardContent}>
      <ContentHeader description="Core informations in single palce" title="Dashboard" />
      <Guard.Protected>
        {({ user: { connectedWithGithub } }) => (
          <>{connectedWithGithub && <CreateTemplateButton onClick={toggleOpen} />}</>
        )}
      </Guard.Protected>
    </div>
  );
};

export default DashboardContent;
