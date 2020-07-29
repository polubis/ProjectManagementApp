import React, { useCallback, useMemo } from 'react';

import { Button, InputField, Select } from 'ui';

import { Form } from 'utils';

import { useTechnologiesProvider } from 'core/technologies';

import { WorkImage } from '.';

import {
  POSITION,
  SENIORITY,
  COMPANY,
  EXPERIENCE,
  TECHNOLOGIES,
  SENIORITY_ITEMS,
  EXPERIENCE_ITEMS
} from '../../..';

import csx from './Work.scss';

namespace Work {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const Work = ({ formManager, onBack, onSubmit }: Work.Props) => {
  const [{ dirty, fields, invalid }, change, directChange] = formManager;

  const { technologies } = useTechnologiesProvider();

  const handleSenioritySelect: Select.OnSelect = useCallback(
    (dataIdx, checked) => {
      directChange([SENIORITY], [{ ...fields[SENIORITY].value, [dataIdx]: checked }]);
    },
    [fields]
  );

  const handleTechnologySelect: Select.OnSelect = useCallback(
    (dataIdx, checked) => {
      directChange([TECHNOLOGIES], [{ ...fields[TECHNOLOGIES], [dataIdx]: checked }]);
    },
    [fields]
  );

  const handleExperienceSelect: Select.OnSelect = useCallback(
    (dataIdx, checked) => {
      directChange([EXPERIENCE], [{ ...fields[EXPERIENCE], [dataIdx]: checked }]);
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
          onSelect={handleExperienceSelect}
        />
      </div>

      <Select
        label="Technologies"
        placeholder="Choose technologies..."
        error={dirty ? fields[TECHNOLOGIES].error : ''}
        items={mappedTechnologies}
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
