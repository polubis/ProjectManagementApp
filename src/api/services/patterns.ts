import { Pattern, PatternPayload } from 'shared/models';

import { core } from '..';

// TODO: Tell backend devs to rename
const PATH = 'TemplatePatterns';

export const getPatterns = (query: string): Promise<Pattern[]> =>
  core.get<Pattern[]>(`${PATH}/Search${query}`);

export const getPattern = (id: number): Promise<Pattern> => core.get<Pattern>(`${PATH}/Get/${id}`);

export const deletePattern = (id: number): Promise<null> =>
  core.delete<null>(`${PATH}/Delete/${id}`);

export const editPattern = (id: number, payload: PatternPayload): Promise<{ id: number }> =>
  core.put<{ id: number }>(`${PATH}/Update/${id}`, payload);

export const addPattern = (payload: PatternPayload): Promise<{ id: number }> =>
  core.post<{ id: number }>(`${PATH}/Add`, payload);
