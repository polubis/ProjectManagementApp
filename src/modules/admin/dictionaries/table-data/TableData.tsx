import React from 'react';
import { NavLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Table, More } from 'ui';

import csx from './TableData.scss';

import { Category } from '../models';

const avatarUrl = 'https://cdn.pixabay.com/photo/2018/04/28/13/18/man-3357275_960_720.png';

const header = ['', 'name', 'description', 'created', 'modified', 'added by', ''];

const CONFIG: Table.TableConfig = {
  height: 500,
  width: 1350,
  itemSize: 80
};

const formatValue = (value: string, cutIndex: number): string =>
  value.length > cutIndex ? value.substr(0, cutIndex - 3) + '...' : value;

namespace TableData {
  export interface Props {
    data: any; // @TODO Add the interface when backend will provide full model
    category: Category;
  }
}

const TableData = ({ data, category }: TableData.Props) => {
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
          <More hideText={true} icon={<MoreHorizIcon />} btnVariant="transparent">
            {/* AT THIS MOMENT ADDING/EDITING PATTERN/TECHNOLOGY IS UNAVAILABLE */}
            <NavLink to={`/app/${category}/management/${item.id}`} className={csx.edit}>
              <EditIcon />
              EDIT
            </NavLink>
            {/* TODO: ADD DELETE */}
            <div className={csx.delete} onClick={() => {}}>
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
