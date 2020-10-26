import React, { createContext, ReactNode, useContext } from 'react';

import { Alert } from "ui"

namespace AlertsProvider {
    export interface State {
        text: string;
        display: boolean;
        addAlert?(text: string): void;
    }

    export interface Props {
        children: ReactNode;
    }
}

const STATE: AlertsProvider.State = {
    text: "",
    display: false
};

const Context = createContext(STATE);

class Provider extends React.Component<AlertsProvider.Props, typeof STATE> {
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    addAlert = async (text: string) => {
        if (text !== "") {
            this.setState({ display: false });
        }
        this.setState({ text: text });
        this.setState({ display: true })
        await this.sleep(300);
        this.setState({ display: false })
        this.setState({ text: "" })
    }
    readonly state: typeof STATE = {
        ...STATE,
        addAlert: this.addAlert
    };

    render = () => <Context.Provider value={this.state}>
        <Alert display={this.state.display} message={this.state.text} />
        {this.props.children}
    </Context.Provider>;
}

const AlertsProvider = Provider;

export const useAlertsProvider = () => {
    return useContext(Context);
};

export default AlertsProvider;
