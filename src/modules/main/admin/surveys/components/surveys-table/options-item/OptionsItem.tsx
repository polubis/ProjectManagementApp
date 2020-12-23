import React from 'react';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';

import { Survey } from 'shared/models';

import { More, Button } from 'ui';

import csx from './OptionsItem.scss';

namespace OptionsItem {
  export interface Props {
    survey: Survey;
    onDeleteClick(survey: Survey): void;
  }
}

const OptionsItem = ({ survey, onDeleteClick }: OptionsItem.Props): JSX.Element => {
  return (
    <More
      trigger={(open) => (
        <Button className={csx.moreBtn} onClick={open} theme="primaryTransparent" variant="icon">
          <MoreHorizIcon />
        </Button>
      )}
    >
      <div className={csx.delete} onClick={() => onDeleteClick(survey)}>
        <DeleteIcon />
        DELETE
      </div>
    </More>
  );
};

export default OptionsItem;
