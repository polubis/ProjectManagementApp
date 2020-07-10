import { core } from 'core/api';

import { TemplatePayload, Template } from '..';

export const getTemplates = (url: string) => {
  return core.get<Template[]>(`Templates/Search${url}`);
};

export const getTemplate = (id: string) => core.get<Template>(`Templates/${id}`);

export const addTemplate = (payload: TemplatePayload) => core.post<string>('Templates', payload);
