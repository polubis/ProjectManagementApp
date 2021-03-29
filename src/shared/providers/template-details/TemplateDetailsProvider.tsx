import React, { createContext, useContext } from 'react';
import { from, Subscription } from 'rxjs';

import { getTemplateDetails } from 'shared/services';
import { Template } from 'shared/models';

namespace TemplateDetailsProvider {
  export interface State {
    loading: boolean;
    error: string;
    template: Template;
    getTemplateDetails(id: string): void;
    updateTemplate(template: Partial<Template>): void;
  }
}

const STATE: TemplateDetailsProvider.State = {
  loading: true,
  error: '',
  template: null,
  getTemplateDetails: () => {},
  updateTemplate: () => {},
};

const Context = createContext(STATE);

class Provider extends React.Component<any, typeof STATE> {
  private _subs = new Subscription();

  componentWillUnmount(): void {
    this._subs.unsubscribe();
  }

  getTemplateDetails = (id: string): void => {
    if (!this.state.loading) {
      this.setState({ loading: true, error: '', template: null });
    }

    const load$ = from(getTemplateDetails(id));

    load$.subscribe(
      (template) => {
        this.setState({ loading: false, error: '', template });
      },
      (error) => {
        this.setState({ loading: false, template: null, error });
      }
    );
  };

  updateTemplate = (template: Partial<Template>): void => {
    this.setState((prevState) => ({
      template: {
        ...prevState.template,
        ...template,
      },
    }));
  };

  readonly state: typeof STATE = {
    ...STATE,
    getTemplateDetails: this.getTemplateDetails,
    updateTemplate: this.updateTemplate,
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const TemplateDetailsProvider = Provider;

export const useTemplateDetailsProvider = () => {
  const context = useContext(Context);

  return context;
};

export default TemplateDetailsProvider;
