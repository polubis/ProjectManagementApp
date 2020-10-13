import React, { useMemo, useCallback, useState } from 'react';

import { Table } from 'ui';

import PatternsProvider, { usePatternsProvider } from 'core/patterns';
import { Pattern } from 'core/api';

import { usePatternsSearch } from './usePatternsSearch';
import ConfirmDeletePattern from './confirm-delete-pattern';

import Search from '../search';
import TableData from '../table-data';

const PatternsTab = () => {
  const [patternToDelete, setPatternToDelete] = useState<Pattern>(null);

  const { patterns, loading } = usePatternsProvider();

  usePatternsSearch();

  const openConfirmDelete = useCallback((pattern: Pattern) => {
    setPatternToDelete(pattern);
  }, []);

  const closeConfirmDelete = useCallback(() => {
    setPatternToDelete(null);
  }, []);

  const patternsTableData = useMemo(() => TableData(patterns, openConfirmDelete), [patterns]);

  return (
    <div>
      <Search name="Pattern" />
      {loading || <Table data={patternsTableData} config={TableData.CONFIG} />}

      {patternToDelete && (
        <ConfirmDeletePattern pattern={patternToDelete} onClose={closeConfirmDelete} />
      )}
    </div>
  );
};

export default () => (
  <PatternsProvider>
    <PatternsTab />
  </PatternsProvider>
);
