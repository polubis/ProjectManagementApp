import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import CodeIcon from '@material-ui/icons/Code';

import { Button } from 'ui';

const PATH = '/app/admin/dictionaries/technologies/management';

const CreateTechnologyButton = memo(
  (): JSX.Element => (
    <NavLink replace to={PATH}>
      <Button>
        <CodeIcon />
        CREATE TECHNOLOGY
      </Button>
    </NavLink>
  )
);

const CreateTechnologyMobileButton = memo(
  (): JSX.Element => (
    <NavLink replace to={PATH}>
      <Button variant="icon">
        <CodeIcon />
      </Button>
    </NavLink>
  )
);

export { CreateTechnologyButton, CreateTechnologyMobileButton };
