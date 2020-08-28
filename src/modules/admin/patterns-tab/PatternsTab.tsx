import PatternsProvider, { usePatternsProvider } from 'core/patterns';
import React, { useMemo } from 'react';
import Search, { usePatternsSearch } from '../search';
import Table from 'shared/components/table';
import { CONFIG, getTableData } from '../helpers/AdminTableData';
import { Loader } from 'ui';

const PatternsTab = () => {
  const { patterns, loading } = usePatternsProvider();

  usePatternsSearch();

  const patternsTableData = useMemo(() => getTableData(patterns), [patterns, loading]);

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
