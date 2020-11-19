import { ChangeEvent, useState } from 'react';

import { V } from '.';

namespace Form {
  export namespace Events {
    export type Change<
      T = HTMLInputElement | HTMLTextAreaElement
    > = ChangeEvent<T>;

    export type Submit = ChangeEvent<HTMLFormElement>;
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

const makeInitState = (config: Form.Config): Form.State => {
  return {
    invalid: false,
    dirty: false,
    fields: config.map(
      ({ value }) =>
        ({
          value: value !== undefined ? value : '',
          error: '',
          result: [],
        } as Form.Field.State)
    ),
  };
};

const useManager = (config: Form.Config): Form.Manager => {
  const [state, setState] = useState(makeInitState(config));

  const makeField = (
    value: any,
    idx: number,
    currState: Form.State
  ): Form.Field.State => {
    const { fns = [] } = config[idx];

    const result = V.run(value, currState)(...fns);
    const invalidResult = result.find((resultItem) => resultItem.invalid);
    const error = invalidResult ? invalidResult.text : '';

    return { value, error, result };
  };

  const makeState = (
    positions: number[],
    values: any[],
    currState = state
  ): Form.State => {
    const newState: Form.State = { ...currState, fields: [...state.fields] };

    positions.forEach((position, idx) => {
      newState.fields[position].value = values[idx];
    });

    positions.forEach((position, idx) => {
      newState.fields[position] = makeField(values[idx], position, newState);
    });

    newState.invalid = newState.fields.some((f) => f.error);

    return newState;
  };

  const change = (e: Form.Events.Change) => {
    const { value, dataset } = e.target;

    if (dataset.idx === undefined) {
      throw new Error('Attribute data-idx is missing');
    }

    const datasetIdx = +dataset.idx;

    if (Number.isNaN(datasetIdx)) {
      throw new Error('Attribute data-idx must be number');
    }

    if (datasetIdx >= config.length) {
      throw new Error('Invalid data-idx attribute');
    }

    setState(makeState([datasetIdx], [value]));
  };

  const directChange = (positions: number[], values: any[]) => {
    setState(makeState(positions, values));
  };

  const submit = (e?: Form.Events.Submit): boolean => {
    if (e) {
      e.preventDefault();
    }

    const positions = Array.from({ length: config.length }, (_, idx) => idx);
    const values = positions.map((p) => state.fields[p].value);
    const newState = makeState(positions, values, {
      ...state,
      dirty: true,
      invalid: false,
    });

    setState(newState);

    return newState.invalid;
  };

  return [state, change, directChange, submit];
};

const Form = {
  useManager,
};

export default Form;
