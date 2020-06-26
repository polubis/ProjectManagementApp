import React, { createContext, useContext } from 'react';

import { getTemplates, Template } from 'core/api';

namespace TemplatesProvider {
  export interface State {
    loading: boolean;
    allLoaded: boolean;
    error: string;
    templates: Template[];
    getTemplates?(url: string, page: number, limit: number): void;
  }
}

const STATE: TemplatesProvider.State = {
  loading: true,
  allLoaded: false,
  error: '',
  templates: []
};

const Context = createContext(STATE);

class Provider extends React.Component<any, typeof STATE> {
  getTemplates = async (url: string, limit: number, page: number) => {
    const loadingMore = page > 1;

    if (loadingMore && this.state.allLoaded) {
      return;
    }

    this.setState({ loading: true, error: '', templates: loadingMore ? this.state.templates : [] });

    try {
      let templates = await getTemplates(url);

      if (loadingMore) {
        templates = [...this.state.templates, ...templates];
      }

      this.setState({
        loading: false,
        templates,
        allLoaded: templates.length < limit,
        error: ''
      });
    } catch (error) {
      this.setState({ loading: false, error, templates: [] });
    }
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
