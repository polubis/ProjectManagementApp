import { useState, useEffect, useMemo } from 'react';
import { History } from 'history';
import { BehaviorSubject, Observable, throwError, from } from 'rxjs';
import { tap, debounceTime, map, switchMap, catchError } from 'rxjs/operators';

import { createQuery, useQueryParams } from 'utils';

import { AccountRole, User } from 'shared/models';

import { getUsers } from '../services';

interface Payload {
  limit: number;
  page: number;
  role: AccountRole;
  query: string;
}

interface State {
  data: User[];
  pending: boolean;
}

const [LIMIT, PAGE] = [25, 1];

export const useUsersSearch = (role: AccountRole, { location }: History): State => {
  const [query] = useQueryParams('query');

  const load = useMemo(
    () => new BehaviorSubject<Payload>({ role, query, limit: LIMIT, page: PAGE }),
    []
  );
  const load$ = useMemo(() => load.asObservable(), []);

  const [state, setState] = useState<State>({
    data: [],
    pending: true,
  });

  useEffect(() => {
    load.next({
      role,
      query,
      limit: LIMIT,
      page: PAGE,
    });
  }, [location.key]);

  useEffect(() => {
    const onInit = (): void => {
      setState({ data: [], pending: true });
    };

    const onSuccess = (data: User[]): void => {
      setState({ data, pending: false });
    };

    const onError = (error: string): Observable<string> => {
      setState({ data: [], pending: false });

      return throwError(error);
    };

    const sub = load$
      .pipe(
        tap(onInit),
        debounceTime(150),
        map((payload) => getUsers(createQuery(payload))),
        map((promise) => from(promise)),
        switchMap((obs) => obs.pipe(tap(onSuccess), catchError(onError)))
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return state;
};
