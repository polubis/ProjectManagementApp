import {
  core,
  Pattern,
  DELETE_PATTERN,
  EDIT_PATTERN,
  ADD_PATTERN,
  GET_PATTERN,
  GET_PATTERNS,
  PatternPayload
} from '..';

export const getPatterns = (query: string) => core.get<Pattern[]>(GET_PATTERNS + query);

export const getPattern = (id: number) => core.get<Pattern>(`${GET_PATTERN}/${id}`);

export const deletePattern = (id: number) => {
  return core.delete(`${DELETE_PATTERN}/${id}`);
};

export const editPattern = (id: number, payload: PatternPayload) =>
  core.put<{ id: number }>(`${EDIT_PATTERN}/${id}`, payload);

export const addPattern = (payload: PatternPayload) =>
  core.put<{ id: number }>(ADD_PATTERN, payload);
