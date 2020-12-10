import React from 'react';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SecurityIcon from '@material-ui/icons/Security';

import { User } from 'shared/models';

import { More, Button } from 'ui';

import csx from './OptionsItem.scss';

namespace OptionsItem {
  export interface Props {
    user: User;
    onRolesEditClick(user: User): void;
  }
}

const OptionsItem = ({ user, onRolesEditClick }: OptionsItem.Props): JSX.Element => {
  return (
    <More
      trigger={(open) => (
        <Button className={csx.moreBtn} onClick={open} theme="primaryTransparent" variant="icon">
          <MoreHorizIcon />
        </Button>
      )}
    >
      <div onClick={() => onRolesEditClick(user)}>
        <SecurityIcon />
        EDIT ROLES
      </div>
    </More>
  );
};

export default OptionsItem;
