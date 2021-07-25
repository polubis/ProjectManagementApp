import React, { FC } from 'react';

import { Group } from 'shared/models';
import { GroupTile, GroupTileLoader } from 'shared/components';
import { Button, Disclaimer, ErrorAction } from 'ui';

import csx from './GroupsGrid.scss';

namespace GroupsGrid {
  export interface Props {
    loading: boolean;
    groups: Group[];
    error: boolean;
    spaceholdersCount: number;
    onReloadClick(): void;
    onGroupClick(groupId: string): void;
  }
}

const GroupsGrid: FC<GroupsGrid.Props> = ({
  groups,
  error,
  spaceholdersCount,
  loading,
  onGroupClick,
  onReloadClick,
}) => {
  if (loading) {
    return (
      <div className={csx.groupsGrid}>
        {Array.from({ length: spaceholdersCount }, (_, idx) => (
          <GroupTileLoader key={idx} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorAction
        className={csx.errorAction}
        description="Right now we cannot load grups. Please try again later"
        operations={<Button onClick={onReloadClick}>RELOAD</Button>}
        title="Groups load failed"
      />
    );
  }

  if (groups.length === 0) {
    return (
      <Disclaimer
        description="Change filters to find groups"
        title="No results for current filters"
      />
    );
  }

  return (
    <div className={csx.groupsGrid}>
      {groups.map((group) => (
        <GroupTile data={group} key={group.id} onClick={onGroupClick} />
      ))}
    </div>
  );
};

export default GroupsGrid;
