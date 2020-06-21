import { ChangeEvent, useState } from 'react';

import { V } from '.';

namespace Form {
  export namespace Events {
    export interface Change<T = HTMLInputElement | HTMLTextAreaElement> extends ChangeEvent<T> {}

    export interface Submit extends ChangeEvent<HTMLFormElement> {}
  }

  export namespace Field {
    export interface Config {
      label: string;
      fns?: V.Fn[];
      value?: any;
    }

    export interface State {
      value: any;
      error: string;
      result: V.Result[];
    }
  }

  export type Config = Field.Config[];

  export interface State {
    invalid: boolean;
    dirty: boolean;
    fields: Field.State[];
  }

  export type Manager = [
    Form.State,
    (e: Form.Events.Change) => void,
    (positions: number[], values: any[]) => void,
    (e?: Form.Events.Submit) => boolean
  ];
}

const makeState = (config: Form.Config): Form.State => {
  return {
    invalid: false,
    dirty: false,
    fields: config.map(
      ({ value }) =>
        ({
          value: value !== undefined ? value : '',
          error: '',
          result: []
        } as Form.Field.State)
    )
  };
};

const useManager = (config: Form.Config): Form.Manager => {
  const [state, setState] = useState(makeState(config));

  const makeField = (value: any, idx: number): Form.Field.State => {
    const { label, fns = [] } = config[idx];

    const result = V.run(value, label)(...fns);
    const invalidResult = result.find((result) => result.invalid);
    const error = invalidResult ? invalidResult.text : '';

    return { value, error, result };
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

    newState.fields[datasetIdx] = makeField(value, datasetIdx);

    newState.invalid = newState.fields.some((f) => f.error);

    setState(newState);
  };

  const directChange = (positions: number[], values: any[]) => {
    const newState: Form.State = { ...state, fields: [...state.fields] };

    positions.forEach((position, idx) => {
      newState.fields[position] = makeField(values[idx], position);
    });

    newState.invalid = newState.fields.some((f) => f.error);

    setState(newState);
  };

  const submit = (e?: Form.Events.Submit): boolean => {
    e && e.preventDefault();

    const newState: Form.State = { ...state, dirty: true, invalid: false };

    newState.fields = newState.fields.map((field, idx) => {
      const { value, result, error } = makeField(field.value, idx);

      if (error) {
        newState.invalid = true;
      }

      return {
        value,
        result,
        error
      };
    });

    setState(newState);

    return newState.invalid;
  };

  return [state, change, directChange, submit];
};

const Form = {
  useManager
};

export default Form;
