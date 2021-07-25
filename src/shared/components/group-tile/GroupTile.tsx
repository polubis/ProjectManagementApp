import React, { FC } from 'react';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { Group } from 'shared/models';
import { Button } from 'ui';

import csx from './GroupTile.scss';

namespace GroupTile {
  export interface Props {
    data: Group;
    onClick(groupId: string): void;
  }
}

const GroupTile: FC<GroupTile.Props> = ({ data, onClick }) => {
  return (
    <div
      className={csx.groupTile}
      style={{
        backgroundImage: `url(${data.thumbnailUrl})`,
      }}
    >
      <header>
        <span>{data.description}</span>
        <h5>{data.name}</h5>
      </header>

      <div className={csx.badges}>
        <div className={csx.badge}>
          <span>{data.membersCount}</span>
          <span>Members</span>
        </div>

        <div className={csx.badge}>
          <span>{data.templatesCount}</span>
          <span>Templates</span>
        </div>

        <div className={csx.badge}>
          <span>{data.topicsCount}</span>
          <span>Topics</span>
        </div>
      </div>

      <Button onClick={() => onClick(data.id)}>
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default GroupTile;
