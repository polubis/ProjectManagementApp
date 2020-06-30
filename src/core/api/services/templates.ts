import { core } from 'core/api';

import { AddTemplatePayload, Template } from '..';

export const getTemplates = (url: string) => {
  return core.get<Template[]>(`Templates/Search${url}`);
};

export const addTemplate = (payload: AddTemplatePayload) => core.post<string>('Templates', payload);
