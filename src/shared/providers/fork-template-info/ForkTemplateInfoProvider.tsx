import React, { useState, createContext } from 'react'

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

const ForkTemplateInfoProvider = (props) => {

    const [numberOfForks, setNumberOfForks] = useState(0);
    const [templateInfo, setTemplateInfo] = useState<TemplateStatus[]>([]);

    const incrementForks = () => setNumberOfForks(numberOfForks + 1);
    const decrementForks = () => setNumberOfForks(numberOfForks - 1);

    const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

    const completeFork = async (name, status) => {
        setTemplateInfo([...templateInfo, { name: name, status: status }]);
        await sleep(1500);
        setTemplateInfo(templateInfo.filter(t => t.name !== name));
    }

    const data = {
        incrementForks: incrementForks,
        decrementForks: decrementForks,
        completeFork: completeFork
    }

    return (
        <ForkTemplateInfoContext.Provider value={data}>
            {(numberOfForks > 0 || templateInfo.length > 0) &&
                <div className={csx.message}>
                    {templateInfo.length > 0 &&
                        <span>{templateInfo.map(t => {
                            return <div>
                                {t.name.substr(0, 5)}... {t.status ? "forked" : "didn't forked"}
                            </div>
                        })}
                        </span>
                    }
                    {numberOfForks > 0 && <span className={csx.loading}>{numberOfForks} template{numberOfForks > 1 && "s"} is forking</span>}
                </div>}
            {props.children}
        </ForkTemplateInfoContext.Provider>
    )

}

export default ForkTemplateInfoProvider;