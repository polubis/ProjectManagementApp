import React, { createContext, useContext, ReactNode } from 'react';
import { Subject, Subscription, from, empty } from 'rxjs';
import {
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  concatMap,
  takeUntil,
} from 'rxjs/operators';

import { createQuery } from 'utils';

import { User, GetUsersPayload } from 'shared/models';
import { getUsers } from 'shared/services';

namespace UsersProvider {
  export interface State {
    pendingRequests: number;
    allLoaded: boolean;
    error: string;
    users: User[];
    getUsers?(payload: GetUsersPayload): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: UsersProvider.State = {
  pendingRequests: 1,
  allLoaded: false,
  error: '',
  users: [],
};

const Context = createContext(STATE);

class Provider extends React.Component<UsersProvider.Props, typeof STATE> {
  private _loadRequest = new Subject<GetUsersPayload>();

  private _loadRequest$ = this._loadRequest.asObservable();

  private _loadMoreRequest = new Subject<GetUsersPayload>();

  private _loadMoreRequest$ = this._loadMoreRequest.asObservable();

  private _subs = new Subscription();

  private _areAllLoaded = ({ limit }: GetUsersPayload, { length }: User[]) => length < limit;

  private _handleLoadRequest = () => {
    const initLoad = () => this.setState({ ...STATE });

    const handleGetUsers = (payload: GetUsersPayload) => {
      const handleSuccess = (users: User[]) => {
        this.setState({
          allLoaded: this._areAllLoaded(payload, users),
          pendingRequests: 0,
          error: '',
          users,
        });
      };

      const handleError = (error: string) => {
        this.setState({ ...STATE, pendingRequests: 0, error });

        return empty();
      };

      return from(getUsers(createQuery(payload))).pipe(tap(handleSuccess), catchError(handleError));
    };

    return this._loadRequest$
      .pipe(debounceTime(150), distinctUntilChanged(), tap(initLoad), switchMap(handleGetUsers))
      .subscribe();
  };

  private _handleLoadMoreRequest = () => {
    const isLoadingAllowed = () => !this.state.allLoaded;

    const initLoad = () => {
      this.setState(({ pendingRequests }) => ({
        pendingRequests: pendingRequests + 1,
      }));
    };

    const handleGetUsers = (payload: GetUsersPayload) => {
      const handleSuccess = (users: User[]) => {
        this.setState((prevState) => ({
          allLoaded: this._areAllLoaded(payload, users),
          error: '',
          pendingRequests: prevState.pendingRequests - 1,
          users: [...prevState.users, ...users],
        }));
      };

      const handleError = (error: string) => {
        this.setState(({ pendingRequests }) => ({
          pendingRequests: pendingRequests - 1,
          error,
        }));

        return empty();
      };

      return from(getUsers(createQuery(payload))).pipe(
        takeUntil(this._loadRequest$),
        tap(handleSuccess),
        catchError(handleError)
      );
    };

    return this._loadMoreRequest$
      .pipe(filter(isLoadingAllowed), tap(initLoad), concatMap(handleGetUsers))
      .subscribe();
  };

  getUsers = (payload: GetUsersPayload) => {
    const loadingMore = payload.page > 1 && this.state.users.length && !this.state.allLoaded;

    if (loadingMore) {
      this._loadMoreRequest.next(payload);
    } else {
      this._loadRequest.next(payload);
    }
  };

  componentDidMount() {
    this._subs.add(this._handleLoadRequest());
    this._subs.add(this._handleLoadMoreRequest());
  }

  componentWillUnmount() {
    this._subs.unsubscribe();
  }

  readonly state: typeof STATE = {
    ...STATE,
    getUsers: this.getUsers,
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const UsersProvider = Provider;

export const useUsersProvider = () => {
  const context = useContext(Context);

  return context;
};

export default UsersProvider;
