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
          <Img
            alt="Technology image"
            key={id}
            size="32px:32px"
            src={pictureUrl}
          />
        ))}
      </div>
    </div>
  );
};

TemplateTile.Loader = () => {
  return (
    <div className={csx.templateTileLoader}>
      <div className={csx.stats}>
        <div className={csx.stat} />
        <div className={csx.stat} />
        <div className={csx.stat} />
        <div className={csx.stat} />
      </div>

      <div className={csx.name} />

      <div className={csx.description} />

      <div className={csx.patterns}>
        <div className={csx.pattern} />
        <div className={csx.pattern} />
        <div className={csx.pattern} />
        <div className={csx.pattern} />
      </div>

      <div className={csx.technologies}>
        <div className={csx.technology} />
        <div className={csx.technology} />
        <div className={csx.technology} />
        <div className={csx.technology} />
      </div>
    </div>
  );
};

export default TemplateTile;
