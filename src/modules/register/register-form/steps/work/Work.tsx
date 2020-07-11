import React, { useCallback, useMemo } from 'react';

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

const SENIORITY_ITEMS: Select.Item[] = [
  { dataIdx: 0, label: 'Junior' },
  { dataIdx: 1, label: 'Mid' },
  { dataIdx: 2, label: 'Regular' },
  { dataIdx: 3, label: 'Pro' },
  { dataIdx: 4, label: 'Senior' }
];

const EXPERIENCE_ITEMS = Array.from({ length: 30 }, (_, idx) => idx + 1).map(
  (idx) =>
    ({
      dataIdx: idx,
      label: idx !== 1 ? `${idx} years` : `${idx} year`
    } as Select.Item)
);

const [POSITION, SENIORITY, COMPANY, EXPERIENCE, TECHNOLOGIES] = [0, 1, 2, 3, 4];

const Work = ({ formManager, onBack, onSubmit }: Work.Props) => {
  const [{ dirty, fields, invalid }, change, directChange] = formManager;

  const { technologies } = useTechnologiesProvider();

  const handleSenioritySelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([SENIORITY], [Select.select(e, value)]);
    },
    [fields]
  );

  const handleTechnologySelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([TECHNOLOGIES], [Select.select(e, value, fields[TECHNOLOGIES].value)]);
    },
    [fields]
  );

  const handleExperienceSelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([EXPERIENCE], [Select.select(e, value)]);
    },
    [fields]
  );

  const mappedTechnologies = useMemo(() => Select.makeItems(technologies, 'id', 'name'), [
    technologies
  ]);

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
          items={SENIORITY_ITEMS}
          error={dirty ? fields[SENIORITY].error : ''}
          value={fields[SENIORITY].value}
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
          error={dirty ? fields[EXPERIENCE].error : ''}
          items={EXPERIENCE_ITEMS}
          value={fields[EXPERIENCE].value}
          onSelect={handleExperienceSelect}
        />
      </div>

      <Select
        label="Technologies"
        placeholder="Choose technologies..."
        error={dirty ? fields[TECHNOLOGIES].error : ''}
        items={mappedTechnologies}
        value={fields[TECHNOLOGIES].value}
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
