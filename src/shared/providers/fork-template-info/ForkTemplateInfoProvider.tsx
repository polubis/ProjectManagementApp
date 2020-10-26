import React, { createContext, useContext } from 'react'

import csx from './ForkTemplateInfoProvider.scss'

export const ForkTemplateInfoContext = createContext(
    {
        incrementForks: () => { },
        decrementForks: () => { },
        completeFork: (name, status) => { }
    });

interface TemplateStatus {
    name: string,
    status: boolean
}

class ForkTemplateInfoProvider extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        numberOfForks: 0,
        templateInfo: []
    }

    incrementForks = () => { this.setState({ numberOfForks: this.state.numberOfForks + 1 }); }
    decrementForks = () => { this.setState({ numberOfForks: this.state.numberOfForks - 1 }); }

    sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

    completeFork = async (name, status) => {
        this.setState({ templateInfo: [...this.state.templateInfo, { name: name, status: status }] })
        await this.sleep(1500);
        this.setState({ templateInfo: this.state.templateInfo.filter(t => t.name !== name) });
    }

    data = {
        incrementForks: this.incrementForks,
        decrementForks: this.decrementForks,
        completeFork: this.completeFork
    }

    render() {
        return <ForkTemplateInfoContext.Provider value={this.data}>
            {(this.state.numberOfForks > 0 || this.state.templateInfo.length > 0) &&
                <div className={csx.message}>
                    {this.state.templateInfo.length > 0 &&
                        <span>{this.state.templateInfo.map(t => {
                            return <div>
                                {t.name.substr(0, 5)}... {t.status ? "forked" : "didn't forked"}
                            </div>
                        })}
                        </span>
                    }
                    {this.state.numberOfForks > 0 && <span className={csx.loading}>{this.state.numberOfForks} template{this.state.numberOfForks > 1 && "s"} is forking</span>}
                </div>}
            {this.props.children}
        </ForkTemplateInfoContext.Provider>

    }

}

export const useForkTemplateInfoProvider = () => {
    const context = useContext(ForkTemplateInfoContext);

    return context;
};

export default ForkTemplateInfoProvider;