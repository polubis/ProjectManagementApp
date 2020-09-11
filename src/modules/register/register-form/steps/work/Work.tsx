import React, { useCallback, useEffect } from 'react';

import { Button, InputField, SelectBase, Select, SimpleSelect } from 'ui';

import { Form } from 'utils';

import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';

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

import ListItem from '../list-item';

import csx from './Work.scss';

namespace Work {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const TECHNOLOGIES_ITEMS: SelectBase.Item[] = [];

const Work = ({ formManager, onBack, onSubmit }: Work.Props) => {
  useEffect(() => {
    technologies.map(e => { TECHNOLOGIES_ITEMS.push({ dataIdx: e.id + '', label: e.name + '', value: false }) });
  }, [])

  const [{ dirty, fields, invalid }, change, directChange] = formManager;

  const { technologies } = useTechnologiesProvider();

  const handleSenioritySelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      SENIORITY_ITEMS.map(e => {
        if (e.dataIdx === dataIdx) e.value = !e.value;
        else e.value = false;
      })
      directChange([SENIORITY], [value === true ? { [dataIdx]: SENIORITY_ITEMS[dataIdx].value } : {}]);
    },
    [fields]
  );

  const handleTechnologySelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      TECHNOLOGIES_ITEMS.map(e => {
        if (e.dataIdx === dataIdx) e.value = !e.value;
      })
      directChange([TECHNOLOGIES], [{ ...fields[TECHNOLOGIES].value, [dataIdx]: value }]);
    },
    [fields]
  );

  const handleExperienceSelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      EXPERIENCE_ITEMS.map(e => {
        if (e.dataIdx === dataIdx) e.value = !e.value;
        else e.value = false;
      })
      directChange([EXPERIENCE], [value === true ? { [dataIdx]: EXPERIENCE_ITEMS[dataIdx].value } : {}]);
    },
    [fields]
  );

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

        <SelectBase
          children={<SimpleSelect
            list={SENIORITY_ITEMS}
            value={fields[SENIORITY].value}
            label="Seniority..." />}
          listItem={ListItem}
          items={SENIORITY_ITEMS}
          onSelect={handleSenioritySelect}
          searchable={false}
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

        <SelectBase
          children={<SimpleSelect
            list={EXPERIENCE_ITEMS}
            value={fields[EXPERIENCE].value}
            label="Years of experience..." />}
          listItem={ListItem}
          items={EXPERIENCE_ITEMS}
          onSelect={handleExperienceSelect}
          searchable={false}
        />
      </div>

      <SelectBase
        children={<SimpleSelect
          list={TECHNOLOGIES_ITEMS}
          value={fields[TECHNOLOGIES].value}
          label="Choose technologies..." />}
        listItem={ListItem}
        items={TECHNOLOGIES_ITEMS}
        onSelect={handleTechnologySelect}
        searchable={false}
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
