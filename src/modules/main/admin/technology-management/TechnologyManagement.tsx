import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';

import { Loader } from 'ui';

import { getTechnology } from 'shared/services';
import { Technology } from 'shared/models';

import { RouteProps } from '.';

import TechnologyForm from './technology-form';

import csx from './TechnologyManagement.scss';

interface State {
  pending: boolean;
  technology?: Technology;
}

const TechnologyManagement = () => {
  const [state, setState] = useState<State>({
    pending: false,
  });
  const { pending, technology } = state;

  const match = useRouteMatch<RouteProps>();

  useEffect(() => {
    const handleGetTechnology = async (): Promise<void> => {
      setState({
        pending: true,
      });

      try {
        const technology = await getTechnology(+match.params.id);

        setState({
          pending: false,
          technology,
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
      handleGetTechnology();
    }
  }, [match.params.id]);

  return (
    <div className={csx.technologyManagement}>
      {pending ? <Loader /> : <TechnologyForm data={technology} id={match.params.id} />}
    </div>
  );
};

export default TechnologyManagement;
