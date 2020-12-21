import React, { createContext, ReactNode, useContext } from 'react';
import { Subject, Subscription, from, throwError } from 'rxjs';
import { tap, concatMap, catchError, switchMap, filter } from 'rxjs/operators';

import { getNotifications, markNotificationAsRead } from 'shared/services';
import { Notification, GetNotificationsPayload } from 'shared/models';
import AlertsProvider, { AlertsContext } from 'shared/providers/alerts';

namespace NotificationsProvider {
  export interface State {
    error: string;
    loading: boolean;
    loadingMore: boolean;
    notifications: Notification<unknown>[];
    loadNotifications?(): void;
    markNotificationAsRead?(id: string): Promise<void>;
  }

  export interface Props {
    children: ReactNode;
  }
}

const PAYLOAD: GetNotificationsPayload = { limit: 25, page: 1 };

const STATE: NotificationsProvider.State = {
  error: '',
  loading: true,
  loadingMore: false,
  notifications: [],
};

const Context = createContext(STATE);

class Provider extends React.Component<NotificationsProvider.Props, typeof STATE> {
  static contextType = AlertsContext;

  private _load = new Subject<void>();
  private _load$ = this._load.asObservable();

  private _loadMore = new Subject<void>();
  private _loadMore$ = this._loadMore.asObservable();

  private _subs = new Subscription();

  private _payload: GetNotificationsPayload = PAYLOAD;

  private _allLoaded = false;

  private _handleLoad = (): Subscription =>
    this._load$
      .pipe(
        tap(() => {
          this._payload = PAYLOAD;
          this.setState({ ...STATE });
        }),
        switchMap(() =>
          from(getNotifications(this._payload)).pipe(
            tap((notifications) => {
              this._allLoaded = this._areAllLoaded(this._payload.limit, notifications.length);
              this.setState({ ...STATE, loading: false, notifications });
            }),
            catchError((error) => {
              this.setState({ ...STATE, error, loading: false });
              return throwError(error);
            })
          )
        )
      )
      .subscribe();

  private _areAllLoaded = (limit: number, length: number): boolean => length < limit;

  private _handleLoadMore = (): Subscription =>
    this._loadMore$
      .pipe(
        filter(() => !this._allLoaded),
        tap(() => {
          this._payload.page = this._payload.page + 1;
          this.setState({ loadingMore: true });
        }),
        concatMap(() =>
          from(getNotifications(this._payload)).pipe(
            tap((notifications) => {
              this._allLoaded = this._areAllLoaded(this._payload.limit, notifications.length);

              this.setState((prevState) => ({
                notifications: [...prevState.notifications, ...notifications],
                error: '',
                loadingMore: false,
              }));
            }),
            catchError((error) => {
              this.setState({ loadingMore: false, notifications: [], error });
              return throwError(error);
            })
          )
        )
      )
      .subscribe();

  context: React.ContextType<React.Context<AlertsProvider.State>>;

  componentDidMount(): void {
    this._subs.add(this._handleLoad());
    this._subs.add(this._handleLoadMore());
  }

  componentWillUnmount(): void {
    this._subs.unsubscribe();
  }

  markNotificationAsRead = async (id: string): Promise<void> => {
    const idx = this.state.notifications.findIndex((n) => n.id === id);
    const notification = this.state.notifications[idx];

    if (!notification || notification.readed) {
      return;
    }

    this.setState(({ notifications }) => {
      const newNotifications = [...notifications];
      notifications[idx] = { ...notification, readed: true };

      return { notifications: newNotifications };
    });

    try {
      await markNotificationAsRead({ notificationId: id });
    } catch (message) {
      this.setState(
        ({ notifications }) => {
          const newNotifications = [...notifications];
          notifications[idx] = { ...notification, readed: false };

          return { notifications: newNotifications };
        },
        () => {
          this.context.showAlert({ message });
        }
      );
    }
  };

  loadNotifications = (): void => {
    const shouldLoadMore = !!this.state.notifications.length;

    shouldLoadMore ? this._loadMore.next() : this._load.next();
  };

  readonly state: typeof STATE = {
    ...STATE,
    markNotificationAsRead: this.markNotificationAsRead,
    loadNotifications: this.loadNotifications,
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
