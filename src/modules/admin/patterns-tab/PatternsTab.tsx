import React, { useMemo } from 'react';
import Table from 'shared/components/table-grid';
import PatternsProvider, { usePatternsProvider } from 'core/patterns';
import Search, { usePatternsSearch } from '../search';
import { getTableData, header } from '../helpers/AdminTableData';

const PatternsTab = () => {
  const { patterns, loading } = usePatternsProvider();
  usePatternsSearch();

  const patternsTableData = useMemo(() => getTableData(patterns), [patterns, loading]);

  return <div>
    <Search name="Pattern" />
    <Table data={patternsTableData} header={header} />
  </div>

};

export default () => (
  <PatternsProvider>
    <PatternsTab />
  </PatternsProvider>
);
