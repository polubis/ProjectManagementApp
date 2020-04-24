import React, { useState } from 'react';

import { Logo } from 'shared/ui';

import csx from './MainPageTopBar.scss';

const LINK_WIDTH = 90;
const LINK_MARGIN = 60;
const LINKS = ['Home', 'About', 'Go to app'];

export const MainPageTopBar = () => {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div>
      <nav className={csx.nav}>
        <div className={csx.main}>

          <section className={csx.logo}>
            <figure>
            <Logo />
            </figure>
            <span>Jupi.io</span>
          </section>

          <section className={csx.links}>
            {LINKS.map((value, idx) => <span key={idx} className={idx === activeLink ? csx.active : null} onClick={() => setActiveLink(idx)}>{value}</span>)}
            <div className={csx.marker} style={{ transform: `translateX(${LINK_WIDTH * activeLink + LINK_MARGIN * (activeLink + 1)}px)`}}/>
          </section>
        </div>
          

        <div className={csx.actions}>
          <span>Sing up</span>
          <span>Sign in</span>
        </div>
      </nav>
    </div>
  );
}
