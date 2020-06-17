import { call, coreInstance, AddTemplatePayload, GetTemplatesPayload, Template } from '..';

export const getTemplates = ({ limit, page, query, technologiesIds }: GetTemplatesPayload) => {
  const parseParam = <T>(value: T, key: string) => {
    return `${key}=${'' + value}`;
  };

  const params = [
    parseParam(limit, 'limit'),
    parseParam(page, 'page'),
    parseParam(query, 'query')
  ].join('&');

  return call<Template[]>(coreInstance.get(`Templates/Search?${params}`));
};

export const addTemplate = (payload: AddTemplatePayload) => {
  return call<string>(coreInstance.post('Templates', payload));
};
