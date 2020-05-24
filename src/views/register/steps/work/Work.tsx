import React from 'react';

import { Field, Select, Button } from 'shared/ui';

import { WorkProps, WorkImage } from '.';

import csx from './Work.scss';

export const Work = ({
  formManager: [{ isDirty, fields, isInvalid }, change, directChange, submit],
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
        <Field
          data-idx={0}
          label="Position"
          placeholder="Type your position..."
          error={isDirty ? fields[0].error : ''}
          value={fields[0].value}
          onChange={change}
        />

        <Select
          label="Seniority"
          placeholder="Seniority..."
          items={fields[1].value}
          error={isDirty ? fields[1].error : ''}
          onSelect={(e, value) => {}}
        />
      </div>

      <div className={csx.fields}>
        <Field
          data-idx={2}
          label="Company"
          placeholder="Type company..."
          error={isDirty ? fields[2].error : ''}
          value={fields[2].value}
          onChange={change}
        />

        <Field
          data-idx={3}
          label="Years of experience"
          placeholder="Experience..."
          error={isDirty ? fields[3].error : ''}
          value={fields[3].value}
          onChange={change}
        />
      </div>

      <Select
        label="Technologies"
        placeholder="Choose technologies..."
        items={fields[4].value}
        error={isDirty ? fields[4].error : ''}
        onSelect={(e, value) => {}}
      />

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
