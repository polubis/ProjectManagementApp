import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Select } from 'ui';

import { Form, useQueryParams } from 'utils';

import { useTechnologiesProvider } from 'core/technologies';

import csx from './TemplatesSearch.scss';

const [QUERY, TECHNOLOGIES] = [0, 1];

const TemplatesSearch = () => {
  const history = useHistory();

  const [query] = useQueryParams('query');

  const { technologies } = useTechnologiesProvider();

  const [{ fields }, change, directChange, submit] = Form.useManager([
    { label: 'Query', value: query },
    { label: 'Technologies', value: {} }
  ]);

  const handleTechnologySelect = useCallback(
    (e: Select.Events.Select, value: boolean) => {
      directChange([TECHNOLOGIES], [Select.select(e, value, fields[TECHNOLOGIES].value)]);
    },
    [fields]
  );

  const handleSubmit = useCallback(
    (e: Form.Events.Submit) => {
      const isInvalid = submit(e);

      if (isInvalid) {
        return;
      }

      const [{ value: query }] = fields;

      history.push(`/app/templates/all?query=${query}`);
    },
    [fields]
  );

  useEffect(() => {
    directChange([QUERY], [query]);
  }, [query]);

  const mappedTechnologies = useMemo(() => Select.makeItems(technologies, 'id', 'name'), [
    technologies
  ]);

  return (
    <form className={csx.templatesSearch} onSubmit={handleSubmit}>
      <input
        data-idx={QUERY}
        placeholder="Find your template..."
        className={csx.input}
        value={fields[QUERY].value}
        onChange={change}
      />

      <Select
        label="Technologies *"
        placeholder="All technologies"
        className={csx.select}
        openClass={csx.selectMenuOpen}
        items={mappedTechnologies}
        value={fields[TECHNOLOGIES].value}
        onSelect={handleTechnologySelect}
      />

      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};

export default TemplatesSearch;
