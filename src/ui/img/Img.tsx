import React from 'react';

import csx from './Img.scss';

namespace Img {
  export interface Props
    extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    size: string;
  }
}

const Img = ({ size, src, ...imgProps }: Img.Props) => {
  const [height, width] = size.split(':');

  return (
    <figure className={csx.img} style={{ height, width }}>
      {src && <img {...imgProps} src={src} />}
    </figure>
  );
};

export default Img;
