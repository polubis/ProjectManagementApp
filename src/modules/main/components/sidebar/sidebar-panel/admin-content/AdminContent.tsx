import React from 'react';
import { Route } from 'react-router';

import { CreatePatternButton, CreateTechnologyButton } from 'shared/components';

import ContentHeader from '../content-header';

import csx from './AdminContent.scss';

const AdminContent = (): JSX.Element => {
  return (
    <div className={csx.adminContent}>
      <ContentHeader description="Manage application content" title="Admin panel" />

      <Route path="/app/admin/dictionaries" component={CreatePatternButton} />
      <Route path="/app/admin/dictionaries" component={CreateTechnologyButton} />
    </div>
  );
};

export default AdminContent;
