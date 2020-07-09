import React from 'react';

import csx from './TemplateTags.scss';

namespace TemplateTags {
  export interface Props {
    tags: string[];
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }
}

const TemplateTags = ({ tags, onClick }: TemplateTags.Props) => {
  return (
    <div className={`${csx.templateTags} ${onClick ? csx.clickable : ''}`}>
      {tags.map((tag, idx) => (
        <div key={tag} data-idx={idx} onClick={onClick}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TemplateTags;
