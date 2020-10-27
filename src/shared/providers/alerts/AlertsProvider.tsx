import React, { createContext, ReactNode, useContext } from 'react';

import { Alert } from "ui"

namespace AlertsProvider {
    export interface State {
        text: string;
        display: boolean;
        alerts: { id: number, text: string, type: 'warning' | 'error' | 'success' | 'info' }[];
        addAlert?(text: string, type: 'warning' | 'error' | 'success' | 'info'): void;
    }

    export interface Props {
        children: ReactNode;
    }
}

const STATE: AlertsProvider.State = {
    text: "",
    display: false,
    alerts: []
};

const DURATION = 5000; //alert duration

const Context = createContext(STATE);

class Provider extends React.Component<AlertsProvider.Props, typeof STATE> {
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    addAlert = async (text: string, type: 'warning' | 'error' | 'success' | 'info') => {
        let id = 0;
        if (this.state.alerts.length > 0) id = this.state.alerts[this.state.alerts.length - 1].id + 1;
        this.setState({ alerts: [...this.state.alerts, { id: id, text: text, type: type }] });
        await this.sleep(DURATION);
        this.setState({ alerts: this.state.alerts.filter(e => e.id !== id) });

    }
    readonly state: typeof STATE = {
        ...STATE,
        addAlert: this.addAlert
    };

    render = () => <Context.Provider value={this.state}>
        {this.state.alerts.map(e => {
            return <Alert key={e.id} message={e.text} time={DURATION} type={e.type} />;
        })}
        {this.props.children}
    </Context.Provider>;
}

const AlertsProvider = Provider;

export const useAlertsProvider = () => {
    return useContext(Context);
};

export default AlertsProvider;
