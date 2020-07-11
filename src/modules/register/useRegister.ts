import { useState } from 'react';

import { Form } from 'utils';

import { register, RegisterPayload } from 'core/api';

interface State {
  pending: boolean;
  error: string;
  created: boolean;
}

type Return = [State, (formManagers: Form.Manager[]) => Promise<void>];

const STATE: State = {
  pending: false,
  error: '',
  created: false
};

const getPayload = ([
  credentialsManager,
  personalInfoManager,
  workManager,
  almostDoneManager
]: Form.Manager[]): RegisterPayload => {
  const [
    { value: username },
    { value: email },
    { value: password },
    { value: confirmPassword }
  ] = credentialsManager[0].fields;

  const [{ value: firstName }, { value: lastName }] = personalInfoManager[0].fields;

  return {
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName
  };
};

export const useRegister = (): Return => {
  const [state, setState] = useState(STATE);

  const handleRegister = async (formManagers: Form.Manager[]) => {
    setState({ ...STATE, pending: true });

    try {
      await register(getPayload(formManagers));

      setState({ ...STATE, created: true });
    } catch (error) {
      setState({ ...STATE, error });
    }
  };

  return [state, handleRegister];
};
