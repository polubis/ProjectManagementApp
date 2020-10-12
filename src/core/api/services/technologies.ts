import {
  core,
  toFormData,
  Technology,
  AddTechnologyPayload,
  EditTechnologyPayload,
  ADD_TECHNOLOGY,
  EDIT_TECHNOLOGY,
  GET_TECHNOLOGIES
} from '..';

export const getTechnologies = (query: string) => core.get<Technology[]>(GET_TECHNOLOGIES + query);

export const addTechnology = (payload: AddTechnologyPayload) => {
  return core.post<{ id: number }>(ADD_TECHNOLOGY, toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const editTechnology = (id: string, payload: EditTechnologyPayload) => {
  return core.put<{ id: number }>(`${EDIT_TECHNOLOGY}/${id}`, toFormData(payload), {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
