import React, { useCallback, useMemo } from 'react';

import { Button, Select } from 'ui';

import { Form } from 'utils';

import { TagsField } from 'shared/components';

import { useTechnologiesProvider } from 'core/technologies';
import { usePatternsProvider } from 'core/patterns';

import { TECHNOLOGIES, PATTERNS, TAGS } from '../..';

namespace TechDetails {
  export interface Props {
    formManager: Form.Manager;
    onBack(): void;
    onSubmit(e: Form.Events.Submit): void;
  }
}

const TechDetails = ({ formManager, onBack, onSubmit }: TechDetails.Props) => {
  const [{ fields, invalid, dirty }, _, directChange] = formManager;

  const { patterns } = usePatternsProvider();

  const { technologies } = useTechnologiesProvider();

  const handleTechnologySelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([TECHNOLOGIES], [Select.select(e, value, fields[TECHNOLOGIES].value)]);
    },
    [fields]
  );

  const handlePatternSelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([PATTERNS], [Select.select(e, value, fields[PATTERNS].value)]);
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

  const mappedTechnologies = useMemo(() => Select.makeItems(technologies, 'id', 'name'), [
    technologies
  ]);

  const mappedPatterns = useMemo(() => Select.makeItems(patterns, 'id', 'name'), [patterns]);

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Technologies *"
        placeholder="Select template technologies..."
        items={mappedTechnologies}
        error={dirty ? fields[TECHNOLOGIES].error : ''}
        value={fields[TECHNOLOGIES].value}
        onSelect={handleTechnologySelect}
      />

      <Select
        label="Patterns *"
        placeholder="Select patterns..."
        items={mappedPatterns}
        error={dirty ? fields[PATTERNS].error : ''}
        value={fields[PATTERNS].value}
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
