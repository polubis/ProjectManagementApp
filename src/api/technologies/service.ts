import { call, coreInstance } from '..';

import { Technology } from '.';

export const getTechnologies = (): Promise<Technology[]> => {
  return call<Technology[]>(coreInstance.get('TemplateTechnologies/Search'));
};
