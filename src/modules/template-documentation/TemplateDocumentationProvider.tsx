import React, { createContext, useContext, ReactNode } from 'react';

import { getTemplateDocumentation, TemplateDocumentation } from 'core/api';

namespace TemplateDocumentationProvider {
  export interface State {
    loading: boolean;
    error: string;
    documentation: TemplateDocumentation;
    getTemplateDocumentation?(templateId: string): void;
    reset?(): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: TemplateDocumentationProvider.State = {
  loading: true,
  error: '',
  documentation: { headings: [], readmeLines: [] }
};

const Context = createContext(STATE);

class Provider extends React.Component<TemplateDocumentationProvider.Props, typeof STATE> {
  reset = () => {
    this.setState({ ...STATE });
  };

  getTemplateDocumentation = async (templateId: string) => {
    if (!this.state.loading) {
      this.setState({ ...STATE });
    }

    try {
      const documentation = await getTemplateDocumentation(templateId);

      this.setState({ ...STATE, loading: false, documentation });
    } catch (error) {
      this.setState({ ...STATE, loading: false, error });
    }
  };

  readonly state: typeof STATE = {
    ...STATE,
    getTemplateDocumentation: this.getTemplateDocumentation,
    reset: this.reset
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
