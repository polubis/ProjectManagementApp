import React, { useEffect, useContext } from 'react';

import { Button, Select, CheckboxProps, TextareaField } from 'shared/ui';

import { TechnologiesContext } from 'providers/technologies';

import { TemplateManagementStepProps } from '.';

export const TechnologiesOverview = ({
  formManager: [state, change, directChange],
  onSubmit
}: TemplateManagementStepProps) => {
  const { technologies, isLoading } = useContext(TechnologiesContext);

  const setTechnologiesSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    value: boolean
  ) => {
    const id = +e.currentTarget.getAttribute('data-id');
    const items: CheckboxProps[] = state.fields[idx].value.map((item: CheckboxProps) =>
      id === item.dataId
        ? {
            ...item,
            value
          }
        : item
    );
    directChange([idx], [items]);
  };

  useEffect(() => {
    const mappedTechnologies: CheckboxProps[] = technologies.map(({ id, name }) => ({
      dataId: id,
      label: name,
      value: false
    }));

    directChange([0], [mappedTechnologies]);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Technologies *"
        placeholder="Select template technologies..."
        items={state.fields[0].value}
        error={state.isDirty ? state.fields[0].error : ''}
        onSelect={(e, value) => setTechnologiesSelection(e, 0, value)}
      />

      <Select
        label="Patterns *"
        placeholder="Select patterns..."
        items={state.fields[1].value}
        error={state.isDirty ? state.fields[1].error : ''}
        onSelect={(e, value) => setTechnologiesSelection(e, 1, value)}
      />

      <TextareaField
        placeholder="Add tags and separate them with commas..."
        label="Tags *"
        data-idx={2}
        onChange={change}
        value={state.fields[2].value}
        error={state.isDirty ? state.fields[2].error : ''}
      />

      <Button type="submit" disabled={(state.isDirty && state.isInvalid) || isLoading}>
        SUBMIT & CREATE
      </Button>
    </form>
  );
};
