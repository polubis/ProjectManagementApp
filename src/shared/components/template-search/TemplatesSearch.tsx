import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Select } from 'ui';

import { Form, useQueryParams, Url, isJSONString } from 'utils';

import { TemplateCategory, Technology } from 'core/api';
import { useTechnologiesProvider } from 'core/technologies';

import csx from './TemplatesSearch.scss';
import TechnologiesSelect from '../technologies-select/TechnologiesSelect';

namespace TemplatesSearch {
  export interface Props {
    pathname?: string;
  }
}

const [QUERY, TECHNOLOGIES] = [0, 1];

const CONFIG: Form.Config = [
  { label: 'Query', value: '' },
  {
    label: 'Technologies',
    value: {}
  }
];

const parseTechnologies = (technologiesIds: string) =>
  isJSONString(technologiesIds)
    ? (JSON.parse(technologiesIds) as string[]).reduce((prev, id) => ({ ...prev, [id]: true }), {})
    : {};

const mapTechnologies = (technologies: Technology[], value: { [key: number]: boolean }) => () =>
  technologies.map(t => ({
    label: t.name,
    dataIdx: t.id,
    value: !!value[t.id]
  })) as TechnologiesSelect.Item[];

const TemplatesSearch = ({ pathname = `/app/templates/${TemplateCategory.ALL}` }) => {
  const { location, push } = useHistory();

  const [query, technologiesIds] = useQueryParams('query', 'technologiesIds');

  const { technologies } = useTechnologiesProvider();

  const [{ fields }, change, directChange, submit] = Form.useManager(CONFIG);

  const handleTechnologySelect: TechnologiesSelect.OnSelect = useCallback(
    (dataIdx, checked) => {
      directChange([TECHNOLOGIES], [{ ...fields[TECHNOLOGIES].value, [dataIdx]: checked }]);
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

  const mappedTechnologies = useMemo(mapTechnologies(technologies, fields[TECHNOLOGIES].value), [
    technologies,
    fields[TECHNOLOGIES].value
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

      <TechnologiesSelect items={mappedTechnologies} onSelect={handleTechnologySelect} />

      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};

export default TemplatesSearch;
