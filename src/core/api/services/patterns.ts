import { core, Pattern, GET_PATTERNS, DELETE_PATTERN } from '..';

export const getPatterns = (query: string) => core.get<Pattern[]>(GET_PATTERNS + query);

// not available yet
export const deletePattern = (id: number) => core.delete(`${DELETE_PATTERN}/${id}`);
