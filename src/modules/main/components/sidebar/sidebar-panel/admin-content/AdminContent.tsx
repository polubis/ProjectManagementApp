import React from 'react';
import { Route } from 'react-router';

import { CreatePatternButton, CreateTechnologyButton } from 'shared/components';

import AdminContentLinks from './admin-content-links';
import ContentHeader from '../content-header';
import { useSidebarProvider } from '../../SidebarProvider';

import csx from './AdminContent.scss';

const AdminContent = (): JSX.Element => {
  const { toggleOpen } = useSidebarProvider();

  return (
    <div className={csx.adminContent}>
      <ContentHeader description="Manage application content" title="Admin panel" />

      <AdminContentLinks onLinkClick={toggleOpen} />

      <Route
        path="/app/admin/dictionaries"
        render={() => <CreatePatternButton onClick={toggleOpen} />}
      />
      <Route
        path="/app/admin/dictionaries"
        render={() => <CreateTechnologyButton onClick={toggleOpen} />}
      />
    </div>
  );
};

export default AdminContent;
