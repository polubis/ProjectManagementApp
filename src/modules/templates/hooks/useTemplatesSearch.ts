import { useState, useEffect, useMemo } from 'react';
import { History } from 'history';
import { of, Subject } from 'rxjs';
import { tap, debounceTime, catchError, map, filter, switchMap } from 'rxjs/operators';

import { ScrollObserver, Url } from 'utils';

import { TemplatesPayload, Template, getTemplates } from 'core/api';

import { LIMIT } from '..';

interface State {
  allLoaded: boolean;
  pendingRequests: number;
  templates: Template[];
}

const STATE: State = {
  allLoaded: false,
  pendingRequests: 1,
  templates: []
};

const getUrl = ({ page, limit, query, technologiesIds, patternsIds }: TemplatesPayload): string => {
  const toStringList = (items: string[], key: string): string =>
    items.map((id) => `${key}=${id}`).join('&');

  const technologies = toStringList(technologiesIds, 'technologiesIds');
  const patterns = toStringList(patternsIds, 'patternsIds');

  return `?page=${page}&limit=${limit}&query=${query}${technologies ? `&${technologies}` : ''}${
    patterns ? `&${patterns}` : ''
  }`;
};

const areAllLoaded = (templates: Template[]) => templates.length < LIMIT;

export const useTemplatesSearch = ({ location, replace }: History, payload: TemplatesPayload) => {
  const [state, setState] = useState(STATE);

  const loadRequested = useMemo(() => new Subject<TemplatesPayload>(), []);
  const loadRequested$ = useMemo(() => loadRequested.asObservable(), []);

  const loadMoreRequested = useMemo(() => new Subject<TemplatesPayload>(), []);
  const loadMoreRequested$ = useMemo(() => loadMoreRequested.asObservable(), []);

  const scrolled$ = useMemo(() => new ScrollObserver(document).scrolled$, []);

  useEffect(() => {
    const sub = loadRequested$
      .pipe(
        tap(() => {
          setState(STATE);
        }),
        debounceTime(200),
        switchMap((payload) =>
          getTemplates(getUrl(payload)).pipe(
            tap((templates) => {
              setState({ allLoaded: areAllLoaded(templates), templates, pendingRequests: 0 });
            }),
            catchError(() => {
              setState((prevState) => ({ ...prevState, templates: [], pendingRequests: 0 }));

              return of(null);
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
    const sub = loadMoreRequested$.subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const sub = scrolled$
      .pipe(
        filter(({ bottom }) => bottom),
        map(() =>
          Url(location)
            .swap('page', payload.page + 1)
            .value()
        ),
        tap((url) => replace(url))
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [location, payload.page]);

  useEffect(() => {
    const loadingMore = payload.page > 1 && !!state.templates.length && !state.allLoaded;

    if (loadingMore) {
      loadMoreRequested.next(payload);
    } else {
      loadRequested.next(payload);
    }
  }, [payload]);

  return state;
};
