import React from 'react';

import { Img, Tag } from 'ui';

import { Template } from 'core/api';

import { TemplateStats } from 'shared/components';

import csx from './TemplateTile.scss';

namespace TemplateTile {
  export interface Props {
    template: Template;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }
}

const TemplateTile = ({ template, onClick }: TemplateTile.Props) => {
  return (
    <div data-idx={template.id} className={csx.templateTile} onClick={onClick}>
      <TemplateStats
        patterns={template.patterns.length}
        stars={template.stars}
        technologies={template.technologies.length}
        watches={template.watches}
      />

      <h5 className={csx.name}>{template.name}</h5>

      <span className={csx.description}>{template.description}</span>

      <div className={csx.patterns}>
        {template.patterns.map((pattern) => (
          <Tag key={pattern.id} label={pattern.name} />
        ))}
      </div>

      <div className={csx.technologies}>
        {template.technologies.map(({ id, pictureUrl }) => (
          <Img alt="Technology image" key={id} size="32px:32px" src={pictureUrl} />
        ))}
      </div>
    </div>
  );
};

export default TemplateTile;
