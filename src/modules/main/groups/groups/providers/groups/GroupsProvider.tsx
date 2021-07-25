import React, { createContext, useContext, ReactNode } from 'react';
import { Subject, Subscription, from, EMPTY } from 'rxjs';
import {
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  concatMap,
  takeUntil,
  map,
} from 'rxjs/operators';

import { Group, GetGroupsParams } from 'shared/models';
import { getGroups } from 'shared/services';

namespace GroupsProvider {
  export interface State {
    pendingRequests: number;
    allLoaded: boolean;
    error: string;
    groups: Group[];
    getGroups(payload: GetGroupsParams): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: Omit<GroupsProvider.State, 'getGroups'> = {
  pendingRequests: 1,
  allLoaded: false,
  error: '',
  groups: [],
};

const Context = createContext<GroupsProvider.State>(undefined);

class Provider extends React.Component<GroupsProvider.Props, GroupsProvider.State> {
  private _loadRequest = new Subject<GetGroupsParams>();

  private _loadRequest$ = this._loadRequest.asObservable();

  private _loadMoreRequest = new Subject<GetGroupsParams>();

  private _loadMoreRequest$ = this._loadMoreRequest.asObservable();

  private _subs = new Subscription();

  private _areAllLoaded = ({ limit }: GetGroupsParams, { length }: Group[]) => length < limit;

  // TODO: TELL BACKEND TO ALIGN MODEL WITH GOOD NAMING AND AFTER ADD ALL DATA DELETE THIS METHOD CALLS AND IMPLEMENTATION
  private _mapToFullGroups = (groups: Group[]): Group[] => {
    return groups.map((group) => ({
      ...group,
      topicsCount: 1,
      membersCount: (group as any).members,
      templatesCount: 1,
      thumbnailUrl: `https://billennium.pl/wp-content/uploads/2019/08/Billennium-22-768x512.jpg`,
    }));
  };

  private _handleLoadRequest = () => {
    const initLoad = () => this.setState({ ...STATE });

    const handleGetGroups = (payload: GetGroupsParams) => {
      const handleSuccess = (groups: Group[]) => {
        this.setState({
          allLoaded: this._areAllLoaded(payload, groups),
          pendingRequests: 0,
          error: '',
          groups,
        });
      };

      const handleError = (error: string) => {
        this.setState({ ...STATE, pendingRequests: 0, error });

        return EMPTY;
      };

      return from(getGroups(payload)).pipe(
        map(this._mapToFullGroups),
        tap(handleSuccess),
        catchError(handleError)
      );
    };

    return this._loadRequest$
      .pipe(
        debounceTime(150),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        tap(initLoad),
        switchMap(handleGetGroups)
      )
      .subscribe();
  };

  private _handleLoadMoreRequest = () => {
    const isLoadingAllowed = () => !this.state.allLoaded;

    const initLoad = () => {
      this.setState(({ pendingRequests }) => ({
        pendingRequests: pendingRequests + 1,
      }));
    };

    const handleGetGroups = (payload: GetGroupsParams) => {
      const handleSuccess = (groups: Group[]) => {
        this.setState((prevState) => ({
          allLoaded: this._areAllLoaded(payload, groups),
          error: '',
          pendingRequests: prevState.pendingRequests - 1,
          groups: [...prevState.groups, ...groups],
        }));
      };

      const handleError = (error: string) => {
        this.setState(({ pendingRequests }) => ({
          pendingRequests: pendingRequests - 1,
          error,
        }));

        return EMPTY;
      };

      return from(getGroups(payload)).pipe(
        map(this._mapToFullGroups),
        takeUntil(this._loadRequest$),
        tap(handleSuccess),
        catchError(handleError)
      );
    };

    return this._loadMoreRequest$
      .pipe(
        filter(isLoadingAllowed),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        tap(initLoad),
        concatMap(handleGetGroups)
      )
      .subscribe();
  };

  getGroups = (payload: GetGroupsParams) => {
    const loadingMore = payload.page > 1 && this.state.groups.length && !this.state.allLoaded;

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

  readonly state: GroupsProvider.State = {
    ...STATE,
    getGroups: this.getGroups,
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

export const GroupsProvider = Provider;

export const useGroupsProvider = () => useContext(Context);
