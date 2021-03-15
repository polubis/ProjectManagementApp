import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';

import csx from './TemplateTileSmall.scss';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const TemplateTileSmallLoader: FC<Props> = ({ className, ...props }) => {
  return (
    <div {...props} className={`${csx.loader} ${className}`}>
      <header />

      <footer>
        <div />
        <div />
        <div />
        <div />
      </footer>
    </div>
  );
};

TemplateTileSmallLoader.defaultProps = {
  className: '',
};

export default TemplateTileSmallLoader;
