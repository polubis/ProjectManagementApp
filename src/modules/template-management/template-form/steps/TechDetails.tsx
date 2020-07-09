import React, { useEffect, useCallback } from 'react';

import { Button, Select } from 'ui';

import { Form } from 'utils';

import { TagsField } from 'shared/components';

import { useTechnologiesProvider } from 'core/technologies';
import { usePatternsProvider } from 'core/patterns';

namespace TechDetails {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const [TECHNOLOGIES, PATTERNS, TAGS] = [0, 1, 2];

const TechDetails = ({ formManager, onBack, onSubmit }: TechDetails.Props) => {
  const [{ fields, invalid, dirty }, _, directChange] = formManager;

  const { patterns } = usePatternsProvider();

  const { technologies } = useTechnologiesProvider();

  const handleTechnologySelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([TECHNOLOGIES], [Select.updateItems(fields[TECHNOLOGIES].value, e, value)]);
    },
    [fields]
  );

  const handlePatternSelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([PATTERNS], [Select.updateItems(fields[PATTERNS].value, e, value)]);
    },
    [fields]
  );

  const handleTagsChange = useCallback(
    (value: string) => {
      const tags = [value, ...(fields[TAGS].value as string[])];
      directChange([TAGS], [tags]);
    },
    [fields]
  );

  const handleTagDelete = useCallback(
    (idx: number) => {
      const tags = (fields[TAGS].value as string[]).filter((_, tIdx) => tIdx !== idx);
      directChange([TAGS], [tags]);
    },
    [fields]
  );

  useEffect(() => {
    const mappedTechnologies = Select.makeItems(technologies, 'id', 'name');
    const mappedPatterns = Select.makeItems(patterns, 'id', 'name');

    if (fields[TECHNOLOGIES].value.length === 0 && fields[PATTERNS].value.length === 0) {
      directChange([TECHNOLOGIES, PATTERNS], [mappedTechnologies, mappedPatterns]);
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Technologies *"
        placeholder="Select template technologies..."
        items={fields[TECHNOLOGIES].value}
        error={dirty ? fields[TECHNOLOGIES].error : ''}
        onSelect={handleTechnologySelect}
      />

      <Select
        label="Patterns *"
        placeholder="Select patterns..."
        items={fields[PATTERNS].value}
        error={dirty ? fields[PATTERNS].error : ''}
        onSelect={handlePatternSelect}
      />

      <TagsField
        placeholder="Add tag and confirm with enter..."
        label="Tags *"
        error={dirty ? fields[TAGS].error : ''}
        value={fields[TAGS].value}
        onChange={handleTagsChange}
        onDelete={handleTagDelete}
      />

      <footer>
        <Button theme="primaryTransparent" onClick={onBack}>
          BACK
        </Button>

        <Button type="submit" disabled={dirty && invalid}>
          SUBMIT & CREATE
        </Button>
      </footer>
    </form>
  );
};

export default TechDetails;
