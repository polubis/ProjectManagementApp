import React, { createContext, Component, useContext, ReactNode } from 'react';

namespace SidebarProvider {
  export interface State {
    open: boolean;
    setOpen(open: boolean): void;
    toggleOpen(): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const SidebarContext = createContext(undefined);

class SidebarProvider extends Component<SidebarProvider.Props, SidebarProvider.State> {
  setOpen = (open: boolean): void => {
    this.setState({ open });
  };

  toggleOpen = (): void => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  readonly state: SidebarProvider.State = {
    open: false,
    setOpen: this.setOpen,
    toggleOpen: this.toggleOpen,
  };

  render(): JSX.Element {
    return (
      <SidebarContext.Provider value={this.state}>{this.props.children}</SidebarContext.Provider>
    );
  }
}

export const useSidebarProvider = (): SidebarProvider.State => {
  const context = useContext(SidebarContext);

  return context;
};

export default SidebarProvider;
