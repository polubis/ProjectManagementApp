import { call, coreInstance, Template } from '..';

export const getTemplates = (page: number, query: string, limit: number) => {
  const urlQuery = `?limit=${limit}&page=${page}&query=${query}`;

  return call<Template[]>(coreInstance.get(`Templates/Search${urlQuery}`));
};
