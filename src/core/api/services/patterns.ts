import { core } from 'core/api';

import { Pattern } from '..';

export const getPatterns = () => {
  return core.get<Pattern[]>('TemplatePatterns/Search');
};
