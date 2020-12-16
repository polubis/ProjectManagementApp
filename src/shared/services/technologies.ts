import { Technology, AddTechnologyPayload, EditTechnologyPayload } from 'shared/models';

import { createFormData } from 'utils';

import { core } from 'shared/instances';

// TODO: PING BACKEND TO RENAME
const PATH = 'TemplateTechnologies';

export const getTechnologies = (query: string): Promise<Technology[]> =>
  core.get<Technology[]>(`${PATH}/Search${query}`);

export const addTechnology = (payload: AddTechnologyPayload): Promise<{ id: number }> =>
  core.post<{ id: number }>(`${PATH}/Add`, createFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const editTechnology = (
  id: number,
  payload: EditTechnologyPayload
): Promise<{ id: number }> =>
  core.put<{ id: number }>(`${PATH}/Update/${id}`, createFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getTechnology = (id: number): Promise<Technology> =>
  core.get<Technology>(`${PATH}/Get/${id}`);

export const deleteTechnology = (id: number): Promise<null> =>
  core.delete<null>(`${PATH}/Delete/${id}`);
