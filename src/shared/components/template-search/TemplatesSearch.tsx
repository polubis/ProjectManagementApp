import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Select, SelectBase } from 'ui';

import { Form, useQueryParams, Url, isJSONString } from 'utils';

import { TemplateCategory } from 'core/api';

import PatternsSelect from './patterns-select';
import TechnologiesSelect from './technologies-select';

import csx from './TemplatesSearch.scss';

namespace TemplatesSearch {
  export interface Props {
    pathname?: string;
  }
}

const [QUERY, PATTERNS, TECHNOLOGIES] = [0, 1, 2];

const parseFromString = (str: string) =>
  isJSONString(str)
    ? (JSON.parse(str) as string[]).reduce((prev, id) => ({ ...prev, [id]: true }), {})
    : {};

const CONFIG: Form.Config = [
  { label: 'Query', value: '' },
  { label: 'Patterns', value: {} },
  {
    label: 'Technologies',
    value: {}
  }
];

const TemplatesSearch = ({ pathname = `/app/templates/${TemplateCategory.ALL}` }) => {
  const { location, push } = useHistory();

  const [query, patternsIds, technologiesIds] = useQueryParams(
    'query',
    'patternsIds',
    'technologiesIds'
  );

  const [{ fields }, change, directChange, submit] = Form.useManager(CONFIG);

  const handlePatternSelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      directChange([PATTERNS], [{ ...fields[PATTERNS].value, [dataIdx]: value }]);
    },
    [fields]
  );

  const handleTechnologySelect: SelectBase.OnSelect = useCallback(
    (dataIdx, value) => {
      directChange([TECHNOLOGIES], [{ ...fields[TECHNOLOGIES].value, [dataIdx]: value }]);
    },
    [fields]
  );

  const handleSubmit = useCallback(
    (e: Form.Events.Submit) => {
      const isInvalid = submit(e);

      if (isInvalid) {
        return;
      }

      const [{ value: query }, { value: patternsIds }, { value: technologiesIds }] = fields;

      const search = Url(location)
        .swap('technologiesIds', Select.getChecked(technologiesIds))
        .swap('patternsIds', Select.getChecked(patternsIds))
        .swap('query', query)
        .delete('page')
        .search();

      push(`${pathname}?${search}`);
    },
    [fields, location]
  );

  useEffect(() => {
    directChange(
      [QUERY, PATTERNS, TECHNOLOGIES],
      [query, parseFromString(patternsIds), parseFromString(technologiesIds)]
    );
  }, [query, patternsIds, technologiesIds]);

  return (
    <form className={csx.templatesSearch} onSubmit={handleSubmit}>
      <input
        data-idx={QUERY}
        placeholder="Find your template..."
        className={csx.input}
        value={fields[QUERY].value}
        onChange={change}
      />

      <PatternsSelect value={fields[PATTERNS].value} onSelect={handlePatternSelect} />

      <TechnologiesSelect value={fields[TECHNOLOGIES].value} onSelect={handleTechnologySelect} />

      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};

export default TemplatesSearch;
