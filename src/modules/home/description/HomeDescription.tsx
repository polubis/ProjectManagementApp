import React from 'react';

import { NavLink } from 'react-router-dom';

import { Guard } from 'core/auth';

import { Button } from 'ui';

import { EcoSystemImg } from './EcoSystemImg';

import csx from './HomeDescription.scss';

export const HomeDescription = () => {
  return(
    <section className={csx.homeDescription}>
      <div className={csx.textSection}>
        <p className={csx.header}>The whole <span>ecosystem</span> in one.</p>
        <p className={csx.desc}>Choose a template, find people in the team, create a project and enjoy the whole ecosystem in one place.</p>
        <Guard.Unprotected>
        <NavLink to="/register">
        <Button>
          START JOURNEY
        </Button>
        </NavLink>
        </Guard.Unprotected>
      </div>
      <div className={csx.imageSection}>
        <EcoSystemImg />
      </div>
    </section>
  )
}
