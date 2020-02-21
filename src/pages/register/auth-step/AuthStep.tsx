import React from 'react';

import { Button, Input, Label } from 'shared/ui';

import classes from './AuthStep.scss';

const AuthStep = () => {
  return (
    <form className={classes.root}>
      <div>
        <Label color="primary">Email *</Label>
        <Input placeholder="Email *" type="email" />
      </div>
      <div>
        <Label color="primary">Password *</Label>
        <Input placeholder="Password *" type="password" />
      </div>
      <div>
        <Label color="primary">Repeated password *</Label>
        <Input placeholder="Repeated password *" type="password" />
      </div>

      <Button type="submit" variant="filled">
        NEXT
      </Button>
    </form>
  );
};

export default AuthStep;
