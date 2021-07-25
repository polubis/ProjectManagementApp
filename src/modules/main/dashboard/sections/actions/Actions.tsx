import React, { FC } from 'react';

import {
  AddTemplateAction,
  AddGroupAction,
  ConnectGithubAction,
  LogInAction,
  SectionLayout,
} from '../../components';

const Actions: FC = () => {
  return (
    <SectionLayout title="Actions">
      <LogInAction />
      <AddGroupAction />
      <AddTemplateAction />
      <ConnectGithubAction />
    </SectionLayout>
  );
};

export default Actions;
