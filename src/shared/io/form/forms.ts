import { FormCreator } from './core';
import { Config, Dict, Formable } from './models';

export const Form = <A extends Dict>(config: Config<A, boolean>): Formable<A, boolean> =>
  new FormCreator<A, boolean>(
    {
      resolveError: (fnsList, value) => fnsList.some((fn) => fn(value)),
      resolveInvalid: (keys, errors) => keys.some((key) => errors[key]),
    },
    config
  );
