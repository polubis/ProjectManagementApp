import React from 'react';

import { Img } from 'ui';

import csx from "./BarChartItem.scss"

namespace BarChartItem {
    export interface Props {
        label: string,
        value: {
            global: number,
            actual: number
        },
        onClick?: () => void
    }
}

const BarChartItem = ({ label, value, onClick }: BarChartItem.Props) => {
    const procent = Math.round(value.actual / value.global * 100);

    return (
        <div className={`${csx.barchartitem} ${onClick && csx.click}`} onClick={onClick}>
            <div className={csx.barwrapper}>
                <div className={csx.label}>{`${procent}%`}</div>
                <div className={`${csx.bar} ${csx.barglobal}`} style={{ height: `${value.global}px` }} >
                    <div className={csx.bar} style={{ height: `${value.actual}px` }} />
                </div>
                <div className={csx.logo}>
                    <Img alt="Label image" size="32px:32px" src={label} />
                </div>
            </div>
        </div>
    )
}

export default BarChartItem;