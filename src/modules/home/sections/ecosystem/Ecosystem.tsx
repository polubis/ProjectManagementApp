import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'ui';

import { EcosystemImage } from '.';

import csx from './Ecosystem.scss';

const Ecosystem = () => {
  return (
    <section className={csx.ecosystem}>
      <div className={csx.wrapper}>
        <div className={csx.text}>
          <h1>
            The whole <span>ecosystem</span> in one place
          </h1>

          <span>
            Choose a template, find people in the team, create a project and enjoy the whole
            ecosystem in one place
          </span>

          <Link to="/app/templates/">
            <Button>START JOURNEY</Button>
          </Link>
        </div>

        <EcosystemImage />
      </div>
    </section>
  );
};

export default Ecosystem;
