import React, { createContext, useContext, ReactNode } from 'react';

import { getTemplateDocumentation } from 'api';

import { TemplateDocumentation } from 'shared/models';

namespace TemplateDocumentationProvider {
  export interface State {
    loading: boolean;
    error: string;
    documentation: TemplateDocumentation;
    getTemplateDocumentation?(url: string): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: TemplateDocumentationProvider.State = {
  loading: true,
  error: '',
  documentation: { headings: [], readmeLines: [] },
};

const Context = createContext(STATE);

class Provider extends React.Component<TemplateDocumentationProvider.Props, typeof STATE> {
  getTemplateDocumentation = async (url: string) => {
    if (!this.state.loading) {
      this.setState({ ...STATE });
    }

    try {
      const documentation = await getTemplateDocumentation(url);

      this.setState({ ...STATE, loading: false, documentation });
    } catch (error) {
      this.setState({ ...STATE, loading: false, error });
    }
  };

  readonly state: typeof STATE = {
    ...STATE,
    getTemplateDocumentation: this.getTemplateDocumentation,
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const TemplateDocumentationProvider = Provider;

export const useTemplateDocumentationProvider = () => {
  const context = useContext(Context);

  return context;
};

export default TemplateDocumentationProvider;
