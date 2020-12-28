import React, { useState, useCallback, memo } from 'react';
import { useHistory } from 'react-router';

import { deleteSurvey } from 'shared/services';
import { ConfirmDelete } from 'shared/components';
import { useAlertsProvider } from 'shared/providers/alerts';
import { Survey } from 'shared/models';

export namespace ConfirmSurveyDelete {
  export interface Props {
    survey: Survey;
    onClose(): void;
  }
}

const ConfirmSurveyDelete = memo(
  ({ survey, onClose }: ConfirmSurveyDelete.Props) => {
    const history = useHistory();

    const { showAlert } = useAlertsProvider();

    const [pending, setPending] = useState(false);

    const handleDelete = useCallback(async () => {
      setPending(true);

      try {
        await deleteSurvey(survey.id);

        showAlert({ message: 'Survey successfully deleted', type: 'success' });
        history.push('/app/admin/surveys');
        onClose();
      } catch (message) {
        setPending(false);
        showAlert({ message });
      }
    }, []);

    return (
      <ConfirmDelete
        cancelDisabled={pending}
        deleteDisabled={pending}
        description={() => (
          <>
            This will delete survey added by <b>{survey.username}</b>
          </>
        )}
        title="You are about to delete survey"
        onClose={onClose}
        onDelete={handleDelete}
      />
    );
  },
  () => false
);

export default ConfirmSurveyDelete;
