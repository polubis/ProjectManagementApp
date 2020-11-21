import {
  core,
  toFormData,
  Technology,
  AddTechnologyPayload,
  EditTechnologyPayload,
  ADD_TECHNOLOGY,
  DELETE_TECHNOLOGY,
  GET_TECHNOLOGIES,
  EDIT_TECHNOLOGY,
  GET_TECHNOLOGY,
} from '..';

export const getTechnologies = (query: string) => core.get<Technology[]>(GET_TECHNOLOGIES + query);

export const addTechnology = (payload: AddTechnologyPayload) =>
  core.post<{ id: number }>(ADD_TECHNOLOGY, toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const editTechnology = (id: number, payload: EditTechnologyPayload) =>
  core.put<{ id: number }>(`${EDIT_TECHNOLOGY}/${id}`, toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getTechnology = (id: number) => core.get<Technology>(`${GET_TECHNOLOGY}/${id}`);

export const deleteTechnology = (id: number) => {
  return core.delete(`${DELETE_TECHNOLOGY}/${id}`);
};
