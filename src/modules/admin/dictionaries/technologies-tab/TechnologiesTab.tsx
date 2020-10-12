import React, { useMemo, useCallback, useState } from 'react';

import { Table } from 'ui';

import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';
import { Technology } from 'core/api';

import { useTechnologiesSearch } from './useTechnologiesSearch';
import ConfirmTechnologyDelete from './confirm-technology-delete';

import Search from '../search';
import TableData from '../table-data';

const TechnologiesTab = () => {
  const [technologyToDelete, setTechnologyToDelete] = useState<Technology>(null);

  const { technologies, loading } = useTechnologiesProvider();

  useTechnologiesSearch();

  const openConfirmDelete = useCallback((technology: Technology) => {
    setTechnologyToDelete(technology);
  }, []);

  const closeConfirmDelete = useCallback(() => {
    setTechnologyToDelete(null);
  }, []);

  const technologiesTableData = useMemo(() => TableData(technologies, openConfirmDelete), [
    technologies
  ]);

  return (
    <div>
      <Search name="Technology" />

      {loading || <Table data={technologiesTableData} config={TableData.CONFIG} />}

      {technologyToDelete && (
        <ConfirmTechnologyDelete technology={technologyToDelete} onClose={closeConfirmDelete} />
      )}
    </div>
  );
};

export default () => (
  <TechnologiesProvider>
    <TechnologiesTab />
  </TechnologiesProvider>
);
