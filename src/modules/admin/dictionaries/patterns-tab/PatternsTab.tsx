import React, { useMemo } from 'react';

import { Table } from 'ui';

import PatternsProvider, { usePatternsProvider } from 'core/patterns';

import { usePatternsSearch } from './usePatternsSearch';

import Search from '../search';

import TableData from '../table-data';

import { Category } from '../models';

const PatternsTab = () => {
  const { patterns, loading, error } = usePatternsProvider();

  usePatternsSearch();

  const patternsTableData = useMemo(
    () => TableData({ data: patterns, category: Category.PATTERNS }),
    [patterns]
  );

  return (
    <div>
      <Search name="Pattern" />
      {loading || (!error && <Table data={patternsTableData} config={TableData.CONFIG} />)}
    </div>
  );
};

export default () => (
  <PatternsProvider>
    <PatternsTab />
  </PatternsProvider>
);
