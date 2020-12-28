import React, { memo } from 'react';

import { Modal, Button, Disclaimer } from 'ui';

import { toDate } from 'utils';

import { Survey } from 'shared/models';

import csx from './SurveyPreview.scss';

namespace SurveyPreview {
  export interface Props {
    survey: Survey;
    onClose(): void;
  }
}

const SurveyPreview = memo(
  ({ survey, onClose }: SurveyPreview.Props): JSX.Element => {
    return (
      <Modal className={csx.surveyPreview} onClose={onClose}>
        <Disclaimer
          description={`This survey has rate ${survey.rating} / 5`}
          title={`Survey from ${toDate(survey.createdAt)}`}
        />

        <span className={csx.feedback}>{survey.feedback}</span>

        <Button onClick={onClose}>CLOSE</Button>
      </Modal>
    );
  },
  () => true
);

export default SurveyPreview;
