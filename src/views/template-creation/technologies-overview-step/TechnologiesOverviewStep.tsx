import React from 'react';

import { useForm, FormSubmitEvent } from 'shared/forms';
import { Button, Field } from 'shared/ui';

import { TemplateCreationStepProps } from '..';

export const TechnologiesOverviewStep = ({ config, onSubmit }: TemplateCreationStepProps) => {
  const [state, change, directChange, submit] = useForm(config);

  const handleSubmit = (e: FormSubmitEvent) => {
    const isInvalid = submit(e);

    if (isInvalid) {
      return;
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {config.map((config, idx) => (
        <Field
          key={idx}
          data-idx={idx}
          label={`${config.label} *`}
          // placeholder={config.placeholder}
          error={state.isDirty && state.fields[idx].error}
          value={state.fields[idx].value}
          onChange={change}
        />
      ))}

      <Button type="submit" disabled={state.isDirty && state.isInvalid}>
        NEXT
      </Button>
    </form>
  );
};
