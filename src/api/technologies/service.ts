import { Technology } from '.';

import { call, coreInstance } from '..';

export const getTechnologies = () => {
  return call<Technology[]>(coreInstance.get('TemplateTechnologies/Search'));
};
