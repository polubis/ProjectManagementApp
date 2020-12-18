import React, { createContext, ReactNode, useContext } from 'react';

import { Alert } from 'ui';

namespace AlertsProvider {
  export interface State {
    alerts: Alert.Props[];
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: AlertsProvider.State = {
  alerts: [],
};

const Context = createContext(STATE);

// ALERT OCCURS
class Provider extends React.Component<AlertsProvider.Props, typeof STATE> {
  readonly state: typeof STATE = {
    ...STATE,
  };

  render = () => (
    <Context.Provider value={this.state}>
      <Alert id={1} message="Error occured" type="error" onClose={() => {}} />
      <Alert id={1} message="Success occured" type="success" onClose={() => {}} />

      {this.props.children}
    </Context.Provider>
  );
}

const AlertsProvider = Provider;

export const useAlertsProvider = () => {
  const context = useContext(Context);

  return context;
};

export default AlertsProvider;
