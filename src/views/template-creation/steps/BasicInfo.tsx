import React from 'react';

import { Button, Field, TextareaField } from 'shared/ui';

import { TemplateManagementStepProps } from '.';

export const BasicInfo = ({
  formManager: [{ isDirty, fields, isInvalid }, change],
  onSubmit
}: TemplateManagementStepProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Field
        data-idx={0}
        label="Name *"
        placeholder="Type template name..."
        error={isDirty ? fields[0].error : ''}
        value={fields[0].value}
        onChange={change}
      />

      <TextareaField
        data-idx={1}
        label="Description *"
        error={isDirty ? fields[1].error : ''}
        value={fields[1].value}
        onChange={change}
        placeholder="Add template description..."
      />

      <Button type="submit" disabled={isDirty && isInvalid}>
        NEXT
      </Button>
    </form>
  );
};
