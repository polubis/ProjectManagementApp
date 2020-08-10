import React, { useMemo } from 'react';
import { Avatar } from '@material-ui/core';
import Table from '../../shared/components/table-grid';
import TechnologiesProvider, { useTechnologiesProvider } from 'core/technologies';
import { Technology } from 'core/api';
import csx from './Admin.scss';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AdminTabCategories from './admin-tab-categories/AdminTabCategories';

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
        value: tech.description.substr(0, 100)
      },
      created: {
        value: '19/Apr/2020',
      },
      modified: {
        value: '19/Apr/2020',
      },
      addedBy: {
        value: 'by przemo',
        component: <div>By przemo</div>,
      },
      icon: {
        component: <MoreHorizIcon></MoreHorizIcon>
      }
    }

    return row;
  });
  return tableData;
};

const Admin = () => {
  const { technologies, loading } = useTechnologiesProvider();

  const technologiesTableData = useMemo(() => getTableData(technologies), [technologies, loading]);

  return (
    <div className={csx.container}>
      <AdminTabCategories />
      <Table data={technologiesTableData} />
    </div>
  );
};

export default () => (
  <TechnologiesProvider>
    <Admin />
  </TechnologiesProvider>
);
