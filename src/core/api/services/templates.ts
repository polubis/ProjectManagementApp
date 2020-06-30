import { core } from 'core/api';

import { AddTemplatePayload, Template } from '..';

export const getTemplates = (url: string) => {
  return core.get<Template[]>(`Templates/Search${url}`);
};

export const getTemplateDetails = (id: string) => core.get<Template>(`Templates/${id}`);

export const addTemplate = (payload: AddTemplatePayload) => core.post<string>('Templates', payload);
