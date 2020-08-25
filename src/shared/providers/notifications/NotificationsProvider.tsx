import React, { createContext, ReactNode, useContext } from 'react';

import { Notification, getNotifications } from 'core/api';

namespace NotificationsProvider {
  export interface State {
    loading: boolean;
    error: string;
    notifications: Notification[];
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: NotificationsProvider.State = {
  loading: true,
  error: '',
  notifications: []
};

const Context = createContext(STATE);

class Provider extends React.Component<NotificationsProvider.Props, typeof STATE> {
  private _getNotifications = async () => {
    if (!this.state.loading) {
      this.setState({ ...STATE });
    }

    try {
      const notifications = await getNotifications();

      setTimeout(() => {
        this.setState({ ...STATE, loading: false, notifications });
      }, 1000);
    } catch (error) {
      this.setState({ ...STATE, loading: false, error });
    }
  };

  componentDidMount() {
    this._getNotifications();
  }

  readonly state: typeof STATE = {
    ...STATE
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const NotificationsProvider = Provider;

export const useNotificationsProvider = () => {
  const context = useContext(Context);

  return context;
};

export default NotificationsProvider;
