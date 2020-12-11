import React, { useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { Tabs, Loader, Disclaimer } from 'ui';

import { Url } from 'utils';

import { useRouteValidation, useSearch } from './hooks';
import { DictionariesTable, DictionariesSearch } from './components';

import { DictionaryKind, RouteProps } from '.';

import csx from './Dictionaries.scss';

const Dictionaries = (): JSX.Element => {
  const history = useHistory();
  const {
    params: { kind },
  } = useRouteMatch<RouteProps>();

  useRouteValidation(kind, history);

  const { data, pending } = useSearch(kind, history);

  const handleClick = useCallback(
    (newKind: DictionaryKind) => {
      const url = Url({ ...location, search: '' })
        .replace(kind, newKind)
        .value();

      history.push(url);
    },
    [history.location]
  );

  return (
    <div className={csx.dictionaries}>
      {kind && (
        <>
          <Tabs active={kind} onClick={handleClick}>
            <>{DictionaryKind.PATTERNS}</>
            <>{DictionaryKind.TECHNOLOGIES}</>
          </Tabs>

          <DictionariesSearch label={kind} />

          {pending ? (
            <Loader />
          ) : data.length > 0 ? (
            <DictionariesTable data={data} kind={kind} />
          ) : (
            <Disclaimer
              description="Change filters to find dictionaries"
              title="No results for current filters"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dictionaries;
