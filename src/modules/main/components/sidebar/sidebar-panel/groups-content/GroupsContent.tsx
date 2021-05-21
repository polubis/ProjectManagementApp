import React from 'react';

import { CreateGroupButton } from 'shared/components';

import ContentHeader from '../content-header';
import { useSidebarProvider } from '../../SidebarProvider';

import csx from './GroupsContent.scss';

const GroupsContent = (): JSX.Element => {
  const { toggleOpen } = useSidebarProvider();

  return (
    <div className={csx.groupsContent}>
      <ContentHeader description="Browse and manage groups" title="Groups" />
      <CreateGroupButton onClick={toggleOpen} />
    </div>
  );
};

export default GroupsContent;
