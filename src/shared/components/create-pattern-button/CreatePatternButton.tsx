import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import { Button } from 'ui';

const PATH = '/app/admin/dictionaries/patterns/management';

const CreatePatternButton = memo(
  (): JSX.Element => (
    <NavLink replace to={PATH}>
      <Button>
        <PlaylistAddIcon />
        CREATE PATTERN
      </Button>
    </NavLink>
  )
);

const CreatePatternMobileButton = memo(
  (): JSX.Element => (
    <NavLink replace to={PATH}>
      <Button variant="icon">
        <PlaylistAddIcon />
      </Button>
    </NavLink>
  )
);

export { CreatePatternButton, CreatePatternMobileButton };
