import React from 'react';

import { Button, Input, InjectedStepProps, Text } from 'shared/ui';

import classes from './AuthStep.scss';

const AuthStep = ({ ...rest }) => {
  const { onStepChange, idx } = rest as InjectedStepProps;

  return (
    <form
      className={classes.root}
      onSubmit={e => {
        e.preventDefault();
        onStepChange(idx + 1);
      }}
    >
      <div>
        <Text variant="label" color="primary">
          Email *
        </Text>
        <Input autoFocus placeholder="Email *" type="email" />
      </div>
      <div>
        <Text variant="label" color="primary">
          Password *
        </Text>
        <Input placeholder="Password *" type="password" />
      </div>
      <div>
        <Text variant="label" color="primary">
          Repeated password *
        </Text>
        <Input placeholder="Repeated password *" type="password" />
      </div>

      <Button type="submit" variant="filled">
        NEXT
      </Button>
    </form>
  );
};

export default AuthStep;
