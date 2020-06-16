import { useState, useCallback } from 'react';

import { AddTemplatePayload, addTemplate } from 'api';

import { UseTemplateManagement, UseTemplateManagementState } from '.';

export const useTemplateManagement = (): UseTemplateManagement => {
  const [state, setState] = useState<UseTemplateManagementState>({
    pending: false,
    error: '',
    result: null
  });

  const add = useCallback(
    async (payload: AddTemplatePayload) => {
      setState({ pending: true, error: '', result: null });

      try {
        const result = await addTemplate(payload);

        setState({ pending: false, error: '', result });
      } catch (error) {
        setState({ pending: false, result: null, error });
      }
    },
    [state]
  );

  return [state, add];
};
