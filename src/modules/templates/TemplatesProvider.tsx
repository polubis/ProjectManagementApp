import React, { createContext, useContext, ReactNode } from 'react';
import { Subject, Subscription, throwError } from 'rxjs';
import { filter, tap, catchError, switchMap, debounceTime, map } from 'rxjs/operators';

import { getTemplates, Template, TemplatesPayload } from 'core/api';

namespace TemplatesProvider {
  export interface State {
    loading: boolean;
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
  loading: true,
  allLoaded: false,
  error: '',
  templates: []
};

const Context = createContext(STATE);

class Provider extends React.Component<TemplatesProvider.Props, typeof STATE> {
  templatesRequested$ = new Subject<TemplatesPayload>();

  subs = new Subscription();

  componentDidMount() {
    this.subs.add(this.handleTemplatesRequest());
  }

  componentWillUnmount() {
    this.templatesRequested$.unsubscribe();
  }

  nextPage = ({ page }: TemplatesPayload) => page > 1;

  ableToLoad = (payload: TemplatesPayload) => !(this.nextPage(payload) && this.state.allLoaded);

  handleInit = (payload: TemplatesPayload) => {
    this.setState({ ...STATE, templates: this.nextPage(payload) ? this.state.templates : [] });
  };

  mergeTemplates = (payload: TemplatesPayload) => (templates: Template[]) =>
    this.nextPage(payload) ? [...this.state.templates, ...templates] : templates;

  handleSuccess = (payload: TemplatesPayload) => (templates: Template[]) => {
    this.setState({
      loading: false,
      allLoaded: templates.length < payload.limit,
      templates,
      error: ''
    });
  };

  handleError = (error: string) => {
    this.setState({ loading: false, error });

    return throwError(error);
  };

  makeUrl = ({ page, limit, query, category, technologiesIds, patternsIds }: TemplatesPayload) => {
    const technologiesPart = technologiesIds.map((id) => `technologiesIds=${id}`).join('&');
    const patternsPart = patternsIds.map((id) => `patternsIds=${id}`).join('&');

    return `?page=${page}&limit=${limit}&query=${query}${
      technologiesPart ? `&${technologiesPart}` : ''
    }${patternsPart ? `&${patternsPart}` : ''}`;
  };

  handleTemplatesRequest = () => {
    return this.templatesRequested$
      .pipe(
        debounceTime(200),
        filter(this.ableToLoad),
        tap(this.handleInit),
        switchMap((payload) =>
          getTemplates(this.makeUrl(payload)).pipe(
            map(this.mergeTemplates(payload)),
            tap(this.handleSuccess(payload)),
            catchError(this.handleError)
          )
        )
      )
      .subscribe();
  };

  getTemplates = (payload: TemplatesPayload) => {
    this.templatesRequested$.next(payload);
  };

  readonly state: typeof STATE = {
    ...STATE,
    getTemplates: this.getTemplates
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

const TemplatesProvider = Provider;

export const useTemplatesProvider = () => {
  const context = useContext(Context);

  return context;
};

export default TemplatesProvider;
