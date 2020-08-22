import React, { useMemo } from 'react';

import Table from 'shared/components/table-grid';
import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';
import Search, { useTechnologiesSearch } from '../search';
import { getTableData, header } from '../helpers/AdminTableData';

const TechnologiesTab = () => {
  const { technologies, loading } = useTechnologiesProvider();
  useTechnologiesSearch();

  const technologiesTableData = useMemo(() => getTableData(technologies), [technologies, loading]);

  return (
    <div>
      <Search name="Technology" />
      <Table data={technologiesTableData} header={header} />
    </div>
  );
};

export default () => (
  <TechnologiesProvider>
    <TechnologiesTab />
  </TechnologiesProvider>
);
