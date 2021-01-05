import { useState, useCallback, useMemo } from 'react';

import { Validators, Formed, State } from './models';
import { Form } from './Form';

type Change<T extends object> = (values: Partial<NonNullable<T & Exclude<T, any[]>>>) => void;

type Submit = (e: { preventDefault: () => void }) => void;

type UseForm<T extends object> = {
  state: State<T, boolean>;
  change: Change<T>;
  submit: Submit;
};

export const useForm = <T extends object>(
  values: NonNullable<T & Exclude<T, any[]>>,
  validators?: Validators<T, boolean>
): UseForm<T> => {
  const [form, setForm] = useState<Formed<T, boolean>>(Form<T>(values, validators));

  const change: Change<T> = useCallback((values) => {
    setForm(({ set }) => set(values));
  }, []);

  const submit: Submit = useCallback(
    (e) => {
      e.preventDefault();

      const submittedForm = form.set(values, true);

      setForm(submittedForm);
    },
    [form]
  );

  return useMemo(() => {
    const { set, ...state } = form;

    return {
      state,
      change,
      submit,
    };
  }, [form]);
};
