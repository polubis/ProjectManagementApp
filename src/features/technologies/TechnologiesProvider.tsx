import React from 'react';

import { getTechnologies } from 'api';

import { TechnologiesContext, TechnologiesProviderProps, TechnologiesProviderState, INIT_STATE } from '.';

class TechnologiesProvider extends React.Component<
  TechnologiesProviderProps,
  TechnologiesProviderState
> {
  componentDidMount() {
    this.load();
  }

  load = async () => {
    const { isLoading } = this.state;

    if (!isLoading) {
      this.setState({ ...INIT_STATE, isLoading: true });
    }

    try {
      const technologies = await getTechnologies();

      this.setState({ ...INIT_STATE, technologies });
    } catch (error) {
      this.setState({ ...INIT_STATE, error });
    }
  };

  readonly state: TechnologiesProviderState = INIT_STATE;

  render() {
    return (
      <TechnologiesContext.Provider value={this.state}>
        {this.props.children}
      </TechnologiesContext.Provider>
    );
  }
}

export default TechnologiesProvider;
