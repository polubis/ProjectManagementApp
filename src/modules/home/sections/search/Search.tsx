import React from 'react';

import TemplatesSearch from 'src/modules/templates/template-search';

import csx from './Search.scss';

const Search = () => {
  return (
    <section className={csx.search}>
      <h1>
        <span>Simplified</span> and faster project development process
      </h1>

      <p>
        Use <span>Jupi.io</span> to boost your development process with high quality templates
        prepared by developers community from around the world
      </p>

      <TemplatesSearch />
    </section>
  );
};

export default Search;
