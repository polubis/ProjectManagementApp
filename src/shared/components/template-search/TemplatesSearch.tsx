import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Select, SelectBase } from 'ui';

import { Form, useQueryParams, Url, isJSONString } from 'utils';

import { TemplateCategory } from 'core/api';

import { TechnologiesSelect } from '..';

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

  const [{ fields }, change, directChange, submit] = Form.useManager(CONFIG);

  const handleTechnologySelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      directChange([TECHNOLOGIES], [{ ...fields[TECHNOLOGIES].value, [dataIdx]: value }]);
    },
    [fields[TECHNOLOGIES].value]
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

  return (
    <form className={csx.templatesSearch} onSubmit={handleSubmit}>
      <input
        data-idx={QUERY}
        placeholder="Find your template..."
        className={csx.input}
        value={fields[QUERY].value}
        onChange={change}
      />

      <TechnologiesSelect value={fields[TECHNOLOGIES].value} onSelect={handleTechnologySelect} />

      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};

export default TemplatesSearch;
