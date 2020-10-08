import { core, Technology, GET_TECHNOLOGIES, DELETE_TECHNOLOGY } from '..';

export const getTechnologies = (query: string) => core.get<Technology[]>(GET_TECHNOLOGIES + query);

export const deleteTechnology = (id: number) => core.delete(`${DELETE_TECHNOLOGY}/${id}`);
