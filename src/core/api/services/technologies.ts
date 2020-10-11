import { core, Technology, TechnologyPayload, ADD_TECHNOLOGY, GET_TECHNOLOGIES } from '..';

export const getTechnologies = (query: string) => core.get<Technology[]>(GET_TECHNOLOGIES + query);

// TODO ADD EDIT ENDPOINT AFTER BE FINISH

export const addTechnology = (payload: TechnologyPayload) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });

  return core.post<{ id: number }>(ADD_TECHNOLOGY, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
