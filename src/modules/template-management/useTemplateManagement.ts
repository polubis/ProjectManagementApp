import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Checkbox } from 'ui';

import { Form } from 'utils';

import { addTemplate, TemplatePayload } from 'core/api';

interface State {
  pending: boolean;
  error: string;
  id: string | null;
}

type Return = [State, (formManagers: Form.Manager[]) => Promise<void>];

const STATE: State = {
  pending: false,
  error: '',
  id: null
};

const getPayload = ([
  basicInfoManager,
  githubConnectionManager,
  techDetailsManager
]: Form.Manager[]): TemplatePayload => {
  const [{ value: name }, { value: description }] = basicInfoManager[0].fields;
  const [{ value: githubLink }] = githubConnectionManager[0].fields;
  const [_, __, { value: tags }] = techDetailsManager[0].fields;
  const technologies: Checkbox.Props[] = techDetailsManager[0].fields[0].value;
  const patterns: Checkbox.Props[] = techDetailsManager[0].fields[1].value;

  return {
    name,
    description,
    githubLink,
    technologiesIds: technologies.filter((t) => t.value).map((t) => +t.dataIdx),
    patternsIds: patterns.filter((p) => p.value).map((t) => +t.dataIdx),
    tags
  };
};

export const useTemplateManagement = (): Return => {
  const history = useHistory();

  const [state, setState] = useState(STATE);

  const handleAdd = useCallback(async (formManagers: Form.Manager[]) => {
    setState({ ...STATE, pending: true });

    try {
      const id = await addTemplate(getPayload(formManagers));

      setState({ ...STATE, id });
    } catch (error) {
      setState({ ...STATE, error });
    }
  }, []);

  useEffect(() => {
    if (state.id) {
      history.replace(`/app/templates/all/${state.id}`);
    }
  }, [state.id]);

  return [state, handleAdd];
};
