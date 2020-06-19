import { useState } from 'react';

import { Form, V } from '.';

const makeState = (config: Form.Config): Form.State => {
  return {
    invalid: false,
    dirty: false,
    fields: config.map(
      ({ value }) =>
        ({
          value: value !== undefined ? value : '',
          error: '',
          validation: []
        } as Form.Field.State)
    )
  };
};

export const useForm = (config: Form.Config): Form.Manager => {
  const [state, setState] = useState(makeState(config));

  const getChangedField = (value: any, idx: number): Form.Field.State => {
    const { label, validators = [] } = config[idx];

    const validation = V.run(value, label)(...validators);
    const result = validation.find((result) => result.invalid);
    const error = result ? result.text : '';

    return { value, error, validation };
  };

  const change = (e: Form.Events.Change) => {
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

    const newState: Form.State = { ...state, fields: [...state.fields] };

    newState.fields[datasetIdx] = getChangedField(value, datasetIdx);

    newState.invalid = newState.fields.some((f) => f.error);

    setState(newState);
  };

  const directChange = (positions: number[], values: any[]) => {
    const newState: Form.State = { ...state, fields: [...state.fields] };

    positions.forEach((position, idx) => {
      newState.fields[position] = getChangedField(values[idx], position);
    });

    newState.invalid = newState.fields.some((f) => f.error);

    setState(newState);
  };

  const submit = (e?: Form.Events.Submit): boolean => {
    e && e.preventDefault();

    const newState: Form.State = { ...state, dirty: true, invalid: false };

    newState.fields = newState.fields.map((field, idx) => {
      const { value, validation, error } = getChangedField(field.value, idx);

      if (error) {
        newState.invalid = true;
      }

      return {
        value,
        validation,
        error
      };
    });

    setState(newState);

    return newState.invalid;
  };

  return [state, change, directChange, submit];
};
