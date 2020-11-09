import { core, Pattern, GET_PATTERNS } from '..';

export const getPatterns = () => core.get<Pattern[]>(GET_PATTERNS);
