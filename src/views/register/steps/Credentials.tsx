import React from 'react';

import { FormManager, FormConfig } from 'shared/forms';

import { Field, Button } from 'shared/ui';

interface CredentialsProps {
  formConfig: FormConfig;
  formManager: FormManager;
}

export const Credentials = ({
  formConfig,
  formManager: [{ fields }, change, directChange, submit]
}: CredentialsProps) => {
  return (
    <form onSubmit={submit}>
      {fields.map((field, idx) => (
        <Field
          key={idx}
          data-idx={idx}
          label={formConfig[idx].label}
          placeholder={`Type your ${formConfig[idx].label}`}
          onChange={change}
          value={field.value}
          error={field.error}
        />
      ))}

      <Button type="submit">NEXT</Button>
    </form>
  );
};
