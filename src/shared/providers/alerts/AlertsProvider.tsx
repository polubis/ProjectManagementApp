import React, { createContext, ReactNode, useContext } from 'react';

import { Alert } from "ui"

namespace AlertsProvider {
    export type Type = 'warning' | 'error' | 'success' | 'info';

    export interface State {
        text: string;
        display: boolean;
        alert: { text: string, type: Type, display: boolean };
        alerts: { text: string, type: Type, display: boolean }[];
        addAlert?(text: string, type: Type): void;
    }

    export interface Props {
        children: ReactNode;
    }
}

const STATE: AlertsProvider.State = {
    text: "",
    display: false,
    alert: { text: "", type: "warning", display: false },
    alerts: []
};

const DURATION = 5000; //alert duration
const ANIMATION_TIME = 300; //time of alert transition animation

const Context = createContext(STATE);

class Provider extends React.Component<AlertsProvider.Props, typeof STATE> {
    componentDidMount() {
        setInterval(async () => {
            if (this.state.alert.text === "") {
                const obj = this.state.alerts[0];
                this.setState({
                    alert: {
                        text: obj.text,
                        type: obj.type,
                        display: false
                    }
                });
                this.switchAlertDisplay();
                await this.sleep(DURATION);
                this.switchAlertDisplay();
                await this.sleep(ANIMATION_TIME);
                this.setState({ alerts: this.state.alerts.slice(1) });
                this.setState({ alert: { text: "", type: "warning", display: false } })
            }
        }, ANIMATION_TIME)
    }

    switchAlertDisplay = async () => {
        await this.sleep(0);
        const obj = this.state.alert;
        this.setState({
            alert: {
                text: obj.text,
                type: obj.type,
                display: !obj.display
            }
        });
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    addAlert = (text: string, type: AlertsProvider.Type) => {
        const obj = { text: text, type: type, display: false };
        this.setState({ alerts: [...this.state.alerts, obj] });
    }

    readonly state: typeof STATE = {
        ...STATE,
        addAlert: this.addAlert
    };

    render = () => <Context.Provider value={this.state}>
        {this.state.alert.text !== "" && <Alert
            message={this.state.alert.text}
            type={this.state.alert.type}
            display={this.state.alert.display} />}
        {this.props.children}
    </Context.Provider>;
}

const AlertsProvider = Provider;
export const useAlertsProvider = () => useContext(Context);
export default AlertsProvider;
