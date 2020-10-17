import { useHistory } from 'react-router';
import React, { useCallback, useEffect } from 'react';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Form, useQueryParams, Url } from 'utils';

import csx from './Search.scss';

const CONFIG: Form.Config = [{ label: 'Query', value: '' }];

const QUERY = 0;

namespace Search {
  export interface Props {
    name: string;
  }
}

const Search = (props: Search.Props) => {
  const { location, push } = useHistory();

  const { name } = props;

  const [query] = useQueryParams('query');

  const [{ fields }, change, directChange, submit] = Form.useManager(CONFIG);

  const handleSubmit = useCallback(
    (e: Form.Events.Submit) => {
      const invalid = submit(e);

      if (invalid) {
        return;
      }

      const [{ value: query }] = fields;

      const search = Url(location).swap('query', query).search();

      push(`?${search}`);
    },
    [fields, location]
  );

  useEffect(() => {
    directChange([QUERY], [query]);
  }, [query]);

  return (
    <form className={csx.search} onSubmit={handleSubmit}>
      <input
        data-idx={QUERY}
        placeholder={`Find your ${name}...`}
        className={csx.input}
        value={fields[QUERY].value}
        onChange={change}
      />
      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};

export default Search;
