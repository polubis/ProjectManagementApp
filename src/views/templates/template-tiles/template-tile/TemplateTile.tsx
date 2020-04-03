import React from 'react';

import { Avatar } from '@material-ui/core';

import StarsIcon from '@material-ui/icons/StarOutlined';
import ViewsIcon from '@material-ui/icons/RemoveRedEye';

import csx from './TemplateTile.scss';

export const TemplateTile = () => {
  return (
    <div className={csx.templateTile}>
      <header className={csx.toolbar}>
        <div className={csx.views}>
          <ViewsIcon />
          <span>13k</span>
        </div>

        <div className={csx.stars}>
          <StarsIcon />
          <span>120</span>
        </div>
      </header>

      <div className={csx.technologies}>
        <figure>
          <img src={window.location.origin + '/public/images/ReactLogo.png'} />
        </figure>
        <figure>
          <img src={window.location.origin + '/public/images/AngularLogo.png'} />
        </figure>
      </div>

      <h5 className={csx.templateName}>React with Model View Provider architecture</h5>

      <span className={csx.templateDescription}>
        Template prepared for SSR apps. Contains all needed libs and allows to create fast
        application from scratch with MVP architect...
      </span>

      <div className={csx.authors}>
        <div className={csx.author}>
          <Avatar
            classes={{ root: csx.authorAvatar }}
            src={window.location.origin + '/public/images/AngularLogo.png'}
          />
          <span className={csx.authorName}>by przemo</span>
        </div>
      </div>
    </div>
  );
};
