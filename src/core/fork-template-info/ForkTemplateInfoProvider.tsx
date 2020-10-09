import React, { useState, createContext, useEffect } from 'react'

import csx from './ForkTemplateInfoProvider.scss'

export const ForkTemplateInfoContext = createContext({ incrementForks: () => { }, decrementForks: () => { } });

const ForkTemplateInfoProvider = (props) => {

    const [openModal, setOpenModal] = useState(false);
    const [numberOfForks, setNumberOfForks] = useState(0);

    useEffect(() => {
        if (numberOfForks > 0) setOpenModal(true);
        else setOpenModal(false);
        if (numberOfForks < 0) setNumberOfForks(0);
    }, [numberOfForks])

    const incrementForks = () => setNumberOfForks(numberOfForks + 1);
    const decrementForks = () => setNumberOfForks(numberOfForks - 1);

    const obj = { incrementForks: incrementForks, decrementForks: decrementForks }

    return (
        <ForkTemplateInfoContext.Provider value={obj}>
            {openModal &&
                <div className={`${csx.message} ${csx.loading}`}>
                    {numberOfForks} template{numberOfForks > 1 && "s"} is forking
                </div>}
            {props.children}
        </ForkTemplateInfoContext.Provider>
    )

}

export default ForkTemplateInfoProvider;