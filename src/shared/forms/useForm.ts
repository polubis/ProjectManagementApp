import { useState } from 'react';

import {
  FormChangeEvent,
  FormSubmitEvent,
  FieldState,
  FormState,
  FormConfig,
  UseFormBase,
  UseForm,
  runValidators
} from '.';

const getInitialState = (config: FormConfig): FormState => {
  return {
    isInvalid: false,
    isDirty: false,
    fields: config.map(
      ({ value }) =>
        ({
          value: value !== undefined ? value : '',
          error: '',
          validation: []
        } as FieldState)
    )
  };
};

/**
 * Use this hook for create your own change and submit strategies
 * @param `config` - needed for initial state creation
 * @returns `[state, setState, getChangedField]`
 *
 * `state` - represents form state `{isDirty, isInvalid, fields}`
 *
 * `setState` - allows change form state
 *
 * `getChangedField` - changes field state and returns new one
 */
export const useFormBase = (config: FormConfig): UseFormBase => {
  const [state, setState] = useState(getInitialState(config));

  const getChangedField = (value: string, idx: number): FieldState => {
    const { label, validators = [] } = config[idx];

    const validation = runValidators(value, label)(...validators);
    const result = validation.find((result) => result.isInvalid);
    const error = result ? result.text : '';

    return { value, error, validation };
  };

  return [state, setState, getChangedField];
};

/**
 * Allows manage form state
 * @param `config` - needed for initial state creation
 * @returns `[state, handleChange, handleSubmit]`
 *
 * `state` - represents form state `{isDirty, isInvalid, fields}`
 *
 * `handleChange` - changes field state and runs validation
 *
 * `handleSubmit` - runs validation and returns `isInvalid` flag
 */
export const useForm = (config: FormConfig): UseForm => {
  const [state, setState, getChangedField] = useFormBase(config);

  const change = (e: FormChangeEvent) => {
    const { value, dataset } = e.target;

    if (dataset.idx === undefined) {
      throw new Error('Attribute data-idx is missing');
    }

    const datasetIdx = +dataset.idx;

    if (isNaN(datasetIdx)) {
      throw new Error('Attribute data-idx must be number');
    }

    if (datasetIdx >= config.length) {
      throw new Error('Invalid data-idx attribute');
    }

    const newState: FormState = { ...state, fields: [...state.fields] };

    newState.fields[datasetIdx] = getChangedField(value, datasetIdx);

    newState.isInvalid = newState.fields.some((f) => f.error);

    setState(newState);
  };

  const submit = (e: FormSubmitEvent): boolean => {
    e.preventDefault();

    const newState: FormState = { ...state, isDirty: true, isInvalid: false };

    newState.fields = newState.fields.map((field, idx) => {
      const { value, validation, error } = getChangedField(field.value, idx);

      if (error) {
        newState.isInvalid = true;
      }

      return {
        value,
        validation,
        error
      };
    });

    setState(newState);

    return newState.isInvalid;
  };

  return [state, change, submit];
};
