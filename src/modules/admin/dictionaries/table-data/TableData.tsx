import React from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { Table, More, Button } from 'ui';

import csx from './TableData.scss';

const avatarUrl = 'https://cdn.pixabay.com/photo/2018/04/28/13/18/man-3357275_960_720.png';

const header = ['', 'name', 'description', 'created', 'modified', 'added by', ''];

const CONFIG: Table.TableConfig = {
  height: 500,
  width: 1350,
  itemSize: 80
};

const formatValue = (value: string, cutIndex: number): string =>
  value.length > cutIndex ? value.substr(0, cutIndex - 3) + '...' : value;

const TableData = (data, onDelete) => {
  // @TODO Add the interface when backend will provide full model
  const tableData: Table.Row[] = data.map((item) => {
    const row: Table.Row = {
      id: {
        component: <p className={csx.id}>{item.id}</p>
      },
      name: {
        component: (
          <p title={item.name} className={csx.name}>
            {formatValue(item.name, 31)}
          </p>
        )
      },
      description: {
        component: (
          <p title={item.description} className={csx.description}>
            {formatValue(item.description, 94)}
          </p>
        )
      },
      created: {
        component: '19 / Apr / 2020'
      },
      modified: {
        component: '19 / Apr / 2020'
      },
      addedBy: {
        component: (
          <div className={csx.addedBy}>
            <Avatar className={csx.avatar} src={avatarUrl} />
            <p>by przemo</p>
          </div>
        )
      },
      icon: {
        component: (
          <More
            trigger={(open) => (
              <Button
                className={csx.moreBtn}
                onClick={open}
                theme="primaryTransparent"
                variant="icon"
              >
                <MoreHorizIcon />
              </Button>
            )}
          >
            <NavLink
              to={`/app/admin/dictionaries/technologies/management/${item.id}`}
              className={csx.edit}
            >
              <EditIcon />
              EDIT
            </NavLink>
            <div className={csx.delete} onClick={() => onDelete(item)}>
              <DeleteIcon />
              DELETE
            </div>
          </More>
        )
      }
    };

    return row;
  });

  return [
    header.reduce(
      (prev, x, i) => ({
        ...prev,
        [i]: {
          component: <div className={csx[x]}>{x}</div>
        }
      }),
      {}
    ),
    ...tableData
  ];
};

TableData.CONFIG = CONFIG;

export default TableData;
