import { Pattern, PatternPayload } from 'shared/models';

import { core, DELETE_PATTERN, EDIT_PATTERN, ADD_PATTERN, GET_PATTERN, GET_PATTERNS } from '..';

export const getPatterns = (query: string) => core.get<Pattern[]>(GET_PATTERNS + query);

export const getPattern = (id: number) => core.get<Pattern>(`${GET_PATTERN}/${id}`);

export const deletePattern = (id: number) => {
  return core.delete(`${DELETE_PATTERN}/${id}`);
};

export const editPattern = (id: number, payload: PatternPayload) =>
  core.put<{ id: number }>(`${EDIT_PATTERN}/${id}`, payload);

export const addPattern = (payload: PatternPayload) =>
  core.post<{ id: number }>(ADD_PATTERN, payload);
