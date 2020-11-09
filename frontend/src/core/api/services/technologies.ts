import { core, Technology, GET_TECHNOLOGIES } from '..';

export const getTechnologies = () => core.get<Technology[]>(GET_TECHNOLOGIES);
