import React, { useCallback } from 'react';

import { Button, DateField, InputField, SelectBase, SimpleSelect } from 'ui';

import { Form } from 'utils';

import { FIRST_NAME, LAST_NAME, BIRTH_DATE, GENDER, GENDER_LIST } from '../../..';

import ListItem from './list-item';

import csx from './PersonalInfo.scss';

namespace PersonalInfo {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const PersonalInfo = ({ formManager, onBack, onSubmit }: PersonalInfo.Props) => {
  const [{ dirty, fields, invalid }, change, directChange] = formManager;

  // const handleGenderSelect = useCallback(
  //   (e) => {
  //     console.log(fields)
  //     directChange([GENDER], [{...fields,e}]);
      
  //   },
  //   [fields]
  // );

  const handleBirthDateChange = useCallback(
    (date: string) => {
      directChange([BIRTH_DATE], [date]);
    },
    [fields]
  );

  const placeholderRender = GENDER_LIST.map(e => {
    return e.label;
  })

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

        <SelectBase
          children={<SimpleSelect value={placeholderRender} label="Gender" />}
          listItem={ListItem}
          items={GENDER_LIST}
          onSelect={handleGenderSelect}
          searchable={false}
          height={100}
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
