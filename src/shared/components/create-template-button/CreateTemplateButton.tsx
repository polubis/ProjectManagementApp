import React, { memo, FC } from 'react';
import { NavLink } from 'react-router-dom';

import AddTemplateIcon from '@material-ui/icons/Queue';

import { Button } from 'ui';

const PATH = '/app/templates/management';

interface Props {
  onClick?(): void;
}

const CreateTemplateButton: FC<Props> = memo(({ onClick }) => (
  <NavLink replace to={PATH} onClick={onClick}>
    <Button>
      <AddTemplateIcon />
      ADD TEMPLATE
    </Button>
  </NavLink>
));

const CreateTemplateMobileButton: FC<Props> = memo(({ onClick }) => (
  <NavLink replace to={PATH} onClick={onClick}>
    <Button variant="icon">
      <AddTemplateIcon />
    </Button>
  </NavLink>
));

export { CreateTemplateButton, CreateTemplateMobileButton };
