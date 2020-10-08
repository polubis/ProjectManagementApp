import React from 'react';
import { Link } from 'react-router-dom';

import { Guard } from 'core/auth';

import { Logo } from 'ui';

import csx from './Footer.scss';

const Footer = () => {
  return (
    <footer className={csx.footer}>
      <div className={csx.wrapper}>
        <div className={csx.feedback}>
          <figure>
            <Logo />
            <span>Jupi.io</span>
          </figure>

          <span className={csx.description}>
            Do you lack any functionality? let me know what you need and we will implement it :)
          </span>

          <div className={csx.links}>
            <Link to="/">Home</Link>

            <Link to="/about">About</Link>

            <Link to="/app">App</Link>
          </div>
        </div>

        <div className={csx.newsletter}>
          <h5>Subscribe for newsletter</h5>

          <span className={csx.description}>
            Do you want to find out what's new? Give us your email address and subscribe to the
            newsletter
          </span>

          <Guard.Unprotected>
            <div className={csx.links}>
              <Link to="/register">Register</Link>

              <Link to="/login">Login</Link>
            </div>
          </Guard.Unprotected>
        </div>

        <div className={csx.history}>
          <h5>History & Authors</h5>

          <span className={csx.description}>
            The idea for application was born during the frustration that caught young developers
            while working on many new projects. "Bad" choice of technology or the use of bad
            practices causes pain with delay. The solution is Jupi.io
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
