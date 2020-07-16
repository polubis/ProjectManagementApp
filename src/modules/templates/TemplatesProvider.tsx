import React, { createContext, useContext, ReactNode } from 'react';

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
  makeUrl = ({ page, limit, query, category, technologiesIds, patternsIds }: TemplatesPayload) => {
    const technologiesPart = technologiesIds.map((id) => `technologiesIds=${id}`).join('&');
    const patternsPart = patternsIds.map((id) => `patternsIds=${id}`).join('&');

    return `?page=${page}&limit=${limit}&query=${query}${
      technologiesPart ? `&${technologiesPart}` : ''
    }${patternsPart ? `&${patternsPart}` : ''}`;
  };

  getTemplates = async (payload: TemplatesPayload) => {
    const { limit, page } = payload;
    const loadingMore = page > 1;

    if (loadingMore && this.state.allLoaded) {
      return;
    }

    this.setState({ ...STATE, templates: loadingMore ? this.state.templates : [] });

    try {
      let templates = await getTemplates(this.makeUrl(payload));

      const allLoaded = templates.length < limit;

      if (loadingMore) {
        templates = [...this.state.templates, ...templates];
      }

      this.setState({ loading: false, templates, allLoaded, error: '' });
    } catch (error) {
      this.setState({ ...STATE, loading: false, error });
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
