import React from 'react';

import { TemplateCategory } from 'core/api';

import { TemplatesSearch } from 'shared/components';

import csx from './Search.scss';

import { Image } from "ui";

const Search = () => {
  return (
    <div>
      <Image src="https://images.unsplash.com/photo-1427847888090-7b66d035cdaa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1800&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=3200"
        lowQuality="https://images.unsplash.com/photo-1427847888090-7b66d035cdaa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=9&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=16"
        height={500}
        width={500} />
      <Image src="https://images.unsplash.com/photo-1427847888090-7b66d035cdaa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1800&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=3200"
        lowQuality="https://images.unsplash.com/photo-1427847888090-7b66d035cdaa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=9&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=16"
        height={500}
        width={500} />
      <section className={csx.search}>


        <h1>
          <span>Simplified</span> and faster project development process
      </h1>

        <p>
          Use <span>Jupi.io</span> to boost your development process with high quality templates
        prepared by developers community from around the world
      </p>

        <TemplatesSearch
          className={csx.templatesSearch}
          pathname={`/app/templates/${TemplateCategory.ALL}`}
        />
      </section></div>
  );
};

export default Search;
