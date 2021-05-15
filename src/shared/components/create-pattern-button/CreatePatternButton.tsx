import React, { memo, FC } from 'react';
import { NavLink } from 'react-router-dom';

import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import { Button } from 'ui';

const PATH = '/app/admin/dictionaries/patterns/management';

interface Props {
  onClick?(): void;
}

const CreatePatternButton: FC<Props> = memo(({ onClick }) => (
  <NavLink replace to={PATH} onClick={onClick}>
    <Button>
      <PlaylistAddIcon />
      ADD PATTERN
    </Button>
  </NavLink>
));

const CreatePatternMobileButton: FC<Props> = memo(({ onClick }) => (
  <NavLink replace to={PATH} onClick={onClick}>
    <Button variant="icon">
      <PlaylistAddIcon />
    </Button>
  </NavLink>
));

export { CreatePatternButton, CreatePatternMobileButton };
