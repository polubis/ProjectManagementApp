import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from 'react';

import { IconButton } from '@material-ui/core';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { FieldBase } from 'ui';

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

const TagsField = ({
  error,
  label,
  value,
  onChange,
  onDelete,
  ...inputProps
}: TagsField.Props) => {
  const [inputValue, setInputValue] = useState('');

  const minValidationError = V.min(2, false)(inputValue);
  const uniqueValidationError = V.unique(value)(inputValue);
  const disabled = minValidationError.invalid || uniqueValidationError.invalid;

  const handleConfirm = useCallback(() => {
    if (disabled) {
      return;
    }

    onChange(inputValue);
    setInputValue('');
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

      <IconButton disabled={disabled} onClick={handleConfirm}>
        <AddCircleOutlineIcon />
      </IconButton>
    </FieldBase>
  );
};

export default TagsField;
