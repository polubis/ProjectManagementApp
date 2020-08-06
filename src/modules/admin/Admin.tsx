import React, { useMemo } from 'react';
import { Avatar } from '@material-ui/core';
import Table from '../../shared/components/table-grid';
import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';
import { Technology } from 'core/api';

const getTableData = (technologies: Technology[]): Table.Row[] => {
  const tableData = technologies.slice(0, 10).map((tech) => {
    const row: Table.Row = {
      id: {
        value: tech.id
      },
      name: {
        value: tech.name
      },
      description: {
        value: tech.description
      }
    }

    return row;
  });
  console.log({tableData})
  return tableData;
};

const Admin = () => {
  const { technologies, loading } = useTechnologiesProvider();

  const technologiesTableData = useMemo(() => getTableData(technologies), [technologies, loading]);

  return (
    <div>
      Hello
      {/* table */}
      <Table data={technologiesTableData} />
      {/* endtable */}
    </div>
  );
};

export default () => (
  <TechnologiesProvider>
    <Admin />
  </TechnologiesProvider>
);
