import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';

import { Template } from 'core/api';

import { useTemplateDetailsProvider } from 'shared/providers/template-details';

import { config as baseConfig } from '.';

interface State {
  loading: boolean;
  config: typeof baseConfig;
}

type Return = [State];

const makeInitState = (id: string): State => ({
  loading: !!id,
  config: baseConfig
});

const makeConfig = (template: Template) => {};

export const useTemplateManagementConfig = (): Return => {
  const {
    params: { id }
  } = useRouteMatch<{ id: string }>();

  const [state, setState] = useState(makeInitState(id));

  const { template, getTemplate } = useTemplateDetailsProvider();

  useEffect(() => {
    if (id) {
      //   getTemplate(id);
    }
  }, [id]);

  //   useEffect(() => {
  //     if (id && template) {
  //         setState({pending: false, config: })
  //     }
  //   }, [id, template]);

  return [state];
};
