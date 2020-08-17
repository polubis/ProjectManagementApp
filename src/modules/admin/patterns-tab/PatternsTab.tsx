import React, { useMemo } from 'react';
import Table from 'shared/components/table-grid';
import PatternsProvider, { usePatternsProvider } from 'core/patterns';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';
import Search, { usePatternsSearch } from '../search';

const avatarUrl = 'https://cdn.pixabay.com/photo/2018/04/28/13/18/man-3357275_960_720.png';

const header = ['', 'name', 'description', 'created', 'modified', 'added by', ''];
// @TODO move it to other file and try to use css
const getTableData = (patterns) => {
  const tableData = patterns.slice(0, 10).map((pattern) => {
    const row: Table.Row = {
      id: {
        value: pattern.id,
        className: 'id'
      },
      name: {
        value: pattern.name,
        className: 'name'
      },
      description: {
        value: pattern.description.substr(0, 94) + '...',
        className: 'description',
      },
      created: {
        value: '19/Apr/2020'
      },
      modified: {
        value: '19/Apr/2020'
      },
      addedBy: {
        value: 'by przemo',
        className: 'avatar',
        component:
          <div style={{ width: 87, display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ width: 24, height: 24 }} src={avatarUrl} />
            <p style={{fontSize: 10}}>by przemo</p>
          </div>
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
  usePatternsSearch();

  const patternsTableData = useMemo(() => getTableData(patterns), [patterns, loading]);

  return <div>
    <Search name="Pattern" />
    <Table data={patternsTableData} header={header} />
  </div>

};

export default () => (
  <PatternsProvider>
    <PatternsTab />
  </PatternsProvider>
);
