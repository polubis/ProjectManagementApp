import React, { useState, useEffect, FC } from 'react';
import { useRouteMatch } from 'react-router';

import { Loader } from 'ui';

import { Group } from 'shared/models';

import GroupForm from './group-form';

import csx from './GroupManagement.scss';

interface RouteParams {
  id?: string;
}

interface State {
  pending: boolean;
  group?: Group;
}

const GroupManagement: FC = () => {
  const match = useRouteMatch<RouteParams>();

  const { id } = match.params;

  const [state, setState] = useState<State>({
    pending: false,
  });
  const { pending, group } = state;

  useEffect(() => {
    const handleGetGroup = async (): Promise<void> => {
      setState({
        pending: true,
      });

      try {
        // const technology = await getTechnology(+match.params.id);
        // setState({
        //   pending: false,
        //   technology,
        // });
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

    if (id === undefined) {
      resetState();
    } else {
      handleGetGroup();
    }
  }, [id]);

  return (
    <div className={csx.groupManagement}>
      {pending ? <Loader /> : <GroupForm id={id} data={group} />}
    </div>
  );
};

export default GroupManagement;
