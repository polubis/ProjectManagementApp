import React, { useCallback, useMemo } from 'react';

import { Button, Select } from 'ui';

import { Form } from 'utils';

import { Technology, Pattern } from 'core/api';

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

const mapTechnologies = (technologies: Technology[], value: { [key: number]: boolean }) => () =>
  technologies.map(t => ({
    label: t.name,
    dataIdx: t.id,
    value: !!value[t.id]
  })) as Select.Item[];

const mapPatterns = (patterns: Pattern[], value: { [key: number]: boolean }) => () =>
  patterns.map(t => ({
    label: t.name,
    dataIdx: t.id,
    value: !!value[t.id]
  })) as Select.Item[];

const TechDetails = ({ formManager, onBack, onSubmit }: TechDetails.Props) => {
  const [{ fields, invalid, dirty }, _, directChange] = formManager;

  const { patterns } = usePatternsProvider();

  const { technologies } = useTechnologiesProvider();

  const handleTechnologySelect: Select.OnSelect = useCallback(
    (dataIdx, checked) => {
      directChange([TECHNOLOGIES], [{ ...fields[TECHNOLOGIES].value, [dataIdx]: checked }]);
    },
    [fields]
  );

  const handlePatternSelect: Select.OnSelect = useCallback(
    (dataIdx, checked) => {
      directChange([PATTERNS], [{ ...fields[PATTERNS].value, [dataIdx]: checked }]);
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

  const mappedTechnologies = useMemo(mapTechnologies(technologies, fields[TECHNOLOGIES].value), [
    technologies,
    fields[TECHNOLOGIES].value
  ]);

  const mappedPatterns = useMemo(mapPatterns(patterns, fields[PATTERNS].value), [
    patterns,
    fields[PATTERNS].value
  ]);

  return (
    <form onSubmit={onSubmit}>
      <Select
        label="Technologies *"
        placeholder="Select template technologies..."
        items={mappedTechnologies}
        error={dirty ? fields[TECHNOLOGIES].error : ''}
        onSelect={handleTechnologySelect}
      />

      <Select
        label="Patterns *"
        placeholder="Select patterns..."
        items={mappedPatterns}
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
