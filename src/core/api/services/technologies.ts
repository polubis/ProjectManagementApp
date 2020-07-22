import { core } from 'core/api';

import { Technology, GET_TECHNOLOGIES } from '..';

export const getTechnologies = () => core.get<Technology[]>(GET_TECHNOLOGIES);
