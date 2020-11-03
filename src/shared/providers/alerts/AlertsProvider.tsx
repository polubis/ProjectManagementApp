import React, { createContext, ReactNode, useContext } from 'react';

import { Alert } from "ui"

namespace AlertsProvider {
    type Alert = { id: number, text: string, type: Type, display: boolean };

    export type Type = 'warning' | 'error' | 'success' | 'info';

    export interface State {
        alert: Alert | null;
        alerts: Alert[];
        addAlert?(text: string, type: Type): void;
    }

    export interface Props {
        children: ReactNode;
    }
}

const STATE: AlertsProvider.State = {
    alert: null,
    alerts: []
};

const DURATION = 5000; //alert duration
const ANIMATION_TIME = 300; //time of alert transition animation

const Context = createContext(STATE);

class Provider extends React.Component<AlertsProvider.Props, typeof STATE> {
    globalId = 0;
    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    callAlert = (text: string, type: AlertsProvider.Type) => {
        this.addAlert(text, type).then(
            (id: number) => { this.toggleAlert(id) },
            (reason) => console.log(reason))
    }

    addAlert = (text: string, type: AlertsProvider.Type) => {
        const obj = { id: ++this.globalId, text: text, type: type, display: false };
        this.setState({ alerts: [obj, ...this.state.alerts] });
        return new Promise((res, rej) => { res(obj.id); rej(0); });
    }

    toggleAlert = async (id: number) => {
        const alerts = this.state.alerts;
        if (alerts[alerts.length - 1].id !== id) {
            await this.sleep(1000);
            this.toggleAlert(id);
            return;
        }
        this.setState({ alert: alerts[alerts.length - 1] });
        this.switchAlertDisplay();
        await this.sleep(DURATION);
        this.switchAlertDisplay();
        await this.sleep(ANIMATION_TIME);
        this.setState({ alerts: this.state.alerts.filter(e => e.id !== id) });
        this.setState({ alert: null });
    }

    switchAlertDisplay = async () => {
        await this.sleep(0);
        let obj = this.state.alert;
        obj.display = !obj.display;
        this.setState({ alert: obj });
    }

    readonly state: typeof STATE = {
        ...STATE,
        addAlert: this.callAlert
    };

    render = () => <Context.Provider value={this.state}>
        {this.state.alert !== null && <Alert
            message={this.state.alert.text}
            type={this.state.alert.type}
            display={this.state.alert.display} />}
        {this.props.children}
    </Context.Provider>;
}

const AlertsProvider = Provider;
export const useAlerts = () => {
    const context = useContext(Context);
    return context;
}
export default AlertsProvider;
