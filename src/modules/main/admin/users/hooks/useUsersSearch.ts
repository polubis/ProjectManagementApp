import { useState, useMemo, useEffect } from 'react';

import { AccountRole, User } from 'shared/models';
import { useQueryParams, getNumericParam, createQuery, isWindowScrollBottom, Url } from 'utils';
import { BehaviorSubject, from, throwError, Observable, fromEvent, Subject, of } from 'rxjs';
import { useHistory, useRouteMatch } from 'react-router';
import {
  tap,
  debounceTime,
  map,
  distinctUntilChanged,
  switchMap,
  catchError,
  filter,
  takeUntil,
  mergeMap,
  scan,
  throttleTime,
} from 'rxjs/operators';
import { getUsers } from '../services';

interface State {
  data: User[];
  error: string;
  loading: boolean;
  loadingMore: boolean;
  pendingLoadings: number;
}

interface Filters {
  limit: number;
  page: number;
  role: AccountRole;
  query: string;
}

interface Payload {
  filters: Filters;
  filtersAsString: string;
}

const STATE: State = {
  data: [],
  error: '',
  loading: true,
  loadingMore: false,
  pendingLoadings: 1,
};

const [LIMIT, PAGE] = [25, 1];

// FILTERS CHANGED -> FILTERS PARSE -> NORMAL LOADING -> ONLY CHANGED FILTERS -> DISABLE CURRENT LOADING MORE ACTIONS -> INIT LOADERS -> SET DATA  -> OFF LOADERS
//                                                                                                                                    -> SET ERROR

//                                     LOADING MORE

export const useUsersSearch = (): State => {
  const {
    params: { role },
  } = useRouteMatch<{ role: AccountRole }>();

  const { location, replace } = useHistory();

  const [limit, page, query] = useQueryParams('limit', 'page', 'query');

  const [state, setState] = useState(STATE);

  const load = useMemo(() => new Subject<Payload>(), []);
  const load$ = useMemo(() => load.asObservable(), []);

  const payload = useMemo((): Payload => {
    const parsedLimit = getNumericParam(limit, LIMIT);
    const parsedPage = getNumericParam(page, PAGE);

    const filters: Filters = { role, limit: parsedLimit, page: parsedPage, query };

    return { filters, filtersAsString: createQuery(filters) };
  }, [location]);

  useEffect(() => {
    const sub = load$
      .pipe(
        distinctUntilChanged((prev, curr) => prev.filtersAsString === curr.filtersAsString),
        tap(() => {
          setState({ ...STATE });
        }),
        switchMap(({ filtersAsString }) =>
          from(getUsers(filtersAsString)).pipe(
            tap((data) => {
              setState({
                ...STATE,
                data,
                loading: false,
                pendingLoadings: 0,
              });
            }),
            catchError((error) => {
              setState({
                ...STATE,
                error,
                loading: false,
                pendingLoadings: 0,
              });

              return throwError(error);
            })
          )
        )
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    load.next(payload);
  }, [payload]);

  console.log('re-render');

  // useEffect(() => {
  //   const sub = fromEvent(document, 'scroll')
  //     .pipe(
  //       filter(() => isWindowScrollBottom()),
  //       map(() => window.scrollY),
  //       scan((prev, curr) => Math.max(prev, curr), 0),
  //       distinctUntilChanged(),
  //       throttleTime(1000),
  //       tap(() => {
  //         console.log('siema');
  //         // const searchParams = new URLSearchParams(location.pathname);
  //         // searchParams.delete('page');
  //         // searchParams.append('page', '' + (payload.filters.page + 1));
  //         // replace(location.pathname + '?' + searchParams);
  //       })
  //     )
  //     .subscribe();

  //   return () => {
  //     sub.unsubscribe();
  //   };
  // }, []);

  // const load = useMemo(
  //   () =>
  //     new BehaviorSubject<Filters>({
  //       role,
  //       query,
  //       limit: getNumericParam(limit, LIMIT),
  //       page: getNumericParam(page, PAGE),
  //     }),
  //   []
  // );
  // const load$ = useMemo(() => load.asObservable(), []);

  // const loadMore = useMemo(() => new Subject<void>(), []);
  // const loadMore$ = useMemo(() => loadMore.asObservable(), []);

  // useEffect(() => {
  //   load.next({
  //     role,
  //     query,
  //     limit: getNumericParam(limit, LIMIT),
  //     page: getNumericParam(page, PAGE),
  //   });
  // }, [location]);

  // useEffect(() => {
  //   const onInit = (): void => {
  //     setState({ ...STATE });
  //   };

  //   const onSuccess = (users: User[]): void => {
  //     setState(createState({ error: '', pendingRequests: 0, users }));
  //   };

  //   const onError = (error: string): Observable<string> => {
  //     setState(createState({ error, pendingRequests: 0, users: [] }));

  //     return throwError(error);
  //   };

  //   const sub = load$
  //     .pipe(
  //       map(createQuery),
  //       distinctUntilChanged(),
  //       tap(onInit),
  //       map((query) => from(getUsers(query))),
  //       switchMap((obs) => obs.pipe(tap(onSuccess), catchError(onError)))
  //     )
  //     .subscribe();

  //   return () => {
  //     sub.unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   const sub = fromEvent(document, 'scroll')
  //     .pipe(
  //       debounceTime(150),
  //       filter(() => isWindowScrollBottom()),
  //       tap(() => loadMore.next())
  //     )
  //     .subscribe();

  //   return () => {
  //     sub.unsubscribe();
  //   };
  // }, []);

  return state;
};
