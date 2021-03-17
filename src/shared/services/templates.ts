import {
  TemplatePayload,
  ForkTemplatePayload,
  Template,
  LastAddedTemplatesParams,
} from 'shared/models';

import { core } from 'shared/instances';

const PATH = 'Templates';

export const getTemplates = (query = ''): Promise<Template[]> =>
  core.get<Template[]>(`${PATH}/Search${query}`);

export const getTemplateDetails = (id: string): Promise<Template> =>
  core.get<Template>(`${PATH}/${id}`);

export const addTemplate = (payload: TemplatePayload): Promise<string> =>
  core.post<TemplatePayload, string>(PATH, payload);

export const editTemplate = (id: string, payload: TemplatePayload): Promise<string> =>
  core.put<TemplatePayload, string>(`${PATH}/${id}`, payload);

export const deleteTemplate = (id: string): Promise<null> => core.delete<null>(`${PATH}/${id}`);

export const forkTemplate = (payload: ForkTemplatePayload): Promise<null> =>
  core.post<ForkTemplatePayload, null>(`${PATH}/Fork`, payload);

export const getLastAddedTemplates = (params?: LastAddedTemplatesParams): Promise<Template[]> =>
  core.get<Template[]>(`${PATH}/GetLastAdded`, { params });

export const getRandomTemplate = (): Promise<Template> => core.get<Template>(`${PATH}/GetRandom`);

export const getRandomTemplateByTechnologies = (): Promise<Template> =>
  core.get<Template>(`${PATH}/GetRandomByTechnologies`);
