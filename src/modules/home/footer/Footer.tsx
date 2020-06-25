import React from 'react';

import SendIcon from '@material-ui/icons/Send';

import { Logo, Button } from 'ui';

import csx from './Footer.scss';

export const Footer = () => {
  return (
    <footer className={csx.footer}>
      <section className={`${csx.basicSection} ${csx.jupiIo}`}>
        <span>
          <figure>
            <Logo />
            Jupi.io
          </figure>
        </span>
        <p>Do you lack any functionality? Let us know what you need and we will implement it :</p>
        <Button>LET US KNOW</Button>
        <ul className={csx.list}>
          <li>Home</li>
          <li>About</li>
          <li>Go to App</li>
        </ul>
      </section>
      <section className={`${csx.basicSection} ${csx.newsletter}`}>
        <span>Subscribe for newsletter</span>
        <p>
          Do you want to find out what's new? Give us your email address and subscribe to the
          newsletter
        </p>
        <div>
          <input placeholder="Type your email address..." className={csx.input} />
          <Button>
            <SendIcon />
          </Button>
        </div>
        <ul className={csx.list}>
          <li>Sign Up</li>
          <li>Sign In</li>
        </ul>
      </section>

      <section className={`${csx.basicSection} ${csx.authors}`}>
        <span>History & Authors</span>
        <p>
          The idea for application was born during the frustration that caught young developers
          while working on many new projects. "Bad" choice of technology or the use of bad practices
          causes pain with delay. The solution is <span>Jupi.io</span>
        </p>
      </section>
    </footer>
  );
};
