import React, { useState, useEffect, useRef } from "react"

import { Loader } from "ui"

import csx from "./Image.scss"

namespace Image {
    export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
        className?: string;
        lowQuality: any;
    }
}

const Image = ({ lowQuality, src, className, ...props }: Image.Props) => {

    const [url, setUrl] = useState<any>(lowQuality || src)

    useEffect(() => {
        if (url === lowQuality) {
            fetch(src).then(e => e.blob()).then(b => {
                const FR = new FileReader();
                FR.onload = function () {
                    setUrl(this.result)
                };
                FR.readAsDataURL(b);
            })
        }
    }, [])

    return (
        <div className={`${csx.img}`}
            style={{ height: props.height, width: props.width }}>
            {url === lowQuality && <Loader className={csx.loader} />}
            <img
                className={`${className}`}
                alt={props.alt || "image"}
                {...{ src: url, ...props }}
                height={props.height}
                width={props.width} />
        </div>
    )
}

export default Image;