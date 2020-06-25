import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { Guard } from 'core/auth';

import { Logo } from 'ui';

import { HomeLink } from '.';

import csx from './Topbar.scss';


const LINK_WIDTH = 90;
const LINK_MARGIN = 60;
const LINKS: HomeLink[] = [
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
              <NavLink to={value.linkTo} key={idx}>
                <span
                  className={idx === activeLink ? csx.active : null}
                  onClick={() => setActiveLink(idx)}
                >
                  {value.label}
                </span>
              </NavLink>
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
        <Guard.Unprotected>
          <>
            <NavLink to="/register">
              <span>Sing up</span>
            </NavLink>
            <NavLink to="/login">
              <span>Sign in</span>
            </NavLink>
          </>
        </Guard.Unprotected>
      </div>
    </nav>
  );
};
