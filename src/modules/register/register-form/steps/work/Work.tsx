import React, { useCallback, useMemo } from 'react';

import { Button, InputField, SimpleSelect, FieldBase, SelectBase, SelectControl } from 'ui';

import { Form } from 'utils';

import { TechnologiesSelect } from 'shared/components';

import { WorkImage } from '.';

import {
  POSITION,
  SENIORITY,
  COMPANY,
  EXPERIENCE,
  TECHNOLOGIES,
  SENIORITY_ITEMS,
  EXPERIENCE_ITEMS,
} from '../../..';

import csx from './Work.scss';

namespace Work {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const makeExperienceItems = (value: { [key: string]: boolean }) => () =>
  EXPERIENCE_ITEMS.map(
    (item, idx) =>
      ({
        dataIdx: `${idx}`,
        label: item,
        value: !!value[idx],
      } as SelectBase.Item)
  );

const makeSeniorityItems = (value: { [key: string]: boolean }) => () =>
  SENIORITY_ITEMS.map(
    (item, idx) =>
      ({
        dataIdx: `${idx}`,
        label: item,
        value: !!value[idx],
      } as SelectBase.Item)
  );

const Work = ({ formManager, onBack, onSubmit }: Work.Props) => {
  const [{ dirty, fields, invalid }, change, directChange] = formManager;

  const handleSenioritySelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      directChange([SENIORITY], [{ [dataIdx]: value }]);
    },
    [fields]
  );

  const handleTechnologySelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      directChange([TECHNOLOGIES], [{ ...fields[TECHNOLOGIES].value, [dataIdx]: value }]);
    },
    [fields]
  );

  const handleExperienceSelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      directChange([EXPERIENCE], [{ [dataIdx]: value }]);
    },
    [fields]
  );

  const mappedExperienceItems = useMemo(makeExperienceItems(fields[EXPERIENCE].value), [fields]);

  const mappedSeniorityItems = useMemo(makeSeniorityItems(fields[SENIORITY].value), [fields]);

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

        <FieldBase label="Seniority *" error={dirty ? fields[SENIORITY].error : ''}>
          <SimpleSelect items={mappedSeniorityItems} onSelect={handleSenioritySelect}>
            <SelectControl
              label={(selected) => mappedSeniorityItems[+selected[0]].label}
              placeholder="Select seniority..."
              value={fields[SENIORITY].value}
            />
          </SimpleSelect>
        </FieldBase>
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

        <FieldBase label="Years of experience *" error={dirty ? fields[EXPERIENCE].error : ''}>
          <SimpleSelect items={mappedExperienceItems} onSelect={handleExperienceSelect}>
            <SelectControl
              label={(selected) => mappedExperienceItems[+selected[0]].label}
              placeholder="Select years..."
              value={fields[EXPERIENCE].value}
            />
          </SimpleSelect>
        </FieldBase>
      </div>

      <FieldBase label="Technologies *" error={dirty ? fields[TECHNOLOGIES].error : ''}>
        <TechnologiesSelect value={fields[TECHNOLOGIES].value} onSelect={handleTechnologySelect}>
          <SelectControl
            label={({ length }) => `${length} technolog${length > 1 ? 'ies' : 'y'} selected`}
            placeholder="Select technologies..."
            value={fields[TECHNOLOGIES].value}
          />
        </TechnologiesSelect>
      </FieldBase>

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
