import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Form from 'io-form';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useQueryParams, Url } from 'utils';

import csx from './DictionariesSearch.scss';

namespace DictionariesSearch {
  export interface Props {
    label: string;
  }
}

const DictionariesSearch = ({ label }: DictionariesSearch.Props) => {
  const { location, push } = useHistory();

  const [query] = useQueryParams('query');

  const [{ values, next }, setForm] = useState(
    Form({
      query: '',
    }),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`?${Url(location).swap('query', values.query).search()}`);
  };

  useEffect(() => {
    setForm(next({ query }));
  }, [query]);

  return (
    <form className={csx.dictionariesSearch} onSubmit={handleSubmit}>
      <input
        placeholder={`Find your ${label}...`}
        value={values.query}
        onChange={(e) => {
          setForm(next({ query: e.target.value }));
        }}
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
};

export default DictionariesSearch;
