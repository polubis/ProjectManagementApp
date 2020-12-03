import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';

import { Loader } from 'ui';

import { getPattern } from 'api';

import { Pattern } from 'shared/models';

import { RouteProps } from '.';

import PatternForm from './pattern-form';

import csx from './PatternManagement.scss';

interface State {
  pending: boolean;
  pattern?: Pattern;
}

const PatternManagement = () => {
  const [state, setState] = useState<State>({
    pending: false,
  });
  const { pending, pattern } = state;

  const match = useRouteMatch<RouteProps>();

  useEffect(() => {
    const handleGetPattern = async (): Promise<void> => {
      setState({
        pending: true,
      });

      try {
        const pattern = await getPattern(+match.params.id);

        setState({
          pending: false,
          pattern,
        });
      } catch {
        setState({
          pending: false,
        });
      }
    };

    const resetState = (): void => {
      setState({ pending: true });

      setTimeout(() => {
        setState({ pending: false });
      });
    };

    if (match.params.id === undefined) {
      resetState();
    } else {
      handleGetPattern();
    }
  }, [match.params.id]);

  return (
    <div className={csx.patternManagement}>
      {pending ? <Loader /> : <PatternForm data={pattern} id={match.params.id} />}
    </div>
  );
};

export default PatternManagement;
