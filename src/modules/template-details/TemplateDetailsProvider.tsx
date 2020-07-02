import React, { createContext, useContext } from 'react';
import { Template, getTemplate } from 'core/api';

namespace TemplateDetailsProvider {
  export interface State {
    loading: boolean;
    error: string;
    template: Template;
    getTemplate?(id: string): void;
  }
}

const STATE: TemplateDetailsProvider.State = {
  loading: true,
  error: '',
  template: null
};

const Context = createContext(STATE);

class Provider extends React.Component<any, typeof STATE> {
  getTemplate = async (id: string) => {
    this.setState({
      loading: true,
      error: ''
    });
    try {
      const template = await getTemplate(id);

      this.setState({
        loading: false,
        template,
        error: ''
      })
    }
    catch (error){
      this.setState({
        loading: false,
        error,
        template: null
      })
    }
  };

  readonly state: typeof STATE = {
    ...STATE,
    getTemplate: this.getTemplate
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

const TemplateDetailsProvider = Provider;

export const useTemplateDetailsProvider = () => {
  const context = useContext(Context);
  
  return context;
}

export default TemplateDetailsProvider;