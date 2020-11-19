import { useCallback, useState } from 'react';

import { forgottenPassword, ForgottenPasswordPayload } from 'core/api';

interface State {
  pending: boolean;
  error: string;
  sent: boolean;
}

type Return = [State, (credentials: ForgottenPasswordPayload) => Promise<void>];

const STATE: State = {
  pending: false,
  error: '',
  sent: false,
};

export const useForgottenPassword = (): Return => {
  const [state, setState] = useState(STATE);

  const handleForgottenPassword = useCallback(
    async (credentials: ForgottenPasswordPayload) => {
      setState({ ...STATE, pending: true });

      try {
        await forgottenPassword(credentials);

        setState({ ...STATE, sent: true });
      } catch (error) {
        setState({ ...STATE, error });
      }
    },
    []
  );

  return [state, handleForgottenPassword];
};
