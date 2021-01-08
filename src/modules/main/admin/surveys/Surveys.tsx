import React, { useState, useCallback } from 'react';

import { Disclaimer, Loader } from 'ui';

import { Survey } from 'shared/models';

import { SurveysSearch, SurveysTable, SurveyPreview, ConfirmSurveyDelete } from './components';
import { useSurveysSearch } from './hooks';
import SurveysProvider, { useSurveysProvider } from './providers';

import csx from './Surveys.scss';

const Surveys = (): JSX.Element => {
  const { pendingRequests, surveys } = useSurveysProvider();

  useSurveysSearch();

  const [surveyToPreview, setSurveyToPreview] = useState<Survey | null>(null);

  const [surveyToDelete, setSurveyToDelete] = useState<Survey | null>(null);

  const openSurveyPreview = useCallback((survey: Survey) => {
    setSurveyToPreview(survey);
  }, []);

  const closeSurveyToPreview = useCallback(() => {
    setSurveyToPreview(null);
  }, []);

  const openSurveyToDelete = useCallback((survey: Survey) => {
    setSurveyToDelete(survey);
  }, []);

  const closeSurveyToDelete = useCallback(() => {
    setSurveyToDelete(null);
  }, []);

  return (
    <div className={csx.surveys}>
      <SurveysSearch />

      {!!surveys.length && (
        <SurveysTable
          survyes={surveys}
          onDeleteClick={openSurveyToDelete}
          onPreviewClick={openSurveyPreview}
        />
      )}

      {!pendingRequests && !surveys.length && (
        <Disclaimer
          description="Change filters to find surveys"
          title="No results for current filters"
        />
      )}

      {!!pendingRequests && <Loader className={csx.loader} />}

      {surveyToPreview && <SurveyPreview survey={surveyToPreview} onClose={closeSurveyToPreview} />}

      {surveyToDelete && (
        <ConfirmSurveyDelete survey={surveyToDelete} onClose={closeSurveyToDelete} />
      )}
    </div>
  );
};

export default (): JSX.Element => (
  <SurveysProvider>
    <Surveys />
  </SurveysProvider>
);
