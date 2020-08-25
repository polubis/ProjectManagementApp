import { core, Technology, GET_TECHNOLOGIES } from '..';

export const getTechnologies = (query = '') => core.get<Technology[]>(GET_TECHNOLOGIES + query);
