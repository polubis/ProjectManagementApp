import React from 'react';

import { Button, Field, TextareaField } from 'ui';

import { TemplateManagementStepProps } from '.';

export const BasicInfo = ({
  formManager: [{ dirty, fields, invalid }, change],
  onSubmit
}: TemplateManagementStepProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Field
        data-idx={0}
        label="Name *"
        placeholder="Type template name..."
        error={dirty ? fields[0].error : ''}
        value={fields[0].value}
        onChange={change}
      />

      <TextareaField
        data-idx={1}
        label="Description *"
        error={dirty ? fields[1].error : ''}
        value={fields[1].value}
        onChange={change}
        placeholder="Add template description..."
      />

      <Button type="submit" disabled={dirty && invalid}>
        NEXT
      </Button>
    </form>
  );
};
