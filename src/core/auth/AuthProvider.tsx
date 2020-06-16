import React from 'react';
import { withRouter } from 'react-router';

import { getAuthorizedUser, LogInPayload, logIn, logOut } from 'api';

import { Alert } from 'shared/ui';

import { INIT_STATE, AuthProviderState, AuthProviderProps, AuthContext } from '.';

class AuthProvider extends React.Component<AuthProviderProps, AuthProviderState> {
  componentDidMount() {
    this.authorize();
  }

  authorize = async () => {
    const { pending } = this.state;

    if (!pending) {
      this.setState({ ...INIT_STATE, pending: true });
    }

    try {
      const user = await getAuthorizedUser();
      this.setState({ ...INIT_STATE, authorized: true, user });
    } catch {
      this.setState({ ...INIT_STATE });
    }
  };

  logIn = async (credentials: LogInPayload) => {
    const { pending } = this.state;

    if (!pending) {
      this.setState({ ...INIT_STATE, pending: true });
    }

    try {
      const user = await logIn(credentials);
      this.setState({ ...INIT_STATE, authorized: true, user }, () => {
        this.props.history.replace('/app');
      });
    } catch (error) {
      this.setState({ ...INIT_STATE, error });
    }
  };

  logOut = async () => {
    try {
      await logOut();
      this.setState({ ...INIT_STATE });
    } catch (error) {
      this.setState({ error });
    }
  };

  closeAlert = () => {
    this.setState({ error: '' });
  };

  readonly state: AuthProviderState = {
    ...INIT_STATE,
    logIn: this.logIn,
    logOut: this.logOut
  };

  render() {
    const { error } = this.state;

    return (
      <AuthContext.Provider value={this.state}>
        {error && <Alert message={error} onClose={this.closeAlert} />}
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthProvider);
