import { core } from 'core/api';

import { TemplatePayload, Template } from '..';

export const getTemplates = (url: string) => {
  return core.get<Template[]>(`Templates/Search${url}`);
};

export const getTemplateDetails = (id: string) => core.get<Template>(`Templates/${id}`);

export const addTemplate = (payload: TemplatePayload) => core.post<string>('Templates', payload);

export const editTemplate = (id: string, payload: TemplatePayload) =>
  core.put<string>(`Templates/${id}`, payload);
