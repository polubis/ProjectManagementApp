import React, { useEffect } from 'react';

import { useForm, FormSubmitEvent } from 'shared/forms';
import { Button, Select, SelectItem } from 'shared/ui';
import { useEnhancedData } from 'shared/utils';

import { getTechnologies } from 'api';

import { TemplateCreationStepProps } from '..';

export const TechnologiesOverviewStep = ({ config, onSubmit }: TemplateCreationStepProps) => {
  const [state, change, directChange, submit] = useForm(config);

  const technologies = useEnhancedData<(SelectItem & { id: number })[]>([]);

  const handleSubmit = (e: FormSubmitEvent) => {
    const isInvalid = submit(e);

    if (isInvalid) {
      return;
    }

    onSubmit();
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const idx = +e.currentTarget.getAttribute('data-idx');
    const updatedTechnologies = technologies.data.map((tech, i) =>
      i === idx
        ? {
            ...tech,
            value: checked
          }
        : tech
    );
    technologies.setData(updatedTechnologies);
  };

  const handleGetTechnologies = async () => {
    technologies.init([]);

    try {
      const result = await getTechnologies();
      technologies.success(result.map(({ id, name }) => ({ id, label: name, value: false })));
    } catch (err) {
      technologies.failure(err);
    }
  };

  useEffect(() => {
    handleGetTechnologies();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Technologies *"
        placeholder="Select template technologies..."
        items={technologies.data}
        onSelect={handleTechnologiesChange}
      />
      <Select
        label="Patterns *"
        placeholder="Select patterns..."
        items={technologies.data}
        onSelect={handleTechnologiesChange}
      />
      <Select
        label="Tags *"
        placeholder="Select tags..."
        items={technologies.data}
        onSelect={handleTechnologiesChange}
      />

      <Button type="submit" disabled={state.isDirty && state.isInvalid}>
        NEXT
      </Button>
    </form>
  );
};
