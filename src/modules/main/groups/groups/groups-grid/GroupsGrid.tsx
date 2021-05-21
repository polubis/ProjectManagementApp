import React, { FC } from 'react';

import { Group } from 'shared/models';
import { GroupTile } from 'shared/components';

import csx from './GroupsGrid.scss';

namespace GroupsGrid {
  export interface Props {
    groups: Group[];
  }
}

const GroupsGrid: FC<GroupsGrid.Props> = ({ groups }) => {
  return (
    <div className={csx.groupsGrid}>
      {groups.map((group) => (
        <GroupTile key={group.id} />
      ))}
    </div>
  );
};

export default GroupsGrid;
