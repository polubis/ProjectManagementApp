import React from 'react';

import { InputField, TextareaField, Button } from 'ui';

import { Form } from 'utils';

import { NAME, DESCRIPTION } from '../..';

namespace BasicInfo {
  export interface Props {
    formManager: Form.Manager;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const BasicInfo = ({ formManager, onSubmit }: BasicInfo.Props) => {
  const [{ dirty, fields, invalid }, change] = formManager;

  return (
    <form onSubmit={onSubmit}>
      <InputField
        data-idx={NAME}
        label="Name *"
        placeholder="Type template name..."
        error={dirty ? fields[NAME].error : ''}
        value={fields[NAME].value}
        onChange={change}
      />

      <TextareaField
        data-idx={DESCRIPTION}
        label="Description *"
        error={dirty ? fields[DESCRIPTION].error : ''}
        value={fields[DESCRIPTION].value}
        onChange={change}
        placeholder="Add template description..."
      />

      <Button type="submit" disabled={dirty && invalid}>
        NEXT
      </Button>
    </form>
  );
};

export default BasicInfo;
