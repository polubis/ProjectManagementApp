import React, { createContext, ReactNode, useContext } from 'react';

import { TemplateDocumentationItem, getTemplateDocumentation } from 'core/api';

namespace TemplateDocumentationProvider {
  export interface State {
    documentation: TemplateDocumentationItem[];
    loading: boolean;
    getTemplateDocumentation?(url: string): Promise<void>;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: TemplateDocumentationProvider.State = {
  documentation: [],
  loading: true
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
    } catch {
      this.setState({ ...STATE, loading: false });
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
