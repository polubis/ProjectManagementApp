import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Select } from 'ui';

import { Form, useQueryParams } from 'utils';

import { useTechnologiesProvider } from 'core/technologies';

import { TemplatesSearchFilters } from '..';

import csx from './TemplatesSearch.scss';

namespace TemplatesSearch {
  export interface Props {
    path?: string;
  }
}

const [QUERY, TECHNOLOGIES] = [0, 1];

const parseTechnologies = (technologiesIds: string) =>
  technologiesIds
    ? (JSON.parse(technologiesIds) as string[]).reduce((prev, id) => ({ ...prev, [id]: true }), {})
    : {};

const CONFIG: Form.Config = [
  { label: 'Query', value: '' },
  {
    label: 'Technologies',
    value: {}
  }
];

const TemplatesSearch = ({ path = '/app/templates/all' }) => {
  const history = useHistory();

  const [query, technologiesIds] = useQueryParams('query', 'technologiesIds');

  const { technologies } = useTechnologiesProvider();

  const [{ fields }, change, directChange, submit] = Form.useManager(CONFIG);

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

      const [{ value: query }, { value: technologiesIds }] = fields;

      const url = new URLSearchParams({
        query,
        technologiesIds: JSON.stringify(Select.getChecked(technologiesIds)),
        patternsIds: JSON.stringify([])
      } as Partial<TemplatesSearchFilters>).toString();

      history.push(`${path}?${url}`);
    },
    [fields, path]
  );

  useEffect(() => {
    directChange([QUERY, TECHNOLOGIES], [query, parseTechnologies(technologiesIds)]);
  }, [query, technologiesIds]);

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
