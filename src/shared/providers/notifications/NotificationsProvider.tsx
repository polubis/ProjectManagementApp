import React, { createContext, ReactNode, useContext } from 'react';

import { getNotifications } from 'shared/services';
import { Notification } from 'shared/models';

namespace NotificationsProvider {
  export interface State {
    loading: boolean;
    error: string;
    notifications: Notification<unknown>[];
    markNotificationAsRead?(id: number): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: NotificationsProvider.State = {
  loading: true,
  error: '',
  notifications: [],
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

  componentDidMount(): void {
    this._getNotifications();
  }

  markNotificationAsRead = (id: number): void => {
    this.setState((prevState) => ({
      notifications: prevState.notifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              readed: true,
            }
          : notification
      ),
    }));
  };

  readonly state: typeof STATE = {
    ...STATE,
    markNotificationAsRead: this.markNotificationAsRead,
  };

  render = (): JSX.Element => (
    <Context.Provider value={this.state}>{this.props.children}</Context.Provider>
  );
}

const NotificationsProvider = Provider;

export const useNotificationsProvider = (): NotificationsProvider.State => {
  const context = useContext(Context);

  return context;
};

export default NotificationsProvider;
