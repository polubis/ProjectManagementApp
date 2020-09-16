import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { FieldBase, Button } from 'ui';

import { V } from 'utils';

import { TemplateTags } from '..';

import csx from './TagsField.scss';

namespace TagsField {
  type OmittedInputProps = 'onChange' | 'onKeyPress' | 'value';

  type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

  export interface Props extends Omit<InputProps, OmittedInputProps> {
    label: string;
    value: string[];
    error?: string;
    onChange(value: string): void;
    onDelete(idx: number): void;
  }
}

const TagsField = ({ error, label, value, onChange, onDelete, ...inputProps }: TagsField.Props) => {
  const [inputValue, setInputValue] = useState('');

  const validationError = V.min(2, false)(inputValue);

  const handleConfirm = useCallback(() => {
    if (!validationError.invalid) {
      onChange(inputValue);
      setInputValue('');
    }
  }, [inputValue, onChange]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleConfirm();
      }
    },
    [handleConfirm]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onDelete(+e.currentTarget.getAttribute('data-idx'));
    },
    [onDelete]
  );

  return (
    <FieldBase error={error} label={label} className={csx.tagsField}>
      <input
        {...inputProps}
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      {error ? null : <TemplateTags items={value} onClick={handleDelete} />}

      <Button variant="icon" disabled={validationError.invalid} onClick={handleConfirm}>
        <AddCircleOutlineIcon />
      </Button>
    </FieldBase>
  );
};

export default TagsField;
