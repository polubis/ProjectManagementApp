import React from 'react';

import { Avatar } from '@material-ui/core';

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

      <figure>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png"
          alt="Template image"
        />
      </figure>

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
