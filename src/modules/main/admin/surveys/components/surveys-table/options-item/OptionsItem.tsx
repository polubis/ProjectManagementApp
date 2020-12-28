import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

import { Survey } from 'shared/models';

import { More, Button } from 'ui';

import csx from './OptionsItem.scss';

namespace OptionsItem {
  export interface Props {
    survey: Survey;
    onDeleteClick(survey: Survey): void;
    onPreviewClick(survey: Survey): void;
  }
}

const OptionsItem = ({ survey, onDeleteClick, onPreviewClick }: OptionsItem.Props): JSX.Element => {
  return (
    <More
      trigger={(open) => (
        <Button className={csx.moreBtn} onClick={open} theme="primaryTransparent" variant="icon">
          <MoreHorizIcon />
        </Button>
      )}
    >
      <div className={csx.preview} onClick={() => onPreviewClick(survey)}>
        <ViewHeadlineIcon />
        PREVIEW
      </div>

      <div className={csx.delete} onClick={() => onDeleteClick(survey)}>
        <DeleteIcon />
        DELETE
      </div>
    </More>
  );
};

export default OptionsItem;
