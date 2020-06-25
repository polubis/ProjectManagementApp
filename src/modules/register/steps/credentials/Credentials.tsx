import React from 'react';

import { Button, InputField } from 'ui';

import { RegisterStepProps } from '..';

export const Credentials = ({
  formManager: [{ dirty, fields, invalid }, change],
  onSubmit
}: RegisterStepProps) => {
  return (
    <form onSubmit={onSubmit}>
      <InputField
        data-idx={0}
        label="Email *"
        placeholder="Type email adress..."
        type="email"
        error={dirty ? fields[0].error : ''}
        value={fields[0].value}
        onChange={change}
      />

      <InputField
        data-idx={1}
        label="Password *"
        placeholder="Type password..."
        type="password"
        error={dirty ? fields[1].error : ''}
        value={fields[1].value}
        onChange={change}
      />

      <InputField
        data-idx={2}
        label="Repeated password *"
        placeholder="Repeat your password..."
        type="password"
        error={dirty ? fields[2].error : ''}
        value={fields[2].value}
        onChange={change}
      />

      <Button type="submit" disabled={dirty && invalid}>
        NEXT
      </Button>
    </form>
  );
};
