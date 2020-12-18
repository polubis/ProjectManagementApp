import { useCallback, useState } from 'react';

import { ForgottenPasswordPayload } from 'shared/models';
import { forgottenPassword } from 'shared/services';
import { useAlertsProvider } from 'shared/providers/alerts';

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
  const { showAlert } = useAlertsProvider();

  const [state, setState] = useState(STATE);

  const handleForgottenPassword = useCallback(async (credentials: ForgottenPasswordPayload) => {
    setState({ ...STATE, pending: true });

    try {
      await forgottenPassword(credentials);

      setState({ ...STATE, sent: true });
    } catch (error) {
      setState({ ...STATE, error });
      showAlert({
        message: 'Something went wrong while changing password. Please try again',
      });
    }
  }, []);

  return [state, handleForgottenPassword];
};
