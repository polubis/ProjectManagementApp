import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Subject, from, EMPTY } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError,
  takeUntil,
  concatMap,
  filter,
} from 'rxjs/operators';
import { GetUsersPayload, User } from 'shared/models';
import { createQuery } from 'utils';
import * as Services from 'shared/services';

interface UsersState {
  pendingRequests: number;
  allLoaded: boolean;
  error: string;
  users: User[];
}

interface UsersProviderContext extends UsersState {
  getUsers: (payload: GetUsersPayload) => void;
}

const Context = createContext<UsersProviderContext | null>(null);

const useSubject = <T extends unknown>() => {
  const subject = useMemo(() => {
    const subject = new Subject<T>();
    const obs$ = subject.asObservable();

    const next = (value: T) => {
      subject.next(value);
    };

    return [next, obs$] as const;
  }, []);

  return subject;
};

const areAllLoaded = (limit: number, length: number) => length < limit;

type ObservableCtx = { payload: GetUsersPayload; usersState: UsersState };

const STATE: UsersState = {
  pendingRequests: 1,
  allLoaded: false,
  error: '',
  users: [],
};

const useUsersLoad = () => {
  const [usersState, setUsersState] = useState(STATE);

  const [loadRequest, loadRequest$] = useSubject<ObservableCtx>();
  const [loadMoreRequest, loadMoreRequest$] = useSubject<ObservableCtx>();

  const loadRequestSub = useMemo(
    () =>
      loadRequest$
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => setUsersState(STATE)),
          switchMap((ctx) =>
            from(Services.getUsers(createQuery(ctx.payload))).pipe(
              tap((users) => {
                setUsersState({
                  allLoaded: areAllLoaded(ctx.payload.limit, users.length),
                  pendingRequests: 0,
                  error: '',
                  users,
                });
              }),
              catchError((error) => {
                setUsersState({ ...STATE, pendingRequests: 0, error });
                return EMPTY;
              })
            )
          )
        )
        .subscribe(),
    []
  );

  const loadMoreRequestSub = useMemo(
    () =>
      loadMoreRequest$
        .pipe(
          filter((ctx) => !ctx.usersState.allLoaded),
          tap(() =>
            setUsersState((prevState) => ({
              ...prevState,
              pendingRequests: prevState.pendingRequests + 1,
            }))
          ),
          concatMap((ctx) =>
            from(Services.getUsers(createQuery(ctx.payload))).pipe(
              takeUntil(loadRequest$),
              tap((users) => {
                setUsersState((prevState) => ({
                  allLoaded: areAllLoaded(ctx.payload.limit, users.length),
                  error: '',
                  pendingRequests: prevState.pendingRequests - 1,
                  users: [...prevState.users, ...users],
                }));
              }),
              catchError((error) => {
                setUsersState((prevState) => ({
                  ...STATE,
                  pendingRequests: prevState.pendingRequests - 1,
                  error,
                }));
                return EMPTY;
              })
            )
          )
        )
        .subscribe(),
    []
  );

  const getUsers = (payload: GetUsersPayload) => {
    const loadingMore = payload.page > 1 && usersState.users.length && !usersState.allLoaded;
    loadingMore ? loadMoreRequest({ payload, usersState }) : loadRequest({ payload, usersState });
  };

  useEffect(() => {
    return () => {
      loadMoreRequestSub.unsubscribe();
      loadRequestSub.unsubscribe();
    };
  }, []);

  const result: UsersProviderContext = useMemo(
    () => ({
      ...usersState,
      getUsers,
    }),
    []
  );

  return result;
};

export interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const usersState = useUsersLoad();

  const value: UsersProviderContext = useMemo(() => usersState, [usersState]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useUsersProvider = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('Lack of ContextProvider');
  }

  return context;
};
