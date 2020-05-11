import { useState } from 'react';

import {
  FormChangeEvent,
  FormSubmitEvent,
  FieldState,
  FormState,
  FormConfig,
  FormManagerBase,
  FormManager,
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

export const useFormBase = (config: FormConfig): FormManagerBase => {
  const [state, setState] = useState(getInitialState(config));

  const getChangedField = (value: any, idx: number): FieldState => {
    const { label, validators = [] } = config[idx];

    const validation = runValidators(value, label)(...validators);
    const result = validation.find((result) => result.isInvalid);
    const error = result ? result.text : '';

    return { value, error, validation };
  };

  return [state, setState, getChangedField];
};

export const useForm = (config: FormConfig): FormManager => {
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

  const directChange = (positions: number[], values: any[]) => {
    const newState: FormState = { ...state, fields: [...state.fields] };

    positions.forEach((position, idx) => {
      newState.fields[position] = getChangedField(values[idx], position);
    });

    newState.isInvalid = newState.fields.some((f) => f.error);

    setState(newState);
  };

  const submit = (e?: FormSubmitEvent): boolean => {
    e && e.preventDefault();

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

  return [state, change, directChange, submit];
};
