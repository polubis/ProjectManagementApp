import React, { createContext, ReactNode, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { Alert } from 'ui';

import { SelfUser, LogInPayload, getSelf, logIn, logOut, logInViaGithub } from 'core/api';

namespace AuthProvider {
  export interface State {
    user: SelfUser;
    pending: boolean;
    authorized: boolean;
    error: string;
    logIn?(payload: LogInPayload): Promise<void>;
    logInViaGithub?(): void;
    logOut?(): Promise<void>;
  }

  export interface Props extends RouteComponentProps {
    children: ReactNode;
  }
}

const STATE: AuthProvider.State = {
  user: null,
  pending: false,
  authorized: false,
  error: ''
};

const Context = createContext(STATE);

class Provider extends React.Component<AuthProvider.Props, typeof STATE> {
  componentDidMount() {
    this.authorize();
  }

  authorize = async () => {
    const { pending } = this.state;

    if (!pending) {
      this.setState({ ...STATE, pending: true });
    }

    try {
      const user = await getSelf();
      this.setState({ ...STATE, authorized: true, user });
    } catch {
      this.setState({ ...STATE });
    }
  };

  logIn = async (payload: LogInPayload) => {
    const { pending } = this.state;

    if (!pending) {
      this.setState({ ...STATE, pending: true });
    }

    try {
      const user = await logIn(payload);
      this.setState({ ...STATE, authorized: true, user }, () => {
        this.props.history.replace('/app');
      });
    } catch (error) {
      this.setState({ ...STATE, error });
    }
  };

  logOut = async () => {
    try {
      await logOut();
      this.setState({ ...STATE });
    } catch (error) {
      this.setState({ error });
    }
  };

  closeAlert = () => {
    this.setState({ error: '' });
  };

  readonly state: typeof STATE = {
    ...STATE,
    logIn: this.logIn,
    logOut: this.logOut,
    logInViaGithub
  };

  render() {
    const { error } = this.state;

    return (
      <Context.Provider value={this.state}>
        {error && <Alert message={error} onClose={this.closeAlert} />}
        {this.props.children}
      </Context.Provider>
    );
  }
}

const AuthProvider = withRouter(Provider);

export const useAuthProvider = () => {
  const context = useContext(Context);

  return context;
};

export default AuthProvider;
