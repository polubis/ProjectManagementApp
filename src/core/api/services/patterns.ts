import { core, Pattern, GET_PATTERNS } from '..';

export const getPatterns = (query?: string) => core.get<Pattern[]>(GET_PATTERNS + (query || ''));
