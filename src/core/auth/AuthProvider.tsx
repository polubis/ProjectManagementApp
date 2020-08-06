import React, { createContext, ReactNode, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { SelfUser, LogInPayload, getSelf, logIn, logOut, logInViaGithub } from 'core/api';

namespace AuthProvider {
  export interface State {
    user: SelfUser;
    pending: boolean;
    authorized: boolean;
    logIn?(payload: LogInPayload): void;
    logInViaGithub?(): void;
    logOut?(): void;
  }

  export interface Props extends RouteComponentProps {
    children: ReactNode;
  }
}

const STATE: AuthProvider.State = {
  user: null,
  pending: true,
  authorized: false
};

const Context = createContext(STATE);

class Provider extends React.Component<AuthProvider.Props, typeof STATE> {
  componentDidMount() {
    this.authorize();
  }

  authorize = async () => {
    if (!this.state.pending) {
      this.setState({ ...STATE });
    }

    try {
      const user = await getSelf();

      this.setState({ ...STATE, pending: false, authorized: true, user });
    } catch {
      this.setState({ ...STATE, pending: false });
    }
  };

  logIn = async (payload: LogInPayload) => {
    if (!this.state.pending) {
      this.setState({ ...STATE, pending: true });
    }

    try {
      const user = await logIn(payload);

      this.setState({ ...STATE, pending: false, authorized: true, user }, () => {
        this.props.history.replace('/app');
      });
    } catch {
      this.setState({ ...STATE, pending: false });
    }
  };

  logOut = async () => {
    try {
      await logOut();

      this.setState({ ...STATE, pending: false });
    } catch {
      this.setState({ ...STATE, pending: false });
    }
  };

  readonly state: typeof STATE = {
    ...STATE,
    logIn: this.logIn,
    logOut: this.logOut,
    logInViaGithub
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

const AuthProvider = withRouter(Provider);

export const useAuthProvider = () => {
  const context = useContext(Context);

  return context;
};

export default AuthProvider;
