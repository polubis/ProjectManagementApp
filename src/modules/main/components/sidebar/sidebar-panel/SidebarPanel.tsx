import React from 'react';
import { Route } from 'react-router';

import { Backdrop } from 'ui';

import { usePortal } from 'utils';

import { Breadcrumbs } from 'shared/components';
import { Guard } from 'shared/guards';

import AdminContent from './admin-content';
import DashboardContent from './dashboard-content';
import TemplatesContent from './templates-content';

import csx from './SidebarPanel.scss';

namespace SidebarPanel {
  export interface Props {
    onClose(): void;
  }
}

const SidebarPanel = ({ onClose }: SidebarPanel.Props): JSX.Element => {
  const render = usePortal();

  return (
    <>
      {render(
        <div className={csx.sidebarPanel}>
          <Breadcrumbs className={csx.breadcrumbs} divider="/" />

          <Guard.Admin>
            <Route path="/app/admin" component={AdminContent} />
          </Guard.Admin>
          <Route path="/app/dashboard" component={DashboardContent} />
          <Route path="/app/templates" component={TemplatesContent} />
        </div>
      )}
      <Backdrop className={csx.backdrop} onClick={onClose} />
    </>
  );
};

export default SidebarPanel;
