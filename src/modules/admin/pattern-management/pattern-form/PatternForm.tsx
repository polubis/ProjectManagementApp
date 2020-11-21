import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

import { StepHeader, InputField, TextareaField, Button } from 'ui';

import { Form, V } from 'utils';

import { addPattern, editPattern, Pattern } from 'core/api';

import csx from './PatternForm.scss';

const [NAME, DESCRIPTION] = [0, 1];
const CONFIG: Form.Config = [
  { label: 'Name', fns: [V.req] },
  { label: 'Description', fns: [V.req] },
];

const makeConfig = (data?: Pattern): Form.Config => {
  if (data) {
    return [
      { ...CONFIG[NAME], value: data.name },
      { ...CONFIG[DESCRIPTION], value: data.description },
    ];
  }

  return CONFIG;
};

namespace PatternForm {
  export interface Props {
    data?: Pattern;
    id?: string;
  }
}

const PatternForm = ({ data, id }: PatternForm.Props) => {
  const history = useHistory();

  const [pending, setPending] = useState(false);

  const [{ dirty, invalid, fields }, change, _, submit] = Form.useManager(makeConfig(data));

  const handleSubmit = useCallback(
    async (e: Form.Events.Submit) => {
      if (!submit(e)) {
        setPending(true);

        try {
          if (id === undefined) {
            await addPattern({
              name: fields[NAME].value,
              description: fields[DESCRIPTION].value,
            });
          } else {
            await editPattern(+id, {
              name: fields[NAME].value,
              description: fields[DESCRIPTION].value,
            });
          }

          history.replace(`/app/admin/dictionaries/patterns?query=${fields[NAME].value}`);
        } catch {
          setPending(false);
        }
      }
    },
    [fields, id]
  );

  return (
    <form className={csx.patternForm} onSubmit={handleSubmit}>
      <StepHeader
        label={id === undefined ? 'Add pattern' : 'Edit pattern'}
        description="Fill required fields and submit"
      />

      <InputField
        data-idx={NAME}
        label="Name *"
        placeholder="Pattern name..."
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
        placeholder="Pattern description..."
      />

      <Button disabled={(dirty && invalid) || pending} type="submit" theme="primaryDark">
        SUBMIT
      </Button>
    </form>
  );
};

export default PatternForm;
