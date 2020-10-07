import React, { useState, useEffect, useRef } from "react"

import { Loader, Button } from "ui"

import csx from "./Image.scss"

namespace Image {
    export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
        className?: string;
        lowQuality: string;
        fallback?: string;
    }
}

const Image = ({ lowQuality, fallback, src, className, ...props }: Image.Props) => {
    const [url, setUrl] = useState(lowQuality || src)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (url === lowQuality) loadImage();
    }, [])

    const loadImage = () => {
        setError(false)
        fetch(src).then(e => e.blob()).then(b => {
            const FR = new FileReader();
            FR.onload = function () {
                setUrl(this.result + "");
            };
            FR.readAsDataURL(b);
        })
    }

    const onErrorHandler = () => {
        setError(true);
        if (fallback) setUrl(fallback)
    }

    return (
        <div className={`${csx.img} ${className}`}
            style={{ height: props.height, width: props.width }}>
            {((url === lowQuality) && (error === false))
                ? <Loader className={`${csx.mask}`} />
                : ""}
            {error === true
                ? <Button className={`${csx.button} ${csx.mask}`} onClick={() => loadImage()}>Retry</Button>
                : ""}
            <img
                alt={props.alt || "image"}
                {...{ src: url, ...props }}
                height={props.height}
                width={props.width}
                onError={onErrorHandler}
            />
        </div>
    )
}

export default Image;