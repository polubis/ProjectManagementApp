import React, { useMemo } from 'react';

import { Table } from 'ui';

import PatternsProvider, { usePatternsProvider } from 'core/patterns';

import { usePatternsSearch } from './usePatternsSearch';

import Search from '../search';
import TableData from '../table-data';

const PatternsTab = () => {
  const { patterns, loading } = usePatternsProvider();

  usePatternsSearch();

  const patternsTableData = useMemo(() => TableData(patterns), [patterns]);

  return (
    <div>
      <Search name="Pattern" />
      {loading || <Table data={patternsTableData} config={TableData.CONFIG} />}
    </div>
  );
};

export default () => (
  <PatternsProvider>
    <PatternsTab />
  </PatternsProvider>
);
