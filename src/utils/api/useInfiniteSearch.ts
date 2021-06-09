import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useQueryParams } from '../routing';
import { from, Subject, Observable, Subscription, empty } from 'rxjs';
import { switchMap, tap, concatMap, takeUntil, catchError } from 'rxjs/operators';

interface Params {
  limit: number;
  page: number;
  query: string;
}

type Source<T> = (params: Params) => Promise<T[]>;

interface State<T> {
  allLoaded: boolean;
  counter: number;
  data: T[];
}

type OnAllLoaded<T> = (state: State<T>, params: Params) => void;

type InfiniteSearch<T> = [State<T>];

interface Payload<T> {
  params: Params;
  source$: Observable<T[]>;
}

const [LIMIT, PAGE] = [1, 25];

const toNumericParam = (value: string | undefined | null, defaultValue: number): number => {
  const numericValue = +value;
  return Number.isNaN(numericValue) ? defaultValue : numericValue;
};

const toNotEmptyQuery = (query?: string): string => query ?? '';

const createParams = (limit?: string, page?: string, query?: string): Params => ({
  limit: toNumericParam(limit, LIMIT),
  page: toNumericParam(page, PAGE),
  query: toNotEmptyQuery(query),
});

const createPayload = <T>(source: Source<T>, params: Params): Payload<T> => ({
  source$: from(source(params)),
  params,
});

const isAllLoaded = <T>({ length }: T[], limit: number): boolean => length < limit;

const loadInit = <T>({ allLoaded, counter }: State<T>): State<T> => ({
  allLoaded,
  counter: counter + 1,
  data: [],
});

const loadSuccess = <T>(data: T[], limit: number) => ({ counter }: State<T>): State<T> => ({
  allLoaded: isAllLoaded(data, limit),
  counter: counter - 1,
  data,
});

const loadFailure = <T>({ allLoaded, counter }: State<T>): State<T> => ({
  allLoaded,
  counter: counter - 1,
  data: [],
});

const moreInit = <T>({ allLoaded, counter, data }: State<T>): State<T> => ({
  allLoaded,
  counter: counter + 1,
  data,
});

const moreSuccess = <T>(data: T[], limit: number) => ({
  counter,
  data: currData,
}: State<T>): State<T> => ({
  allLoaded: isAllLoaded(data, limit),
  counter: counter - 1,
  data: [...currData, ...data],
});

const moreFailure = <T>({ allLoaded, counter, data }: State<T>): State<T> => ({
  allLoaded,
  counter: counter - 1,
  data,
});

const hasEqualParams = (prevParams: Params, currParams: Params): boolean =>
  JSON.stringify(prevParams) !== JSON.stringify(currParams);

const usePrevious = <T>(value: T): T => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const useInfiniteSearch = <T>(
  source: Source<T>,
  onAllLoaded: OnAllLoaded<T>
): InfiniteSearch<T> => {
  const queryParams = useQueryParams('limit', 'page', 'query');
  const params = useMemo(() => createParams(...queryParams), [queryParams]);
  const prevParams = usePrevious(params);

  const [state, setState] = useState<State<T>>({ allLoaded: false, counter: 1, data: [] });

  const more = useMemo(() => new Subject<Payload<T>>(), []);
  const more$ = useMemo(() => more.asObservable(), []);

  const load = useMemo(() => new Subject<Payload<T>>(), []);
  const load$ = useMemo(() => load.asObservable(), []);

  useEffect(() => {
    if (hasEqualParams(prevParams, params)) {
      return;
    }

    const moreRequested = params.page > PAGE;

    if (moreRequested) {
      if (state.allLoaded) {
        return;
      }

      more.next(createPayload(source, params));
      return;
    }

    load.next(createPayload(source, params));
  }, [source, params]);

  useEffect(() => {
    const subs = new Subscription();

    subs.add(
      load$
        .pipe(
          tap(() => setState(loadInit)),
          switchMap(({ params, source$ }) =>
            source$.pipe(
              tap((data) => loadSuccess(data, params.limit)),
              catchError(() => {
                setState(loadFailure);
                return empty();
              })
            )
          )
        )
        .subscribe()
    );

    subs.add(
      more$
        .pipe(
          tap(() => setState(moreInit)),
          concatMap(({ params, source$ }) =>
            source$.pipe(
              tap((data) => setState(moreSuccess(data, params.limit))),
              catchError(() => {
                setState(moreFailure);
                return empty();
              }),
              takeUntil(load$)
            )
          )
        )
        .subscribe()
    );

    return () => {
      subs.unsubscribe();
    };
  }, []);

  return [state];
};
