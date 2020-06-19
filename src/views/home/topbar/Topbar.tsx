import React, { useState } from 'react';

import { Logo } from 'ui';

import { HomeViewLink } from '.';

import csx from './Topbar.scss';

const LINK_WIDTH = 90;
const LINK_MARGIN = 60;
const LINKS: HomeViewLink[] = [
  {
    label: 'Home',
    linkTo: ''
  },
  {
    label: 'About',
    linkTo: ''
  },
  {
    label: 'Go to app',
    linkTo: '/app'
  }
];


export const Topbar = () => {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <nav className={csx.nav}>
      <div className={csx.main}>
        <section className={csx.logo}>
          <figure>
            <Logo />
          </figure>
          <span>Jupi.io</span>
        </section>

        <section className={csx.links}>
          {LINKS.map((value, idx) => {
            return (
              <span
                key={idx}
                className={idx === activeLink ? csx.active : null}
                onClick={() => setActiveLink(idx)}
              >
                {value.label}
              </span>
            );
          })}
          <div
            className={csx.marker}
            style={{
              transform: `translateX(${LINK_WIDTH * activeLink + LINK_MARGIN * (activeLink + 1)}px)`
            }}
          />
        </section>
      </div>

      <div className={csx.actions}>
        <span>Sing up</span>
        <span>Sign in</span>
      </div>
    </nav>
  );
};
