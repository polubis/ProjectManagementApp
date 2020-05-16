import React, { useEffect, useState } from 'react';

import { Button, Select, SelectItem, TextareaField } from 'shared/ui';

import { getTechnologies, getPatterns } from 'api';

import { TemplateManagementStepProps } from '.';

export const TechnologiesOverview = ({
  formManager: [state, change, directChange],
  onSubmit
}: TemplateManagementStepProps) => {
  const [isLoadingDictionaries, setIsLoadingDictionaries] = useState(false);

  const updateSelectItems = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    value: boolean
  ) => {
    const id = +e.currentTarget.getAttribute('data-id');
    const items: SelectItem[] = state.fields[idx].value.map((item) =>
      id === item.id
        ? {
            ...item,
            value
          }
        : item
    );
    directChange([idx], [items]);
  };

  const handleGetDictionaries = async () => {
    setIsLoadingDictionaries(true);

    // Allows run calls parallel
    const techPromise = getTechnologies();
    const pattPromise = getPatterns();

    try {
      const technologies: SelectItem[] = (await techPromise).map(({ id, name }) => ({
        id,
        label: name,
        value: false
      }));

      const patterns: SelectItem[] = (await pattPromise).map(({ id, name }) => ({
        id,
        label: name,
        value: false
      }));

      directChange([0, 1], [technologies, patterns]);
    } catch (error) {
    } finally {
      setIsLoadingDictionaries(false);
    }
  };

  useEffect(() => {
    handleGetDictionaries();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Technologies *"
        placeholder="Select template technologies..."
        items={state.fields[0].value}
        error={state.isDirty ? state.fields[0].error : ''}
        onSelect={(e, value) => updateSelectItems(e, 0, value)}
      />

      <Select
        label="Patterns *"
        placeholder="Select patterns..."
        items={state.fields[1].value}
        error={state.isDirty ? state.fields[1].error : ''}
        onSelect={(e, value) => updateSelectItems(e, 1, value)}
      />

      <TextareaField
        placeholder="Add tags and separate them with commas..."
        label="Tags *"
        data-idx={2}
        onChange={change}
        value={state.fields[2].value}
        error={state.isDirty ? state.fields[2].error : ''}
      />

      <Button type="submit" disabled={(state.isDirty && state.isInvalid) || isLoadingDictionaries}>
        SUBMIT & CREATE
      </Button>
    </form>
  );
};
