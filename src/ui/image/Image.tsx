import React, { useState, useEffect } from "react"

namespace Image {
    export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
        className?: string;
        lowQuality: any;
    }
}

const Image = ({ lowQuality, src, className, ...props }: Image.Props) => {
    const [url, setUrl] = useState(lowQuality || src)
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
        <img
            className={className}
            alt={props.alt || "image"} {...{ src: url, ...props }}
            height={500}
            width={500} />
    )
}

export default Image;