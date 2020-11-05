import React, { ReactNode, useEffect, useState, Children } from 'react';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import csx from "./BarChart.scss"

interface IBarChart {
    children: ReactNode[] | ReactNode;
    title: string
}

const BARS_LIMIT = 10;

const BarChart = ({ children, title }: IBarChart) => {
    const [width, setWidth] = useState<number>(0);
    const [bars, setBars] = useState<typeof children | typeof children[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const numberOfChildren = Children.count(children);
    const numberOfPages = Math.ceil(numberOfChildren / BARS_LIMIT)

    useEffect(() => {
        if (numberOfChildren === 1) {
            setBars(children);
            setWidth(300);
            return;
        }
        const arr = [];
        let i = 0;
        let con = numberOfChildren;

        if (numberOfChildren > BARS_LIMIT) {
            setWidth(BARS_LIMIT * 64 + 140);
            i = (BARS_LIMIT * currentPage) - BARS_LIMIT;
            con = BARS_LIMIT * currentPage;
        } else {
            setWidth(numberOfChildren * 64 + 140);
        }

        for (i; i < con; i++) {
            if (children[i]) {
                arr.push(children[i]);
            }
        }

        setBars(arr);
    }, [currentPage])

    const nextPage = () => {
        if (currentPage + 1 > numberOfPages) {
            setCurrentPage(1);
        } else {
            setCurrentPage(state => state + 1);
        }
    }

    const prevPage = () => {
        if (currentPage - 1 === 0) {
            setCurrentPage(numberOfPages);
        } else {
            setCurrentPage(state => state - 1);
        }
    }

    return (
        <div className={csx.barchart} style={{ width: `${width}px` }}>
            <div className={csx.header}>
                <div className={`${csx.arrow} ${csx.arrowleft}`} onClick={prevPage}>
                    <ArrowForwardIosIcon />
                </div>
                <p>{title}</p>
                <div className={csx.arrow} onClick={nextPage}>
                    <ArrowForwardIosIcon />
                </div>
            </div>
            <div className={csx.wrapper}>
                {bars}
            </div>
        </div>
    )
}

export default BarChart;