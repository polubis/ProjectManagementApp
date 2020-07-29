import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Select } from 'ui';

import { Form, useQueryParams, Url, isJSONString } from 'utils';

import { TemplateCategory } from 'core/api';
import { useTechnologiesProvider } from 'core/technologies';

import csx from './TemplatesSearch.scss';

namespace TemplatesSearch {
  export interface Props {
    pathname?: string;
  }
}

const [QUERY, TECHNOLOGIES] = [0, 1];

const parseTechnologies = (technologiesIds: string) =>
  isJSONString(technologiesIds)
    ? (JSON.parse(technologiesIds) as string[]).reduce((prev, id) => ({ ...prev, [id]: true }), {})
    : {};

const CONFIG: Form.Config = [
  { label: 'Query', value: '' },
  {
    label: 'Technologies',
    value: {}
  }
];

const TemplatesSearch = ({ pathname = `/app/templates/${TemplateCategory.ALL}` }) => {
  const { location, push } = useHistory();

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

      const search = Url(location)
        .swap('technologiesIds', Select.getChecked(technologiesIds))
        .swap('patternsIds', [])
        .swap('query', query)
        .delete('page')
        .search();

      push(`${pathname}?${search}`);
    },
    [fields, location]
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
