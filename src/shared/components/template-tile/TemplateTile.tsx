import React from 'react';

import { Avatar } from '@material-ui/core';

import { Img } from 'ui';

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
      <TemplateStats stars={template.stars} watches={template.watches} />

      {/* TODO: REMOVE ?. AFTER BACKEND DATABASE CLEANUP */}
      <Img
        alt="First technology image"
        size="112px:112px"
        src={template.technologies[0]?.pictureUrl}
      />

      <h5>{template.name}</h5>

      <span className={csx.description}>{template.description}</span>

      {!!template.contributors.length && (
        <footer>
          <Avatar src={template.contributors[0].avatar} />

          <span>by {template.contributors[0].name}</span>
        </footer>
      )}
    </div>
  );
};

export default TemplateTile;
