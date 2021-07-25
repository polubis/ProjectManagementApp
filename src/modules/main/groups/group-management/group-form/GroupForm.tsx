import React, { useState, useCallback, FC } from 'react';
import { useHistory } from 'react-router';

import { StepHeader, InputField, TextareaField, Button } from 'ui';

import { Form, V } from 'utils';

import { addGroup, editGroup } from 'shared/services';
import { Group, GroupCategory } from 'shared/models';
import { useAlertsProvider } from 'shared/providers/alerts';

import csx from './GroupForm.scss';

const [NAME, DESCRIPTION] = [0, 1];
const CONFIG: Form.Config = [
  { label: 'Name', fns: [V.req, V.min(3), V.max(100)] },
  { label: 'Description', fns: [V.min(3), V.max(100)] },
];

const makeConfig = (data?: Group): Form.Config => {
  if (data) {
    return [
      { ...CONFIG[NAME], value: data.name },
      { ...CONFIG[DESCRIPTION], value: data.description },
    ];
  }

  return CONFIG;
};

namespace GroupForm {
  export interface Props {
    data?: Group;
    id?: string;
  }
}

const GroupForm: FC<GroupForm.Props> = ({ data, id }) => {
  const history = useHistory();

  const { showAlert } = useAlertsProvider();

  const [pending, setPending] = useState(false);

  const [{ dirty, invalid, fields }, change, directChange, submit] = Form.useManager(
    makeConfig(data)
  );

  const handleSubmit = useCallback(
    async (e: Form.Events.Submit) => {
      if (!submit(e)) {
        setPending(true);

        try {
          if (data === undefined) {
            await addGroup({
              name: fields[NAME].value,
              description: fields[DESCRIPTION].value,
            });

            showAlert({ message: 'Group has been successfully added', type: 'success' });
            history.replace(`/app/groups/${GroupCategory.ALL}/${id}`);
          } else {
            await editGroup(id, {
              name: fields[NAME].value,
              description: fields[DESCRIPTION].value,
            });

            showAlert({ message: 'Group has been successfully edited', type: 'success' });
            history.replace(`/app/groups/${GroupCategory.ALL}/${id}`);
          }
        } catch (message) {
          setPending(false);
          showAlert({ message });
        }
      }
    },
    [fields, id]
  );

  return (
    <form className={csx.groupForm} onSubmit={handleSubmit}>
      <StepHeader
        label={data === undefined ? 'Add group' : 'Edit group'}
        description="Fill required fields and submit"
      />

      <InputField
        data-idx={NAME}
        label="Name *"
        placeholder="Group name..."
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
        placeholder="Group description..."
      />

      <Button disabled={(dirty && invalid) || pending} type="submit" theme="primaryDark">
        SUBMIT
      </Button>
    </form>
  );
};

export default GroupForm;
