import React, { useCallback, useMemo } from 'react';

import {
  Button,
  DateField,
  InputField,
  SelectBase,
  FieldBase,
  SimpleSelect,
  SelectControl
} from 'ui';

import { Form } from 'utils';

import { FIRST_NAME, LAST_NAME, BIRTH_DATE, GENDER, GENDERS } from '../../..';

import csx from './PersonalInfo.scss';

namespace PersonalInfo {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const makeGenderItems = (value: { [key: string]: boolean }) => () =>
  GENDERS.map(
    (item, idx) =>
      ({
        dataIdx: '' + idx,
        label: item,
        value: !!value[idx]
      } as SelectBase.Item)
  );

const PersonalInfo = ({ formManager, onBack, onSubmit }: PersonalInfo.Props) => {
  const [{ dirty, fields, invalid }, change, directChange] = formManager;

  const handleGenderSelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      directChange([GENDER], [{ [dataIdx]: value }]);
    },
    [fields]
  );

  const handleBirthDateChange = useCallback(
    (date: string) => {
      directChange([BIRTH_DATE], [date]);
    },
    [fields]
  );

  const mappedGenderItems = useMemo(makeGenderItems(fields[GENDER].value), [fields]);

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

        <FieldBase label="Gender *" error={dirty ? fields[GENDER].error : ''}>
          <SimpleSelect items={mappedGenderItems} onSelect={handleGenderSelect}>
            <SelectControl
              label={selected => mappedGenderItems[+selected[0]].label}
              placeholder="Select gender..."
              value={fields[GENDER].value}
            ></SelectControl>
          </SimpleSelect>
        </FieldBase>
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
