import React, { createContext, ReactNode, useContext } from 'react';

type Alertable = {
  id: number;
  message: string;
  onClose(): void;
};

type Alert<T> = Omit<T, 'id' | 'message' | 'onClose'> & Alertable;

type AlertToAdd<T> = Omit<Partial<Alert<T>>, 'message'> & { message: string };

interface State<T> {
  alerts: Alert<T>[];
  showAlert?(alert: AlertToAdd<T>): void;
  closeAlert?(id: number): void;
}

interface Props<T> {
  children: ReactNode;
  presenter: React.ComponentType<{ alerts: Alert<T>[] }>;
}

export type AlertsManagementState<T extends Alertable> = State<T>;

export type AlertsManagementProps<T extends Alertable> = Props<T>;

export const makeAlertsManagement = <T extends Alertable>() => {
  const STATE: State<T> = {
    alerts: [],
  };

  const Context = createContext(STATE);

  class Provider extends React.Component<Props<T>, State<T>> {
    private _createId = (alerts: Alert<T>[]): number =>
      alerts.length ? alerts[alerts.length - 1].id + 1 : 1;

    private _createAlert = (alerts: Alert<T>[], alert: AlertToAdd<T>): Alert<T> => {
      const id = this._createId(alerts);

      return {
        ...(alert as T),
        id,
        message: alert.message,
        onClose: () => this.closeAlert(id),
      };
    };

    showAlert = (alert: AlertToAdd<T>): void => {
      this.setState(({ alerts }) => ({
        alerts: [...alerts, this._createAlert(alerts, alert)],
      }));
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

    render = (): JSX.Element => {
      const { presenter: Presenter } = this.props;

      return (
        <Context.Provider value={this.state}>
          <Presenter alerts={this.state.alerts} />
          {this.props.children}
        </Context.Provider>
      );
    };
  }

  const useAlertsProvider = (): State<T> => {
    const context = useContext(Context);

    return context;
  };

  return {
    AlertsContext: Context,
    AlertsProvider: Provider,
    useAlertsProvider,
  };
};
