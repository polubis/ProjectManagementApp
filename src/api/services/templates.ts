import {
  TemplatePayload,
  ForkTemplatePayload,
  Template,
  TemplateDocumentation,
} from 'shared/models';

import { core } from '..';

const PATH = 'Templates';

export const getTemplateDocumentation = (url: string): Promise<TemplateDocumentation> =>
  core.get<TemplateDocumentation>(`TestData/ConvertFromMarkdown?url=${url}`);

export const getTemplates = (query: string): Promise<Template[]> =>
  core.get<Template[]>(`${PATH}/Search${query}`);

export const getTemplateDetails = (id: string): Promise<Template> =>
  core.get<Template>(`${PATH}/${id}`);

export const addTemplate = (payload: TemplatePayload): Promise<string> =>
  core.post<string>(PATH, payload);

export const editTemplate = (id: string, payload: TemplatePayload): Promise<string> =>
  core.put<string>(`${PATH}/${id}`, payload);

export const deleteTemplate = (id: string): Promise<null> => core.delete<null>(`${PATH}/${id}`);

export const forkTemplate = (payload: ForkTemplatePayload): Promise<null> =>
  core.post<null>(`${PATH}/Fork`, payload);
