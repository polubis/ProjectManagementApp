import React, { useMemo } from 'react';
import Table from 'shared/components/table-grid';
import PatternsProvider, { usePatternsProvider } from 'core/patterns';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const header = ['', 'name', 'description', 'created', 'modified', 'added by', ''];

const getTableData = (patterns) => {
  const tableData = patterns.slice(0, 10).map((pattern) => {
    const row: Table.Row = {
      id: {
        value: pattern.id
      },
      name: {
        value: pattern.name
      },
      description: {
        value: pattern.description.substr(0, 100)
      },
      created: {
        value: '19/Apr/2020'
      },
      modified: {
        value: '19/Apr/2020'
      },
      addedBy: {
        value: 'by przemo',
        component: <div>By przemo</div>
      },
      icon: {
        component: <MoreHorizIcon></MoreHorizIcon>
      }
    };

    return row;
  });

  return tableData;
};

const PatternsTab = () => {
  const { patterns, loading } = usePatternsProvider();

  const patternsTableData = useMemo(() => getTableData(patterns), [patterns, loading]);

  return <Table data={patternsTableData} header={header} />;
};

export default () => (
  <PatternsProvider>
    <PatternsTab />
  </PatternsProvider>
);
