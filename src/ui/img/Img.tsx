import React from 'react';

import csx from './Img.scss';

namespace Img {
  export interface Props
    extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    children?: React.ReactNode;
    size: string;
  }
}

const Img = ({ className, size, src, children, ...imgProps }: Img.Props): JSX.Element => {
  const [height, width] = size.split(':');

  return (
    <figure className={`${csx.img} ${className}`} style={{ height, width }}>
      {src ? <img {...imgProps} src={src} /> : children}
    </figure>
  );
};

export default Img;
