import React, { memo, FC } from 'react';
import { NavLink } from 'react-router-dom';

import AddGroupIcon from '@material-ui/icons/GroupAdd';

import { Button } from 'ui';

const PATH = '/app/groups/management';

interface Props {
  onClick?(): void;
}

const CreateGroupButton: FC<Props> = memo(({ onClick }) => (
  <NavLink replace to={PATH} onClick={onClick}>
    <Button>
      <AddGroupIcon />
      ADD GROUP
    </Button>
  </NavLink>
));

const CreateGroupMobileButton: FC<Props> = memo(({ onClick }) => (
  <NavLink replace to={PATH} onClick={onClick}>
    <Button variant="icon">
      <AddGroupIcon />
    </Button>
  </NavLink>
));

export { CreateGroupButton, CreateGroupMobileButton };
