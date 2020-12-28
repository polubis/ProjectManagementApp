import React, { createContext, useContext, ReactNode } from 'react';
import { Subject, Subscription, throwError, from } from 'rxjs';
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

import { Survey, GetSurveysPayload } from 'shared/models';
import { getSurveys } from 'shared/services';

namespace SurveysProvider {
  export interface State {
    pendingRequests: number;
    allLoaded: boolean;
    error: string;
    surveys: Survey[];
    loadSurveys?(payload: GetSurveysPayload): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: SurveysProvider.State = {
  pendingRequests: 1,
  allLoaded: false,
  error: '',
  surveys: [],
};

const Context = createContext(STATE);

class Provider extends React.Component<SurveysProvider.Props, typeof STATE> {
  private _loadRequest = new Subject<GetSurveysPayload>();

  private _loadRequest$ = this._loadRequest.asObservable();

  private _loadMoreRequest = new Subject<GetSurveysPayload>();

  private _loadMoreRequest$ = this._loadMoreRequest.asObservable();

  private _subs = new Subscription();

  private _areAllLoaded = ({ limit }: GetSurveysPayload, { length }: Survey[]) => length < limit;

  private _handleLoadRequest = () => {
    const initLoad = () => this.setState({ ...STATE });

    const handleGetUsers = (payload: GetSurveysPayload) => {
      const handleSuccess = (surveys: Survey[]) => {
        this.setState({
          allLoaded: this._areAllLoaded(payload, surveys),
          pendingRequests: 0,
          error: '',
          surveys,
        });
      };

      const handleError = (error: string) => {
        this.setState({ ...STATE, pendingRequests: 0, error });

        return throwError(error);
      };

      return from(getSurveys(payload)).pipe(tap(handleSuccess), catchError(handleError));
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

    const handleGetUsers = (payload: GetSurveysPayload) => {
      const handleSuccess = (surveys: Survey[]) => {
        this.setState((prevState) => ({
          allLoaded: this._areAllLoaded(payload, surveys),
          error: '',
          pendingRequests: prevState.pendingRequests - 1,
          surveys: [...prevState.surveys, ...surveys],
        }));
      };

      const handleError = (error: string) => {
        this.setState(({ pendingRequests }) => ({
          pendingRequests: pendingRequests - 1,
          error,
        }));

        return throwError(error);
      };

      return from(getSurveys(payload)).pipe(
        takeUntil(this._loadRequest$),
        tap(handleSuccess),
        catchError(handleError)
      );
    };

    return this._loadMoreRequest$
      .pipe(filter(isLoadingAllowed), tap(initLoad), concatMap(handleGetUsers))
      .subscribe();
  };

  loadSurveys = (payload: GetSurveysPayload): void => {
    const loadingMore = payload.page > 1 && this.state.surveys.length && !this.state.allLoaded;

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
    loadSurveys: this.loadSurveys,
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const SurveysProvider = Provider;

export const useSurveysProvider = () => {
  const context = useContext(Context);

  return context;
};

export default SurveysProvider;
