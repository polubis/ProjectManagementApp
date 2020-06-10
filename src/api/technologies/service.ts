import { call, coreInstance } from '..';

import { Technology } from '.';

export const getTechnologies = () => {
  return call<Technology[]>(coreInstance.get('TemplateTechnologies/Search'));
};
