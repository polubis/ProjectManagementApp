import React from 'react';

import StarsIcon from '@material-ui/icons/StarBorder';
import CodeIcon from '@material-ui/icons/Code';
import ViewsIcon from '@material-ui/icons/RemoveRedEye';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import csx from './TemplateStats.scss';

namespace TemplateStats {
  export interface Props {
    className?: string;
    patterns: number;
    stars: number;
    technologies: number;
    watches: number;
  }
}

const TemplateStats = ({
  className = '',
  patterns,
  stars,
  technologies,
  watches,
}: TemplateStats.Props) => {
  return (
    <div className={`${csx.templateStats} ${className}`}>
      <div className={csx.views} title="Github views">
        <ViewsIcon />
        <span>{watches}</span>
      </div>

      <div className={csx.stars} title="Github stars">
        <StarsIcon />
        <span>{stars}</span>
      </div>

      <div className={csx.technologies} title="Technologies">
        <CodeIcon />
        <span>{technologies}</span>
      </div>

      <div className={csx.patterns} title="Patterns">
        <PlaylistAddIcon />
        <span>{patterns}</span>
      </div>
    </div>
  );
};

export default TemplateStats;
