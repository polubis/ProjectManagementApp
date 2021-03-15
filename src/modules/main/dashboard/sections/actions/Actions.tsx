import React, { FC } from 'react';

import {
  AddTemplateAction,
  ConnectGithubAction,
  LogInAction,
  SectionLayout,
} from '../../components';

const Actions: FC = () => {
  return (
    <SectionLayout title="Actions">
      <LogInAction />

      <AddTemplateAction />

      <ConnectGithubAction />
    </SectionLayout>
  );
};

export default Actions;
