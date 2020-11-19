import React from 'react';
import { NavLink } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { More, Button } from 'ui';

import { Dictionary, DictionaryKind } from '../../..';

import csx from './TableItemMore.scss';

namespace TableItemMore {
  export interface Props {
    data: Dictionary;
    kind: DictionaryKind;
    onDelete(dictionary: Dictionary): void;
  }
}

const TableItemMore = ({ data, kind, onDelete }: TableItemMore.Props) => {
  return (
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
        to={`/app/admin/dictionaries/${kind}/management/${data.id}`}
        className={csx.edit}
      >
        <EditIcon />
        EDIT
      </NavLink>
      <div className={csx.delete} onClick={() => onDelete(data)}>
        <DeleteIcon />
        DELETE
      </div>
    </More>
  );
};

export default TableItemMore;
