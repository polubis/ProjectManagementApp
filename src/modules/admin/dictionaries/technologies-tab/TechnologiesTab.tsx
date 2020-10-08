import React, { useMemo } from 'react';

import { Table } from 'ui';

import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';

import { useTechnologiesSearch } from './useTechnologiesSearch';

import Search from '../search';

import TableData from '../table-data';

import { Category } from '../models';

const TechnologiesTab = () => {
  const { technologies, loading, error } = useTechnologiesProvider();

  useTechnologiesSearch();

  const technologiesTableData = useMemo(
    () => TableData({ data: technologies, category: Category.TECHNOLOGIES }),
    [technologies]
  );

  return (
    <div>
      <Search name="Technology" />
      {loading || (!error && <Table data={technologiesTableData} config={TableData.CONFIG} />)}
    </div>
  );
};

export default () => (
  <TechnologiesProvider>
    <TechnologiesTab />
  </TechnologiesProvider>
);
