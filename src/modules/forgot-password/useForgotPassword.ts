import { useState } from 'react';

import { forgotPassword, ForgotPasswordPayload } from 'core/api';

interface State {
  pending: boolean;
  error: string;
  sent: boolean;
}

type Return = [State, (formManagers: ForgotPasswordPayload) => Promise<void>];

const STATE: State = {
  pending: false,
  error: '',
  sent: false
};

export const useForgotPassword = (): Return => {
  const [state, setState] = useState(STATE);

  const handleForgotPassword = async (credentials: ForgotPasswordPayload) => {
    setState({ ...STATE, pending: true });

    try {
      await forgotPassword(credentials);

      setState({ ...STATE, sent: true });
    } catch (error) {
      setState({ ...STATE, error });
    }
  };

  return [state, handleForgotPassword];
};