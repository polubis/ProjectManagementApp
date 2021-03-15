import React, { FC } from 'react';

import { useAuthProvider } from 'shared/providers/auth';

import { Actions, HallOfFame, RecommendedTemplates } from './sections';

import csx from './Dashboard.scss';

const Dashboard: FC = () => {
  const { pending } = useAuthProvider();

  return (
    <div className={csx.dashboard}>
      {pending || (
        <>
          <Actions />
          <HallOfFame />
          <RecommendedTemplates />
        </>
      )}
    </div>
  );
};

export default Dashboard;
