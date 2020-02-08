import React from 'react';

import { useForm, FormConfig, FormSubmitEvent } from 'shared/forms';
import { Button, Text } from 'shared/ui';

import classes from './Credentials.scss';

interface CredentialsProps {
  formConfig: FormConfig;
  onFormSubmit: () => void;
}

const Credentials = ({ formConfig, onFormSubmit }: CredentialsProps) => {
  const [state, handleChange, handleSubmit] = useForm(formConfig);

  const handleFormSubmit = (e: FormSubmitEvent) => {
    if (!handleSubmit(e)) {
      onFormSubmit();
    }
  };

  return (
    <form className={classes.root} onSubmit={handleFormSubmit}>
      {formConfig.map((formConfig, idx) => (
        <div className={classes.field}>
          <Text variant="label">{formConfig.label}</Text>
          <input
            data-idx={idx}
            placeholder={`Type your ${formConfig.label}`}
            value={state.fields[idx].value}
            onChange={handleChange}
          />
        </div>
      ))}

      <Button variant="filled">Next</Button>
    </form>
  );
};

export default Credentials;
