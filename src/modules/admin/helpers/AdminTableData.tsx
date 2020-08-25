import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';
import Table from 'shared/components/table-grid';

import csx from './AdminTableData.scss';

const avatarUrl = 'https://cdn.pixabay.com/photo/2018/04/28/13/18/man-3357275_960_720.png';

export const header = ['', 'name', 'description', 'created', 'modified', 'added by', ''];

const formatValue = (value: string, cutIndex: number) : string =>
  value.length > cutIndex
    ? value.substr(0, cutIndex - 3) + '...'
    : value;

export const getTableData = (data) => { // @TODO Add the interface when backend will provide full model
    const tableData : Table.Row[] = data.map((item) => {
      const row: Table.Row = {
        id: {
          component: <p className={csx.id}>{item.id}</p>
        },
        name: {
          component: <p title={item.name} className={csx.name}>{formatValue(item.name, 31)}</p>

        },
        description: {
        component: <p title={item.description} className={csx.description}>{formatValue(item.description, 94)}</p>
        },
        created: {
          component: '19 / Apr / 2020'
        },
        modified: {
          component: '19 / Apr / 2020'
        },
        addedBy: {
          component:
            <div className={csx.avatarContainer}>
              <Avatar className={csx.avatar} src={avatarUrl} />
              <p>by przemo</p>
            </div>
        },
        icon: {
          component: <MoreHorizIcon />
        }
      };
  
      return row;
    });
  
    return tableData;
  };