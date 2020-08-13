import { core } from 'core/api';

import { Technology, GET_TECHNOLOGIES } from '..';

export const getTechnologies = (query: string) => core.get<Technology[]>(GET_TECHNOLOGIES + query)
