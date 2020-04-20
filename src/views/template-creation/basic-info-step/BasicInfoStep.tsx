import React from 'react';

import { useForm, FormSubmitEvent } from 'shared/forms';
import { Button, Field } from 'shared/ui';

import { TemplateCreationStepProps } from '..';

export const BasicInfoStep = ({ config, onSubmit }: TemplateCreationStepProps) => {
  const [{ isDirty, isInvalid, fields }, change, directChange, submit] = useForm(config);

  const handleSubmit = (e: FormSubmitEvent) => {
    const isInvalid = submit(e);

    if (isInvalid) {
      return;
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field
        data-idx={0}
        label="Name *"
        placeholder="Type template name..."
        error={isDirty && fields[0].error}
        value={fields[0].value}
        onChange={change}
      />

      <Field label="Description *" error={isDirty && fields[1].error}>
        <textarea
          data-idx={1}
          value={fields[1].value}
          onChange={change}
          placeholder="Add template description..."
        ></textarea>
      </Field>

      <Button type="submit" disabled={isDirty && isInvalid}>
        NEXT
      </Button>
    </form>
  );
};
