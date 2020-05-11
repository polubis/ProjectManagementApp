import React from 'react';

import { Button, Field, Checkbox } from 'shared/ui';

import { TemplateManagementStepProps } from '.';

import csx from './GithubConnection.scss';

export const GithubConnection = ({
  formManager: [{ isDirty, isInvalid, fields }, change, directChange],
  onSubmit
}: TemplateManagementStepProps) => {
  const handlePublishAccessChange = (_, checked: boolean) => {
    directChange([1, 2], [checked, !checked]);
  };

  const handlePrivateAccessChange = (_, checked: boolean) => {
    directChange([1, 2], [!checked, checked]);
  };

  return (
    <form onSubmit={onSubmit}>
      <Field
        data-idx={0}
        label="Repository link *"
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
