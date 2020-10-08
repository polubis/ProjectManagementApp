import React, { useMemo, useState } from 'react';

import { Table } from 'ui';

import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';

import { useTechnologiesSearch } from './useTechnologiesSearch';

import Search from '../search';

import TableData from '../table-data';

import { Category } from '../models';
import { Pattern, Technology } from 'core/api';
import { ConfirmDelete } from 'shared/components';

const TechnologiesTab = () => {
  const [currentItem, setCurrentItem] = useState<Pattern | Technology>();

  const { technologies, loading, error } = useTechnologiesProvider();

  useTechnologiesSearch();

  const technologiesTableData = useMemo(
    () =>
      TableData({
        data: technologies,
        category: Category.TECHNOLOGIES,
        setCurrentItem
      }),
    [technologies]
  );

  return (
    <div>
      <Search name="Technology" />
      {loading ||
        (!error && (
          <>
            {currentItem && (
              <ConfirmDelete category={currentItem} onClose={() => setCurrentItem(null)} />
            )}
            <Table data={technologiesTableData} config={TableData.CONFIG} />
          </>
        ))}
    </div>
  );
};

export default () => (
  <TechnologiesProvider>
    <TechnologiesTab />
  </TechnologiesProvider>
);
