import React from 'react';

import { useForm, FormSubmitEvent } from 'shared/forms';
import { Button, Field, Checkbox } from 'shared/ui';

import { TemplateCreationStepProps } from '..';

import csx from './GithubConnectionStep.scss';

export const GithubConnectionStep = ({ config, onSubmit }: TemplateCreationStepProps) => {
  const [{ isDirty, isInvalid, fields }, change, directChange, submit] = useForm(config);

  const handleSubmit = (e: FormSubmitEvent) => {
    const isInvalid = submit(e);

    if (isInvalid) {
      return;
    }

    onSubmit();
  };

  const handlePublishAccessChange = (_, checked) => {
    directChange([1, 2], [checked, !checked]);
  };

  const handlePrivateAccessChange = (_, checked) => {
    directChange([1, 2], [!checked, checked]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field
        data-idx={0}
        label={`Repository link *`}
        placeholder="Add repository link..."
        error={isDirty && fields[0].error}
        value={fields[0].value}
        onChange={change}
      />

      <div className={csx.access}>
        <Checkbox
          variant="informing"
          label="Make the template public - all users will see it"
          value={fields[1].value}
          onChange={handlePublishAccessChange}
        />

        <Checkbox
          variant="informing"
          label="Make the template private - only you will be able 
to view this template"
          value={fields[2].value}
          onChange={handlePrivateAccessChange}
        />
      </div>

      <Button type="submit" disabled={isDirty && isInvalid}>
        NEXT
      </Button>
    </form>
  );
};
