import React from 'react';

import { TemplateCategory } from 'core/api';

import { TemplatesSearch } from 'shared/components';

import csx from './Search.scss';

const Search = () => (
  <section className={csx.search}>
    <h1>
      <span>Simplified</span>
      {' '}
      and faster project development process
    </h1>

    <p>
      Use
      {' '}
      <span>Jupi.io</span>
      {' '}
      to boost your development process with high quality templates
      prepared by developers community from around the world
    </p>

    <TemplatesSearch
      className={csx.templatesSearch}
      pathname={`/app/templates/${TemplateCategory.ALL}`}
    />
  </section>
);

export default Search;
