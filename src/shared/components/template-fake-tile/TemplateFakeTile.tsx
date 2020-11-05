import React from 'react'

import csx from "./TemplateFakeTile.scss"

const TemplateFakeTile = () => {

    return (
        <div className={csx.tile}>
            <div className={csx.header}>
                <div className={csx.tiny} />
                <div className={csx.tiny} />
                <div className={csx.tiny} />
                <div className={csx.tiny} />
            </div>
            <div className={csx.medium} />
            <div className={csx.large} />
            <div className={csx.footer}>
                <div className={csx.tiny} />
            </div>
            <div className={csx.logo} />
            <div className={csx.logo} />
            <div className={csx.logo} />
        </div>
    )
}

export default TemplateFakeTile