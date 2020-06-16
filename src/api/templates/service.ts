import { call, coreInstance, AddTemplatePayload, Template } from '..';

export const getTemplates = (page: number, query: string, limit: number) => {
  const urlQuery = `?limit=${limit}&page=${page}&query=${query}`;

  return call<Template[]>(coreInstance.get(`Templates/Search${urlQuery}`));
};

export const addTemplate = (payload: AddTemplatePayload) => {
  return call<string>(coreInstance.post('Templates', payload));
};
