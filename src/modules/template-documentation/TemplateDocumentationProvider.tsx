import React, { createContext, useContext, ReactNode } from 'react';

import { TemplateDocumentationItem, getTemplateDocumentation } from 'core/api';

namespace TemplateDocumentationProvider {
  export interface State {
    loading: boolean;
    error: string;
    documentation: TemplateDocumentationItem[];
    getTemplateDocumentation?(url: string): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: TemplateDocumentationProvider.State = {
  loading: true,
  error: '',
  documentation: []
};

const Context = createContext(STATE);

class Provider extends React.Component<TemplateDocumentationProvider.Props, typeof STATE> {
  getTemplateDocumentation = async (url: string) => {
    if (!this.state.loading) {
      this.setState({ ...STATE });
    }

    try {
      const { readmeLines: documentation } = await getTemplateDocumentation(url);

      this.setState({ ...STATE, loading: false, documentation });
    } catch (error) {
      this.setState({ ...STATE, loading: false, error });
    }
  };

  readonly state: typeof STATE = {
    ...STATE,
    getTemplateDocumentation: this.getTemplateDocumentation
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

const TemplateDocumentationProvider = Provider;

export const useTemplateDocumentationProvider = () => {
  const context = useContext(Context);

  return context;
};

export default TemplateDocumentationProvider;
