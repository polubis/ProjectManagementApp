import React, { useEffect, useContext } from 'react';

import { Button, Select, CheckboxProps, TextareaField } from 'shared/ui';

import { TechnologiesContext } from 'core/technologies';

import { TemplateManagementStepProps } from '.';

export const TechnologiesOverview = ({
  formManager: [state, change, directChange],
  pending,
  onSubmit,
  onBack
}: TemplateManagementStepProps) => {
  const { technologies, loading } = useContext(TechnologiesContext);

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
    if (state.fields[0].value.length === 0) {
      const mappedTechnologies: CheckboxProps[] = technologies.map(({ id, name }) => ({
        dataId: id,
        label: name,
        value: false
      }));

      directChange([0], [mappedTechnologies]);
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Technologies *"
        placeholder="Select template technologies..."
        items={state.fields[0].value}
        error={state.dirty ? state.fields[0].error : ''}
        onSelect={(e, value) => setTechnologiesSelection(e, 0, value)}
      />

      <Select
        label="Patterns *"
        placeholder="Select patterns..."
        items={state.fields[1].value}
        error={state.dirty ? state.fields[1].error : ''}
        onSelect={(e, value) => setTechnologiesSelection(e, 1, value)}
      />

      <TextareaField
        placeholder="Add tags and separate them with commas..."
        label="Tags *"
        data-idx={2}
        onChange={change}
        value={state.fields[2].value}
        error={state.dirty ? state.fields[2].error : ''}
      />

      <footer>
        <Button type="button" theme="primaryTransparent" onClick={onBack}>
          BACK
        </Button>

        <Button type="submit" disabled={(state.dirty && state.invalid) || loading || pending}>
          SUBMIT & CREATE
        </Button>
      </footer>
    </form>
  );
};
