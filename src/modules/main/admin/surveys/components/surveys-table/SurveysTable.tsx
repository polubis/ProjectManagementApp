import React, { useMemo } from 'react';

import { Table } from 'ui';

import { Survey } from 'shared/models';

import OptionsItem from './options-item';

import csx from './SurveysTable.scss';

namespace SurvyesTable {
  export interface Props {
    survyes: Survey[];
    onDeleteClick(survey: Survey): void;
    onPreviewClick(survey: Survey): void;
  }
}

const CONFIG: Table.Config = {
  id: {
    size: {
      min: '200px',
      max: '200px',
    },
  },
  createdAt: {
    size: {
      min: '200px',
      max: '200px',
    },
    label: 'Created at',
  },
  username: {
    size: {
      min: '150px',
      max: '150px',
    },
    label: 'Added by',
  },
  rating: {
    size: {
      min: '150px',
      max: '150px',
    },
    label: 'Rate',
  },
  feedback: {
    size: {
      min: '400px',
      max: '400px',
    },
    label: 'Opinion',
  },
};

const SurvyesTable = ({ survyes, onDeleteClick, onPreviewClick }: SurvyesTable.Props): JSX.Element => {
  const config = useMemo(() => {
    return {
      ...CONFIG,
      roles: {
        label: 'Options',
        row: (key, survey: Survey) => <OptionsItem survey={survey} onDeleteClick={onDeleteClick} onPreviewClick={onPreviewClick} />,
        size: {
          min: '120px',
          max: '120px',
        },
      },
    };
  }, [survyes, onDeleteClick]);

  return (
    <div className={csx.surveysTable}>
      <Table config={config} data={survyes} />
    </div>
  );
};

export default SurvyesTable;
