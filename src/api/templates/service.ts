import { core } from 'core/api';

import { AddTemplatePayload, GetTemplatesPayload, Template } from '..';

export const getTemplates = ({ limit, page, query, technologiesIds }: GetTemplatesPayload) => {
  const parseParam = <T>(value: T, key: string) => {
    return `${key}=${'' + value}`;
  };

  const params = [
    parseParam(limit, 'limit'),
    parseParam(page, 'page'),
    parseParam(query, 'query')
  ].join('&');

  return core.get<Template[]>(`Templates/Search?${params}`);
};

export const getTemplateDetails = (id: string) => core.get<Template>(`Templates/${id}`);

export const addTemplate = (payload: AddTemplatePayload) => core.post<string>('Templates', payload);
