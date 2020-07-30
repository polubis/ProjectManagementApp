import React, { createContext, useContext } from 'react';

import { Template, getTemplateDetails } from 'core/api';

namespace TemplateDetailsProvider {
  export interface State {
    loading: boolean;
    error: string;
    template: Template;
    getTemplateDetails?(id: string): Promise<void>;
    reset?(): void;
  }
}

const STATE: TemplateDetailsProvider.State = {
  loading: true,
  error: '',
  template: null
};

const Context = createContext(STATE);

class Provider extends React.Component<any, typeof STATE> {
  reset = () => {
    this.setState({ ...STATE });
  };

  getTemplateDetails = async (id: string): Promise<void> => {
    if (!this.state.loading) {
      this.reset();
    }

    try {
      const template = await getTemplateDetails(id);

      this.setState({ ...STATE, loading: false, template });
    } catch (error) {
      this.setState({ ...STATE, loading: false, error });
    }
  };

  readonly state: typeof STATE = {
    ...STATE,
    getTemplateDetails: this.getTemplateDetails,
    reset: this.reset
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

const TemplateDetailsProvider = Provider;

export const useTemplateDetailsProvider = () => {
  const context = useContext(Context);

  return context;
};

export default TemplateDetailsProvider;
