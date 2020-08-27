import React, { useMemo } from 'react';
import Search, { useTechnologiesSearch } from '../search';
import Table from 'shared/components/table-grid';
import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';
import { CONFIG, getTableData } from '../helpers/AdminTableData';
import { Loader } from 'ui';


const TechnologiesTab = () => {
  const { technologies, loading } = useTechnologiesProvider();
  useTechnologiesSearch();

  const technologiesTableData = useMemo(() => getTableData(technologies), [technologies, loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Search name="Technology" />
      <Table data={technologiesTableData} config={CONFIG} />
    </div>
  );
};

export default () => (
  <TechnologiesProvider>
    <TechnologiesTab />
  </TechnologiesProvider>
);
