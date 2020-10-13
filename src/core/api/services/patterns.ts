import { core, Pattern, DELETE_PATTERN, GET_PATTERNS } from '..';

export const getPatterns = (query: string) => core.get<Pattern[]>(GET_PATTERNS + query);

export const deletePattern = (id: number) => {
  return core.delete(`${DELETE_PATTERN}/${id}`);
};
