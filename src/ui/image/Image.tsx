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

const Image = ({ lowQuality, fallback, src, className, width, height, ...props }: Image.Props) => {
    const [url, setUrl] = useState(lowQuality || src)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (url === lowQuality) loadImage();
    }, [])

    const loadImage = () => {
        setError(false)
        fetch(src).then(r => r.blob()).then(b => {
            const fileReader = new FileReader();
            fileReader.onload = function () {
                setUrl(this.result + "");
            };
            fileReader.readAsDataURL(b);
        })
    }

    const onErrorHandler = () => {
        setError(true);
        if (fallback) setUrl(fallback)
    }

    return (
        <div className={`${csx.img} ${className}`}
            style={{ height: height, width: width }}>
            {((url === lowQuality) && !error) && <Loader className={`${csx.mask}`} />}
            {error && <Button className={`${csx.button} ${csx.mask}`} onClick={() => loadImage()}>Retry</Button>}
            <img
                alt={props.alt || "image"}
                {...{ src: url, ...props }}
                height={height}
                width={width}
                onError={onErrorHandler}
            />
        </div>
    )
}

export default Image;