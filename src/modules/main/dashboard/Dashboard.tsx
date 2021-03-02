import React, { FC } from 'react';

import { useAuthProvider } from 'shared/providers/auth';

import { Actions, RecentTemplates, TemplatesToExplore } from './sections';

import csx from './Dashboard.scss';

const Dashboard: FC = () => {
  const { pending } = useAuthProvider();

  return (
    <div className={csx.dashboard}>
      {pending || (
        <>
          <Actions />
          <RecentTemplates />
          <TemplatesToExplore />
        </>
      )}
    </div>
  );
};

export default Dashboard;
