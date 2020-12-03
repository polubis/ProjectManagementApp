import React, { createContext, useContext, ReactNode } from 'react';
import { Subject, Subscription, throwError } from 'rxjs';
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

import { getTemplates } from 'api';

import { Template, TemplatesPayload } from 'shared/models';

namespace TemplatesProvider {
  export interface State {
    pendingRequests: number;
    allLoaded: boolean;
    error: string;
    templates: Template[];
    getTemplates?(payload: TemplatesPayload): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: TemplatesProvider.State = {
  pendingRequests: 1,
  allLoaded: false,
  error: '',
  templates: [],
};

const Context = createContext(STATE);

class Provider extends React.Component<TemplatesProvider.Props, typeof STATE> {
  private _loadRequest = new Subject<TemplatesPayload>();

  private _loadRequest$ = this._loadRequest.asObservable();

  private _loadMoreRequest = new Subject<TemplatesPayload>();

  private _loadMoreRequest$ = this._loadMoreRequest.asObservable();

  private _subs = new Subscription();

  private _makeUrl = ({
    page,
    limit,
    query,
    category,
    technologiesIds,
    patternsIds,
  }: TemplatesPayload) => {
    const technologiesPart = technologiesIds.map((id) => `technologiesIds=${id}`).join('&');
    const patternsPart = patternsIds.map((id) => `patternsIds=${id}`).join('&');

    return `?page=${page}&limit=${limit}&query=${query}&category=${category}${
      technologiesPart ? `&${technologiesPart}` : ''
    }${patternsPart ? `&${patternsPart}` : ''}`;
  };

  private _areAllLoaded = ({ limit }: TemplatesPayload, { length }: Template[]) => length < limit;

  private _handleLoadRequest = () => {
    const initLoad = () => this.setState({ ...STATE });

    const handleGetTemplates = (payload: TemplatesPayload) => {
      const handleSuccess = (templates: Template[]) => {
        this.setState({
          allLoaded: this._areAllLoaded(payload, templates),
          pendingRequests: 0,
          error: '',
          templates,
        });
      };

      const handleError = (error: string) => {
        this.setState({ ...STATE, pendingRequests: 0, error });

        return throwError(error);
      };

      return getTemplates(this._makeUrl(payload)).pipe(tap(handleSuccess), catchError(handleError));
    };

    return this._loadRequest$
      .pipe(debounceTime(150), distinctUntilChanged(), tap(initLoad), switchMap(handleGetTemplates))
      .subscribe();
  };

  private _handleLoadMoreRequest = () => {
    const isLoadingAllowed = () => !this.state.allLoaded;

    const initLoad = () => {
      this.setState(({ pendingRequests }) => ({
        pendingRequests: pendingRequests + 1,
      }));
    };

    const handleGetTemplates = (payload: TemplatesPayload) => {
      const handleSuccess = (templates: Template[]) => {
        this.setState((prevState) => ({
          allLoaded: this._areAllLoaded(payload, templates),
          error: '',
          pendingRequests: prevState.pendingRequests - 1,
          templates: [...prevState.templates, ...templates],
        }));
      };

      const handleError = (error: string) => {
        this.setState(({ pendingRequests }) => ({
          pendingRequests: pendingRequests - 1,
          error,
        }));

        return throwError(error);
      };

      return getTemplates(this._makeUrl(payload)).pipe(
        takeUntil(this._loadRequest$),
        tap(handleSuccess),
        catchError(handleError)
      );
    };

    return this._loadMoreRequest$
      .pipe(filter(isLoadingAllowed), tap(initLoad), concatMap(handleGetTemplates))
      .subscribe();
  };

  getTemplates = (payload: TemplatesPayload) => {
    const loadingMore = payload.page > 1 && this.state.templates.length && !this.state.allLoaded;

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
    getTemplates: this.getTemplates,
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const TemplatesProvider = Provider;

export const useTemplatesProvider = () => {
  const context = useContext(Context);

  return context;
};

export default TemplatesProvider;
