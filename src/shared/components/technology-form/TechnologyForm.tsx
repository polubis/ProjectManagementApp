import React from 'react';

import { Button, Modal, InputField, TextareaField, FileField } from 'ui';

import { Form, V } from 'utils';

import csx from './TechnologyForm.scss';

namespace TechnologyForm {
  export interface Props {
    onSuccess(): void;
  }
}

const CONFIG: Form.Config = [
  { label: 'Name', fns: [V.req] },
  { label: 'Description', fns: [V.req] },
  {
    label: 'Picture',
    value: [],
    fns: [({ length }: FileList) => V.makeResult(!length, 'Field is required')]
  }
];

const [NAME, DESCRIPTION, PICTURE] = Array.from({ length: CONFIG.length }, (_, i) => i);

const TechnologyForm = ({}: TechnologyForm.Props) => {
  const [{ dirty, fields, invalid }, change, directChange, submit] = Form.useManager(CONFIG);

  return (
    <Modal className={csx.technologyForm}>
      <form onSubmit={submit}>
        <InputField
          data-idx={NAME}
          label="Name *"
          placeholder="Type name..."
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
          placeholder="Type description..."
        />

        <FileField
          data-idx={PICTURE}
          error={dirty ? fields[PICTURE].error : ''}
          label="Picture *"
          value={fields[PICTURE].value}
          onChange={change}
        />

        <Button disabled={dirty && invalid} type="submit">
          CREATE
        </Button>
      </form>
    </Modal>
  );
};

export default TechnologyForm;
