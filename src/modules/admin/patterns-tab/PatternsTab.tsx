import React, { useMemo } from 'react';

import PatternsProvider, { usePatternsProvider } from 'core/patterns';

import Search, { usePatternsSearch } from '../search';
import { CONFIG, getTableData } from '../helpers/AdminTableData';

import { Loader, Table } from 'ui';

const PatternsTab = () => {
  const { patterns, loading } = usePatternsProvider();

  usePatternsSearch();

  const patternsTableData = useMemo(() => getTableData(patterns), [patterns]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Search name="Pattern" />
      <Table data={patternsTableData} config={CONFIG} />
    </div>
  );
};

export default () => (
  <PatternsProvider>
    <PatternsTab />
  </PatternsProvider>
);
