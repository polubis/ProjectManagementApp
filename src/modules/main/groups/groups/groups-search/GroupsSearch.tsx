import React, { useEffect, useState, FC } from 'react';
import Form from 'io-form';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useQueryParams } from 'utils';

import csx from './GroupsSearch.scss';

namespace GroupsSearch {
  export interface Props {
    onSubmit(query: string): void;
  }
}

const GroupsSearch: FC<GroupsSearch.Props> = ({ onSubmit }) => {
  const [query] = useQueryParams('query');

  const [{ values, next }, setForm] = useState(
    Form({
      query: '',
    })
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values.query);
  };

  useEffect(() => {
    setForm(next({ query }));
  }, [query]);

  return (
    <form className={csx.groupsSearch} onSubmit={handleSubmit}>
      <input
        placeholder="Type group name..."
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

export default GroupsSearch;
