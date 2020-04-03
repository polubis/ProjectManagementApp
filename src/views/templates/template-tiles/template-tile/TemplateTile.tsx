import React from 'react';

import { Avatar } from '@material-ui/core';

import StarsIcon from '@material-ui/icons/StarOutlined';
import ViewsIcon from '@material-ui/icons/RemoveRedEye';

import { Template } from 'api';

import csx from './TemplateTile.scss';

export interface TemplateTileProps {
  template: Template;
  onTemplateClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

export const TemplateTile = ({ template, onTemplateClick }: TemplateTileProps) => {
  return (
    <div data-id={template.id} className={csx.templateTile} onClick={onTemplateClick}>
      <header className={csx.toolbar}>
        <div className={csx.views}>
          <ViewsIcon />
          <span>{template.views}</span>
        </div>

        <div className={csx.stars}>
          <StarsIcon />
          <span>{template.stars}</span>
        </div>
      </header>

      <figure className={csx.mainTechnology}>
        <img src={template.mainTechnology.avatar} />
      </figure>

      <h5 className={csx.templateName}>{template.name}</h5>

      <span className={csx.templateDescription}>{template.description}</span>

      <div className={csx.authors}>
        <div className={csx.author}>
          <Avatar classes={{ root: csx.authorAvatar }} src={template.authors[0].avatar} />
          <span className={csx.authorName}>{template.authors[0].name}</span>
        </div>
      </div>
    </div>
  );
};
