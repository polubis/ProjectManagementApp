import { core } from 'core/api';

import { Pattern, GET_PATTERNS } from '..';

export const getPatterns = () => core.get<Pattern[]>(GET_PATTERNS);
