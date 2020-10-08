import React, { useMemo, useState, useCallback } from 'react';

import { Table } from 'ui';

import PatternsProvider, { usePatternsProvider } from 'core/patterns';

import { usePatternsSearch } from './usePatternsSearch';

import Search from '../search';

import TableData from '../table-data';

import { Category } from '../models';
import { ConfirmDelete } from 'shared/components';
import { Pattern, Technology } from 'core/api';

const PatternsTab = () => {
  const [currentItem, setCurrentItem] = useState<Pattern | Technology>();

  const { patterns, loading, error } = usePatternsProvider();

  usePatternsSearch();

  const closeConfirmDelete = useCallback(() => {
    setCurrentItem(null);
  }, []);

  const patternsTableData = useMemo(
    () =>
      TableData({
        data: patterns,
        category: Category.PATTERNS,
        setCurrentItem
      }),
    [patterns]
  );

  return (
    <div>
      <Search name="Pattern" />
      {loading ||
        (!error && (
          <>
            {currentItem && <ConfirmDelete category={currentItem} onClose={closeConfirmDelete} />}
            <Table data={patternsTableData} config={TableData.CONFIG} />
          </>
        ))}
    </div>
  );
};

export default () => (
  <PatternsProvider>
    <PatternsTab />
  </PatternsProvider>
);
