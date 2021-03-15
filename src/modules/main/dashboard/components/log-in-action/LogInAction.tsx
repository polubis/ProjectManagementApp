import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { Action, Button } from 'ui';

import { Guard } from 'shared/guards';

const LogInAction: FC = memo(
  () => {
    return (
      <Guard.Unprotected>
        <Action
          description="Some features are disabled for not authorized users"
          operations={
            <Link to="/login">
              <Button>LOG IN</Button>
            </Link>
          }
          title="Log in to use all application features"
        />
      </Guard.Unprotected>
    );
  },
  () => true
);

export default LogInAction;
