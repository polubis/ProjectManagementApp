import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';
import Table from 'shared/components/table-grid';

import csx from './AdminTableData.scss';

const avatarUrl = 'https://cdn.pixabay.com/photo/2018/04/28/13/18/man-3357275_960_720.png';

export const header = ['', 'name', 'description', 'created', 'modified', 'added by', ''];

const WIDTHS = {
  id: 30,
  name: 226,
  description: 347,
  created: 110,
  modified: 110,
  addedBy: 90,
  icon: 80
};

const formatValue = (value: string, cutIndex: number): string =>
  value.length > cutIndex ? value.substr(0, cutIndex - 3) + '...' : value;

export const getTableData = (data) => {
  // @TODO Add the interface when backend will provide full model
  const tableData: Table.Row[] = data.map((item) => {
    const row: Table.Row = {
      id: {
        width: WIDTHS.id,
        component: <p className={csx.id}>{item.id}</p>
      },
      name: {
        width: WIDTHS.name,
        component: (
          <p title={item.name} className={csx.name}>
            {formatValue(item.name, 31)}
          </p>
        )
      },
      description: {
        width: WIDTHS.description,
        component: (
          <p title={item.description} className={csx.description}>
            {formatValue(item.description, 94)}
          </p>
        )
      },
      created: {
        width: WIDTHS.created,
        component: '19 / Apr / 2020'
      },
      modified: {
        width: WIDTHS.modified,
        component: '19 / Apr / 2020'
      },
      addedBy: {
        width: WIDTHS.addedBy,
        component: (
          <div className={csx.avatarContainer}>
            <Avatar className={csx.avatar} src={avatarUrl} />
            <p>by przemo</p>
          </div>
        )
      },
      icon: {
        width: WIDTHS.created,
        component: <MoreHorizIcon />
      }
    };

    return row;
  });

  return [
    header.reduce(
      (prev, x, i) => ({
        ...prev,
        [i]: {
          component: x,
          width: Object.values(WIDTHS)[i]
        }
      }),
      {}
    ),
    ...tableData
  ];
};
