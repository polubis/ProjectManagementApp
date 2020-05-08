import React from 'react';

import { Button } from 'shared/ui';

import csx from './HomeDescription.scss';

export const HomeDescription = () => {
  return(
    <div className={csx.homeDescription}>
      <div className={csx.textSection}>
        <p className={csx.header}>The whole <span>ecosystem</span> in one.</p>
        <p className={csx.desc}>Choose a template, find people in the team, create a project and enjoy the whole ecosystem in one place.</p>
        <Button>
          START JOURNEY
        </Button>
      </div>
      <div className={csx.imageSection}>
siema jak wyjąc obrazek
      </div>
    </div>
  )
}
