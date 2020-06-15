import React from 'react';

import { Button, Field, DateField, Select, CheckboxProps } from 'shared/ui';

import { PersonalInfoProps } from '.';

import csx from './PersonalInfo.scss';

export const PersonalInfo = ({
  formManager: [{ isDirty, fields, isInvalid }, change, directChange, submit],
  onBack,
  onSkip,
  onSubmit
}: PersonalInfoProps) => {
  const updateGender = (e: React.ChangeEvent<HTMLInputElement>, idx: number, value: boolean) => {
    const id = +e.currentTarget.getAttribute('data-id');
    const items: CheckboxProps[] = fields[idx].value.map((item) =>
      id === item.id
        ? {
            ...item,
            value
          }
        : { ...item, value: false }
    );
    directChange([idx], [items]);
  };

  return (
    <form className={csx.personalInfo} onSubmit={submit}>
      <Field
        data-idx={0}
        label="First name *"
        placeholder="Type first name..."
        error={isDirty ? fields[0].error : ''}
        value={fields[0].value}
        onChange={change}
      />

      <Field
        data-idx={1}
        label="Last name *"
        placeholder="Type last name..."
        error={isDirty ? fields[1].error : ''}
        value={fields[1].value}
        onChange={change}
      />

      <div className={csx.fieldGroup}>
        <DateField
          data-idx={2}
          label="Birth date *"
          error={isDirty ? fields[2].error : ''}
          value={fields[2].value}
          onChange={change}
          onSelect={(value) => directChange([2], [value])}
        />

        <Select
          label="Gender *"
          placeholder="Choose gender..."
          items={fields[3].value}
          error={isDirty ? fields[3].error : ''}
          onSelect={(e, value) => updateGender(e, 3, value)}
        />
      </div>

      <footer>
        <Button type="button" theme="primaryTransparent" onClick={onBack}>
          BACK
        </Button>

        <Button type="button" theme="primaryTransparent" onClick={onSkip}>
          SKIP
        </Button>

        <Button type="submit" disabled={isDirty && isInvalid}>
          NEXT
        </Button>
      </footer>
    </form>
  );
};
