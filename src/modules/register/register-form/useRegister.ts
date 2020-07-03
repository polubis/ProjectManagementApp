import { useState } from 'react';

import { register, RegisterPayload } from 'core/api';

interface State {
  pending: boolean;
  error: string;
  created: boolean;
}

type Return = [State, (payload: RegisterPayload) => Promise<void>];

const STATE: State = {
  pending: false,
  error: '',
  created: false
};

export const useRegister = (): Return => {
  const [state, setState] = useState(STATE);

  const handleRegister = async (payload: RegisterPayload) => {
    setState({ ...STATE, pending: true });

    try {
      await register(payload);

      setState({ ...STATE, created: true });
    } catch (error) {
      setState({ ...STATE, error });
    }
  };

  return [state, handleRegister];
};
