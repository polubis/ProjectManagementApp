import React, { useCallback } from 'react';

import { Button, DateField, InputField, Select } from 'ui';

import { Form } from 'utils';

import csx from './PersonalInfo.scss';

namespace PersonalInfo {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const GENDER_LIST: Select.Item[] = [
  { dataIdx: 0, label: 'Male' },
  { dataIdx: 1, label: 'Female' }
];

const [FIRST_NAME, LAST_NAME, BIRTH_DATE, GENDER] = [0, 1, 2, 3];

const PersonalInfo = ({ formManager, onBack, onSubmit }: PersonalInfo.Props) => {
  const [{ dirty, fields, invalid }, change, directChange] = formManager;

  const handleGenderSelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([GENDER], [Select.select(e, value)]);
    },
    [fields]
  );

  const handleBirthDateChange = useCallback(
    (date: string) => {
      directChange([BIRTH_DATE], [date]);
    },
    [fields]
  );

  return (
    <form className={csx.personalInfo} onSubmit={onSubmit}>
      <InputField
        data-idx={FIRST_NAME}
        label="First name"
        placeholder="Type first name..."
        error={dirty ? fields[FIRST_NAME].error : ''}
        value={fields[FIRST_NAME].value}
        onChange={change}
      />

      <InputField
        data-idx={LAST_NAME}
        label="Last name"
        placeholder="Type last name..."
        error={dirty ? fields[LAST_NAME].error : ''}
        value={fields[LAST_NAME].value}
        onChange={change}
      />

      <div className={csx.fieldGroup}>
        <DateField
          data-idx={BIRTH_DATE}
          label="Birth date"
          error={dirty ? fields[BIRTH_DATE].error : ''}
          value={fields[BIRTH_DATE].value}
          onChange={change}
          onSelect={handleBirthDateChange}
        />

        <Select
          label="Gender"
          placeholder="Choose gender..."
          error={dirty ? fields[GENDER].error : ''}
          items={GENDER_LIST}
          value={fields[GENDER].value}
          onSelect={handleGenderSelect}
        />
      </div>

      <footer>
        <Button theme="primaryTransparent" onClick={onBack}>
          BACK
        </Button>

        <Button type="submit" theme="primaryTransparent">
          SKIP
        </Button>

        <Button type="submit" disabled={dirty && invalid}>
          NEXT
        </Button>
      </footer>
    </form>
  );
};

export default PersonalInfo;
