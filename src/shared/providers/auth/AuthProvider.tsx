import React, { createContext, ReactNode, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { getSelf, logIn, logOut, logInViaGithub } from 'shared/services';
import { Self, Credentials } from 'shared/models';
import AlertsProvider, { AlertsContext } from 'shared/providers/alerts';

namespace AuthProvider {
  export interface State {
    user: Self;
    pending: boolean;
    authorized: boolean;
    logIn?(payload: Credentials): void;
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
  authorized: false,
};

const Context = createContext(STATE);

class Provider extends React.Component<AuthProvider.Props, typeof STATE> {
  static contextType = AlertsContext;

  context: React.ContextType<React.Context<AlertsProvider.State>>;

  private _authorize = async () => {
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

  logIn = async (payload: Credentials) => {
    if (!this.state.pending) {
      this.setState({ ...STATE, pending: true });
    }

    try {
      const user = await logIn(payload);

      this.setState({ ...STATE, pending: false, authorized: true, user }, () => {
        this.props.history.replace('/app');
      });
    } catch (message) {
      this.setState({ ...STATE, pending: false });
      this.context.showAlert({ message });
    }
  };

  logOut = async () => {
    try {
      await logOut();

      this.setState({ ...STATE, pending: false });
    } catch (message) {
      this.setState({ ...STATE, pending: false });
      this.context.showAlert({ message });
    }
  };

  componentDidMount() {
    this._authorize();
  }

  readonly state: typeof STATE = {
    ...STATE,
    logIn: this.logIn,
    logOut: this.logOut,
    logInViaGithub,
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const AuthProvider = withRouter(Provider);

export const useAuthProvider = () => {
  const context = useContext(Context);

  return context;
};

export default AuthProvider;
