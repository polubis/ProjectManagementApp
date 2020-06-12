import React from 'react';

import { getTemplates } from 'api';

import { TemplatesProviderState, INIT_STATE, TemplatesContext } from '.';

class TemplatesProvider extends React.Component<any, TemplatesProviderState> {
  getTemplates = async (page: number, query: string) => {
    const LIMIT = 25;

    if (this.state.allLoaded) {
      return;
    }

    this.setState({ loading: true, error: '' });

    try {
      const newTemplates = await getTemplates(page, query, LIMIT);

      const allLoaded = newTemplates.length < LIMIT;

      const templates = [...this.state.templates, ...newTemplates];

      this.setState({
        loading: false,
        templates,
        allLoaded,
        error: ''
      });
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  readonly state: TemplatesProviderState = {
    ...INIT_STATE,
    getTemplates: this.getTemplates
  };

  render() {
    return (
      <TemplatesContext.Provider value={this.state}>
        {this.props.children}
      </TemplatesContext.Provider>
    );
  }
}

export default TemplatesProvider;
