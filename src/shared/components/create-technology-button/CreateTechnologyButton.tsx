import React, { memo, FC } from 'react';
import { NavLink } from 'react-router-dom';

import CodeIcon from '@material-ui/icons/Code';

import { Button } from 'ui';

const PATH = '/app/admin/dictionaries/technologies/management';

interface Props {
  onClick?(): void;
}

const CreateTechnologyButton: FC<Props> = memo(({ onClick }) => (
  <NavLink replace to={PATH} onClick={onClick}>
    <Button>
      <CodeIcon />
      ADD TECHNOLOGY
    </Button>
  </NavLink>
));

const CreateTechnologyMobileButton: FC<Props> = memo(({ onClick }) => (
  <NavLink replace to={PATH} onClick={onClick}>
    <Button variant="icon">
      <CodeIcon />
    </Button>
  </NavLink>
));

export { CreateTechnologyButton, CreateTechnologyMobileButton };
