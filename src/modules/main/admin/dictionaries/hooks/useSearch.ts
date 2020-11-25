import { useState, useEffect, useMemo } from 'react';
import { History } from 'history';
import { BehaviorSubject, from, throwError, Observable } from 'rxjs';
import { switchMap, tap, map, catchError, debounceTime } from 'rxjs/operators';

import { useQueryParams } from 'utils';

import { getPatterns, getTechnologies } from 'api';

import { DictionaryKind, Dictionary } from '..';

interface State {
  data: Dictionary[];
  pending: boolean;
}

interface Payload {
  kind: DictionaryKind;
  query: string;
}

export const useSearch = (kind: DictionaryKind, { location }: History) => {
  const [query] = useQueryParams('query');

  const load = useMemo(
    () => new BehaviorSubject<Payload>({ kind, query }),
    []
  );
  const load$ = useMemo(() => load.asObservable(), []);

  const [state, setState] = useState<State>({
    data: [],
    pending: true,
  });

  useEffect(() => {
    load.next({
      kind,
      query,
    });
  }, [location.key]);

  useEffect(() => {
    const onInit = (): void => {
      setState({ data: [], pending: true });
    };

    const onSuccess = (data: Dictionary[]): void => {
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
        map(({ kind, query }) => ({ kind, query: `?query=${query}` } as Payload)),
        map(({ kind, query }) =>
          kind === DictionaryKind.PATTERNS ? getPatterns(query) : getTechnologies(query)
        ),
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
