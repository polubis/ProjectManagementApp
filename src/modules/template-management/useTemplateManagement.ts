import { useState, useCallback, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import { Select } from 'ui';

import { Form } from 'utils';

import { addTemplate, TemplatePayload, editTemplate } from 'core/api';

import { TECHNOLOGIES, PATTERNS, TAGS } from '.';

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

const makePayload = ([
  basicInfoManager,
  githubConnectionManager,
  techDetailsManager
]: Form.Manager[]): TemplatePayload => {
  const [{ value: name }, { value: description }] = basicInfoManager[0].fields;
  const [{ value: githubLink }] = githubConnectionManager[0].fields;
  const technologies = techDetailsManager[0].fields[TECHNOLOGIES].value;
  const patterns = techDetailsManager[0].fields[PATTERNS].value;
  const tags = techDetailsManager[0].fields[TAGS].value;

  return {
    name,
    description,
    githubLink,
    technologiesIds: Select.getChecked(technologies).map((k) => +k),
    patternsIds: Select.getChecked(patterns).map((k) => +k),
    tags
  };
};

export const useTemplateManagement = (): Return => {
  const {
    params: { id }
  } = useRouteMatch<{ id: string }>();

  const history = useHistory();

  const [state, setState] = useState(STATE);

  const handleManagement = useCallback(async (formManagers: Form.Manager[]) => {
    setState({ ...STATE, pending: true });

    try {
      const payload = makePayload(formManagers);

      if (id) {
        await editTemplate(id, payload);
        setState({ ...STATE, id });
      } else {
        const addedTemplateId = await addTemplate(payload);
        setState({ ...STATE, id: addedTemplateId });
      }
    } catch (error) {
      setState({ ...STATE, error });
    }
  }, []);

  useEffect(() => {
    if (state.id) {
      history.replace(`/app/templates/all/${state.id}`);
    }
  }, [state.id]);

  return [state, handleManagement];
};
