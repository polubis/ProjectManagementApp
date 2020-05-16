import React from 'react';

import { Button, Field } from 'shared/ui';

import { RegisterStepProps } from '.';

export const Credentials = ({
  formManager: [{ isDirty, fields, isInvalid }, change],
  onSubmit
}: RegisterStepProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Field
        data-idx={0}
        label="Email *"
        placeholder="Type email adress..."
        type="email"
        error={isDirty ? fields[0].error : ''}
        value={fields[0].value}
        onChange={change}
      />

      <Field
        data-idx={1}
        label="Password *"
        placeholder="Type password..."
        type="password"
        error={isDirty ? fields[1].error : ''}
        value={fields[1].value}
        onChange={change}
      />

      <Field
        data-idx={2}
        label="Repeated password *"
        placeholder="Repeat your password..."
        type="password"
        error={isDirty ? fields[2].error : ''}
        value={fields[2].value}
        onChange={change}
      />

      <Button type="submit" disabled={isDirty && isInvalid}>
        NEXT
      </Button>
    </form>
  );
};
