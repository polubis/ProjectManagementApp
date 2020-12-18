import React, { createContext, ReactNode, useContext } from 'react';

import { Alert } from 'ui';

namespace AlertsProvider {
  export interface State {
    alerts: Alert.Props[];
    showAlert?(message: string, type: Alert.Type): void;
    closeAlert?(id: number): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: AlertsProvider.State = {
  alerts: [],
};

const Context = createContext(STATE);

class Provider extends React.Component<AlertsProvider.Props, typeof STATE> {
  showAlert = (message: string, type: Alert.Type): void => {
    this.setState(({ alerts }) => {
      const id = alerts.length ? alerts.length + 1 : 1;
      const alert = {
        id,
        message,
        type,
        onClose: () => this.closeAlert(id),
      };

      return {
        alerts: [...alerts, alert],
      };
    });
  };

  closeAlert = (id: number): void => {
    this.setState(({ alerts }) => ({
      alerts: alerts.filter((a) => a.id !== id),
    }));
  };

  readonly state: typeof STATE = {
    ...STATE,
    showAlert: this.showAlert,
    closeAlert: this.closeAlert,
  };

  render = (): JSX.Element => (
    <Context.Provider value={this.state}>
      {this.state.alerts.map((alert) => (
        <Alert key={alert.id} {...alert} />
      ))}

      {this.props.children}
    </Context.Provider>
  );
}

const AlertsProvider = Provider;

export const useAlertsProvider = (): AlertsProvider.State => {
  const context = useContext(Context);

  return context;
};

export const AlertsContext = Context;

export default AlertsProvider;
