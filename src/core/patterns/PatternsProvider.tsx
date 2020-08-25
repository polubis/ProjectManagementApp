import React, { createContext, ReactNode, useContext } from 'react';

import { Pattern, getPatterns } from 'core/api';

namespace PatternsProvider {
  export interface State {
    patterns: Pattern[];
    loading: boolean;
    error: string;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: PatternsProvider.State = {
  patterns: [],
  loading: true,
  error: ''
};

const Context = createContext(STATE);

class Provider extends React.Component<PatternsProvider.Props, typeof STATE> {
  private _getPatterns = async () => {
    if (!this.state.loading) {
      this.setState({ ...STATE });
    }

    try {
      const patterns = await getPatterns();

      this.setState({ ...STATE, loading: false, patterns });
    } catch (error) {
      this.setState({ ...STATE, loading: false, error });
    }
  };

  componentDidMount() {
    this._getPatterns();
  }

  readonly state: typeof STATE = {
    ...STATE
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const PatternsProvider = Provider;

export const usePatternsProvider = () => {
  const context = useContext(Context);

  return context;
};

export default PatternsProvider;
