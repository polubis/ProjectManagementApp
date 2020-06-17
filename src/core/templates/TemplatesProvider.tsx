import React from 'react';

import { getTemplates, GetTemplatesPayload } from 'api';

import { TemplatesProviderState, INIT_STATE, TemplatesContext } from '.';

class TemplatesProvider extends React.Component<any, TemplatesProviderState> {
  getTemplates = async (payload: GetTemplatesPayload) => {
    const loadingMore = payload.page > 1;

    if (loadingMore && this.state.allLoaded) {
      return;
    }

    this.setState({ loading: true, error: '', templates: loadingMore ? this.state.templates : [] });

    try {
      let templates = await getTemplates(payload);

      if (loadingMore) {
        templates = [...this.state.templates, ...templates];
      }

      this.setState({
        loading: false,
        templates,
        allLoaded: templates.length < payload.limit,
        error: ''
      });
    } catch (error) {
      this.setState({ loading: false, error, templates: [] });
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
