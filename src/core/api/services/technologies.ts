import { core } from 'core/api';

import { Technology } from '..';

export const getTechnologies = () => core.get<Technology[]>('TemplateTechnologies/Search');
