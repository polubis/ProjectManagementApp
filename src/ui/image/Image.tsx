import React, { useState, useCallback, useEffect, useMemo } from "react"

import { Button } from "ui"

import Refresh from '@material-ui/icons/Refresh'

import csx from "./Image.scss"

namespace Image {
    export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
        fallback: string;
    }
}

const Image = ({ fallback, src, ...props }: Image.Props) => {
    const [url, setUrl] = useState(fallback)
    const [error, setError] = useState(false)

    useEffect(() => {
        loadImage();
    }, [])

    const loadImage = () => {
        if (!src) return;
        setError(false)
        fetch(src).then(r => r.blob()).then(b => {
            const fileReader = new FileReader();
            fileReader.onload = function () {
                setUrl(this.result + "");
            };
            fileReader.readAsDataURL(b);
        })
    }

    const handleError = useCallback(
        () => {
            setError(true);
            setUrl(fallback)
        }, [error]);

    return (
        <div className={`${csx.img}`}>
            <img src={url} onError={handleError} {...props} />
            {error && <Button onClick={loadImage} variant="icon" className={csx.mask}><Refresh /></Button>}
        </div>
    )
}

export default Image;