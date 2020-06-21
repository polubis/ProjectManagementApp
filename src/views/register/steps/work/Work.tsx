import React from 'react';

import { Button, InputField, Select } from 'ui';

import { WorkProps, WorkImage } from '.';

import csx from './Work.scss';

export const Work = ({
  formManager: [{ dirty, fields, invalid }, change, directChange, submit],
  onSkip,
  onBack,
  onSubmit
}: WorkProps) => {
  return (
    <form className={csx.work} onSubmit={submit}>
      <WorkImage />

      <span className={csx.description}>
        Informations below will be displayed in your user profile
      </span>

      <div className={csx.fields}>
        <InputField
          data-idx={0}
          label="Position"
          placeholder="Type your position..."
          error={dirty ? fields[0].error : ''}
          value={fields[0].value}
          onChange={change}
        />

        <Select
          label="Seniority"
          placeholder="Seniority..."
          items={fields[1].value}
          error={dirty ? fields[1].error : ''}
          onSelect={(e, value) => {}}
        />
      </div>

      <div className={csx.fields}>
        <InputField
          data-idx={2}
          label="Company"
          placeholder="Type company..."
          error={dirty ? fields[2].error : ''}
          value={fields[2].value}
          onChange={change}
        />

        <InputField
          data-idx={3}
          label="Years of experience"
          placeholder="Experience..."
          error={dirty ? fields[3].error : ''}
          value={fields[3].value}
          onChange={change}
        />
      </div>

      <Select
        label="Technologies"
        placeholder="Choose technologies..."
        items={fields[4].value}
        error={dirty ? fields[4].error : ''}
        onSelect={(e, value) => {}}
      />

      <footer>
        <Button type="button" theme="primaryTransparent" onClick={onBack}>
          BACK
        </Button>

        <Button type="button" theme="primaryTransparent" onClick={onSkip}>
          SKIP
        </Button>

        <Button type="submit" disabled={dirty && invalid}>
          NEXT
        </Button>
      </footer>
    </form>
  );
};
