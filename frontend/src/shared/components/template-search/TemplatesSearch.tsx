import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import SearchIcon from '@material-ui/icons/Search';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import { SelectBase } from 'ui';

import { Form, useQueryParams, Url, isJsonString } from 'utils';

import { PatternsSelect, TechnologiesSelect } from 'shared/components';

import ControlButton from './control-button';

import csx from './TemplatesSearch.scss';

namespace TemplatesSearch {
  export interface Props {
    className?: string;
    pathname: string;
  }
}

const [QUERY, PATTERNS, TECHNOLOGIES] = [0, 1, 2];

const parseFromString = (str: string) =>
  isJsonString(str)
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

const TemplatesSearch = ({ className, pathname }: TemplatesSearch.Props) => {
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
      const invalid = submit(e);

      if (invalid) {
        return;
      }

      const [{ value: query }, { value: patternsIds }, { value: technologiesIds }] = fields;

      const search = Url(location)
        .swap('technologiesIds', SelectBase.getSelected(technologiesIds))
        .swap('patternsIds', SelectBase.getSelected(patternsIds))
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
    <form className={`${csx.templatesSearch} ${className}`} onSubmit={handleSubmit}>
      <input
        data-idx={QUERY}
        placeholder="Find your template..."
        className={csx.input}
        value={fields[QUERY].value}
        onChange={change}
      />

      <PatternsSelect value={fields[PATTERNS].value} onSelect={handlePatternSelect}>
        <ControlButton value={fields[PATTERNS].value}>
          <PlaylistAddIcon />
        </ControlButton>
      </PatternsSelect>

      <TechnologiesSelect value={fields[TECHNOLOGIES].value} onSelect={handleTechnologySelect}>
        <ControlButton value={fields[TECHNOLOGIES].value}>
          <CodeIcon />
        </ControlButton>
      </TechnologiesSelect>

      <Button type="submit" className={csx.confirmSearchBtn}>
        <SearchIcon />
      </Button>
    </form>
  );
};

export default TemplatesSearch;
