import React, { useCallback } from 'react';

import { Button, SelectBase, FieldBase, SelectControl } from 'ui';

import { Form } from 'utils';

import {
  PatternsSelect,
  TagsField,
  TechnologiesSelect,
} from 'shared/components';

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

  const handleTechnologySelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      directChange(
        [TECHNOLOGIES],
        [{ ...fields[TECHNOLOGIES].value, [dataIdx]: value }]
      );
    },
    [fields]
  );

  const handlePatternSelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      directChange(
        [PATTERNS],
        [{ ...fields[PATTERNS].value, [dataIdx]: value }]
      );
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
      const tags = (fields[TAGS].value as string[]).filter(
        (_, tIdx) => tIdx !== idx
      );
      directChange([TAGS], [tags]);
    },
    [fields]
  );

  return (
    <form onSubmit={onSubmit}>
      <FieldBase
        label="Technologies *"
        error={dirty ? fields[TECHNOLOGIES].error : ''}
      >
        <TechnologiesSelect
          value={fields[TECHNOLOGIES].value}
          onSelect={handleTechnologySelect}
        >
          <SelectControl
            label={({ length }) =>
              `${length} technolog${length > 1 ? 'ies' : 'y'} selected`
            }
            placeholder="Select technologies..."
            value={fields[TECHNOLOGIES].value}
          />
        </TechnologiesSelect>
      </FieldBase>

      <FieldBase label="Patterns *" error={dirty ? fields[PATTERNS].error : ''}>
        <PatternsSelect
          value={fields[PATTERNS].value}
          onSelect={handlePatternSelect}
        >
          <SelectControl
            label={({ length }) =>
              `${length} pattern${length > 1 ? 's' : ''} selected`
            }
            placeholder="Select patterns..."
            value={fields[PATTERNS].value}
          />
        </PatternsSelect>
      </FieldBase>

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
