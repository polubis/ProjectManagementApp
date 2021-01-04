import { FormsFactory } from './FormsFactory';

interface Result {
  invalid: boolean;
  message: string;
}

export const SemanticForm = FormsFactory<Result>(
  (key, values, validators) => {
    const result = validators[key].find((validator) => validator(values[key], values).invalid);

    return result ? result(values[key], values) : { invalid: false, message: 'Unknown' };
  },
  (key, errors) => errors[key].invalid
);
