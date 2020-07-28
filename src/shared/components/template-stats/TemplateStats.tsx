import React from 'react';

import StarsIcon from '@material-ui/icons/StarBorder';
import ViewsIcon from '@material-ui/icons/RemoveRedEye';

import csx from './TemplateStats.scss';

namespace TemplateStats {
  export interface Props {
    stars: number;
    watches: number;
    className?: string;
  }
}

const TemplateStats = ({ watches, stars, className = '' }: TemplateStats.Props) => {
  return (
    <div className={`${csx.templateStats} ${className}`}>
      <div className={csx.views}>
        <ViewsIcon />
        <span>{watches}</span>
      </div>

      <div className={csx.stars}>
        <StarsIcon />
        <span>{stars}</span>
      </div>
    </div>
  );
};

export default TemplateStats;
