import React from 'react';

import { Disclaimer, Loader } from 'ui';

import { SurveysSearch, SurveysTable } from './components';
import { useSurveysSearch } from './hooks';
import SurveysProvider, { useSurveysProvider } from './providers';

import csx from './Surveys.scss';

const Surveys = (): JSX.Element => {
  const { pendingRequests, surveys } = useSurveysProvider();

  useSurveysSearch();

  return (
    <div className={csx.surveys}>
      <SurveysSearch />

      {!!surveys.length && <SurveysTable survyes={surveys} onDeleteClick={() => {}} />}

      {!pendingRequests && !surveys.length && (
        <Disclaimer
          description="Change filters to find surveys"
          title="Not results for current filters"
        />
      )}

      {!!pendingRequests && <Loader className={csx.loader} />}
    </div>
  );
};

export default (): JSX.Element => (
  <SurveysProvider>
    <Surveys />
  </SurveysProvider>
);
