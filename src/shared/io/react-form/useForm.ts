import { useCallback, useMemo, useState } from 'react';

import { Dict, Fns, Form, Formable, State } from '../form';
import { Handlers, ResetHandler, SetHandler, SubmitHandler } from './models';

const extractState = <A extends Dict>({
  set,
  reset,
  submit,
  ...state
}: Formable<A, boolean>): State<A, boolean> => state;

export const useForm = <A extends Dict>(
  values: A,
  fns?: Fns<A, boolean>
): [State<A, boolean>, Handlers<A>] => {
  const [form, setForm] = useState(Form({ values, fns }));

  const set: SetHandler<A> = useCallback((values: Partial<A>) => {
    setForm((prevForm) => prevForm.set(values));
  }, []);

  const submit: SubmitHandler = useCallback((e) => {
    setForm((prevForm) => prevForm.submit(e));
  }, []);

  const reset: ResetHandler = useCallback(() => {
    setForm((prevForm) => prevForm.reset());
  }, []);

  const state: State<A, boolean> = useMemo(() => extractState(form), [form]);

  const handlers: Handlers<A> = useMemo(
    () => ({
      set,
      submit,
      reset,
    }),
    [form]
  );

  return [state, handlers];
};
