import React, { FC, memo } from 'react';

import { Action, Button } from 'ui';

import { Guard } from 'shared/guards';

import csx from './ConnectGithubAction.scss';

const ConnectGithubAction: FC = memo(
  () => {
    return (
      <Guard.Protected>
        {({ user: { connectedWithGithub }, logInViaGithub }) =>
          connectedWithGithub ? null : (
            <Action
              description="Some features will be disabled. Link your account 
          now or later"
              operations={<Button onClick={logInViaGithub}>CONNECT TO GITHUB</Button>}
              title={
                <span className={csx.title}>
                  <span>No connection</span> with <span>Github</span>
                </span>
              }
            />
          )
        }
      </Guard.Protected>
    );
  },
  () => true
);

export default ConnectGithubAction;
