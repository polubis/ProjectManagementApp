import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import AddTemplateIcon from '@material-ui/icons/Queue';

import { Button } from 'ui';

const PATH = '/app/templates/management';

const CreateTemplateButton = memo(
  (): JSX.Element => (
    <NavLink replace to={PATH}>
      <Button>
        <AddTemplateIcon />
        ADD TEMPLATE
      </Button>
    </NavLink>
  )
);

const CreateTemplateMobileButton = memo(
  (): JSX.Element => (
    <NavLink replace to={PATH}>
      <Button variant="icon">
        <AddTemplateIcon />
      </Button>
    </NavLink>
  )
);

export { CreateTemplateButton, CreateTemplateMobileButton };
