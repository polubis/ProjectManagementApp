import React, { createContext, ReactNode, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { Alert } from 'ui';

import { getSelf, logIn, logOut } from '.';

namespace Auth {
  export interface Credentials {
    login: string;
    password: string;
  }

  export interface User {
    username: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  }

  export namespace Provider {
    export interface State {
      user: User;
      pending: boolean;
      authorized: boolean;
      error: string;
      logIn?(payload: Credentials): Promise<void>;
      logOut?(): Promise<void>;
    }

    export interface Props extends RouteComponentProps {
      children: ReactNode;
    }
  }
}

const STATE: Auth.Provider.State = {
  user: null,
  pending: false,
  authorized: false,
  error: ''
};

const Context = createContext(STATE);

class Provider extends React.Component<Auth.Provider.Props, typeof STATE> {
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

  logIn = async (credentials: Auth.Credentials) => {
    const { pending } = this.state;

    if (!pending) {
      this.setState({ ...STATE, pending: true });
    }

    try {
      const user = await logIn(credentials);
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
    logOut: this.logOut
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

const use = () => {
  const context = useContext(Context);
  return context;
};

const Auth = {
  Provider: withRouter(Provider),
  use
};

export default Auth;
