import React, { FC } from 'react';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { Button } from 'ui';

import csx from './GroupTile.scss';

namespace GroupTile {
  export interface Props {
    description: string;
    name: string;
    templatesCount: number;
    usersCount: number;
    topicCount: number;
    onClick?(): void;
  }
}

const GroupTile: FC = ({}) => {
  return (
    <div
      className={csx.groupTile}
      style={{
        backgroundImage: `url(https://billennium.pl/wp-content/uploads/2019/08/Billennium-22-768x512.jpg)`,
      }}
    >
      <header>
        <span>JavaScript funboys</span>
        <h5>Billennium</h5>
      </header>

      <div className={csx.badges}>
        <div className={csx.badge}>
          <span>12</span>
          <span>Users</span>
        </div>

        <div className={csx.badge}>
          <span>12</span>
          <span>Templates</span>
        </div>

        <div className={csx.badge}>
          <span>12</span>
          <span>Topics</span>
        </div>
      </div>

      <Button>
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default GroupTile;
