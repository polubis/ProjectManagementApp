import { call, coreInstance, Technology } from '..';

export const getTechnologies = (): Promise<Technology[]> => {
  return call<Technology[]>(coreInstance.get('TemplateTechnologies/Search'));
};
