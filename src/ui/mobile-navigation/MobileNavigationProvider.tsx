import React, { createContext, Component, useContext, ReactNode } from 'react';

namespace MobileNavigationProvider {
  export interface State {
    open: boolean;
    setOpen(open: boolean): void;
    toggleOpen(): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const MobileNavigationContext = createContext(undefined);

class MobileNavigationProvider extends Component<
  MobileNavigationProvider.Props,
  MobileNavigationProvider.State
> {
  setOpen = (open: boolean): void => {
    this.setState({ open });
  };

  toggleOpen = (): void => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  readonly state: MobileNavigationProvider.State = {
    open: false,
    setOpen: this.setOpen,
    toggleOpen: this.toggleOpen,
  };

  render(): JSX.Element {
    return (
      <MobileNavigationContext.Provider value={this.state}>
        {this.props.children}
      </MobileNavigationContext.Provider>
    );
  }
}

export const useMobileNavigationProvider = (): MobileNavigationProvider.State => {
  const context = useContext(MobileNavigationContext);

  return context;
};

export default MobileNavigationProvider;
