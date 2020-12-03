import React, { createContext, ReactNode, useContext } from 'react';

import { getPatterns } from 'api';

import { Pattern } from 'shared/models';

namespace PatternsProvider {
  export interface State {
    patterns: Pattern[];
    loading: boolean;
    error: string;
    getPatterns?(query?: string): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: PatternsProvider.State = {
  patterns: [],
  loading: true,
  error: '',
};

const Context = createContext(STATE);

class Provider extends React.Component<PatternsProvider.Props, typeof STATE> {
  getPatterns = async (query = '') => {
    if (!this.state.loading) {
      this.setState({ ...STATE });
    }

    try {
      const patterns = await getPatterns(query);

      this.setState({ ...STATE, loading: false, patterns });
    } catch (error) {
      this.setState({ ...STATE, loading: false, error });
    }
  };

  readonly state: typeof STATE = {
    ...STATE,
    getPatterns: this.getPatterns,
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const PatternsProvider = Provider;

export const usePatternsProvider = () => {
  const context = useContext(Context);

  return context;
};

export default PatternsProvider;
