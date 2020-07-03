import React, { useCallback, useEffect } from 'react';

import { Button, InputField, Select } from 'ui';

import { Form } from 'utils';

import { useTechnologiesProvider } from 'core/technologies';

import { WorkImage } from '.';

import csx from './Work.scss';

namespace Work {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const [POSITION, SENIORITY, COMPANY, EXPERIENCE, TECHNOLOGIES] = [0, 1, 2, 3, 4];

const Work = ({ formManager, onBack, onSubmit }: Work.Props) => {
  const [{ dirty, fields, invalid }, change, directChange] = formManager;

  const { technologies } = useTechnologiesProvider();

  const handleSenioritySelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([SENIORITY], [Select.updateItems(fields[SENIORITY].value, e, value, true)]);
    },
    [fields]
  );

  const handleTechnologySelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([TECHNOLOGIES], [Select.updateItems(fields[TECHNOLOGIES].value, e, value)]);
    },
    [fields]
  );

  const handleExperienceSelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([EXPERIENCE], [Select.updateItems(fields[EXPERIENCE].value, e, value, true)]);
    },
    [fields]
  );

  useEffect(() => {
    const mappedTechnologies = Select.makeItems(technologies, 'id', 'name');

    if (fields[TECHNOLOGIES].value.length === 0) {
      directChange([TECHNOLOGIES], [mappedTechnologies]);
    }
  }, []);

  return (
    <form className={csx.work} onSubmit={onSubmit}>
      <WorkImage />

      <span className={csx.description}>
        Informations below will be displayed in your user profile
      </span>

      <div className={csx.fields}>
        <InputField
          data-idx={POSITION}
          label="Position"
          placeholder="Type your position..."
          error={dirty ? fields[POSITION].error : ''}
          value={fields[POSITION].value}
          onChange={change}
        />

        <Select
          label="Seniority"
          placeholder="Seniority..."
          items={fields[SENIORITY].value}
          error={dirty ? fields[SENIORITY].error : ''}
          onSelect={handleSenioritySelect}
        />
      </div>

      <div className={csx.fields}>
        <InputField
          data-idx={COMPANY}
          label="Company"
          placeholder="Type company..."
          error={dirty ? fields[COMPANY].error : ''}
          value={fields[COMPANY].value}
          onChange={change}
        />

        <Select
          label="Years of experience"
          placeholder="Years of experience..."
          items={fields[EXPERIENCE].value}
          error={dirty ? fields[EXPERIENCE].error : ''}
          onSelect={handleExperienceSelect}
        />
      </div>

      <Select
        label="Technologies"
        placeholder="Choose technologies..."
        items={fields[TECHNOLOGIES].value}
        error={dirty ? fields[TECHNOLOGIES].error : ''}
        onSelect={handleTechnologySelect}
      />

      <footer>
        <Button type="button" theme="primaryTransparent" onClick={onBack}>
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

export default Work;
