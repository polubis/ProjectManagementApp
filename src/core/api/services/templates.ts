import { from } from 'rxjs';

import {
  core,
  GET_TEMPLATES,
  GET_TEMPLATE_DETAILS,
  ADD_TEMPLATE,
  EDIT_TEMPLATE,
  DELETE_TEMPLATE,
  FORK_TEMPLATE,
  TemplatePayload,
  ForkTemplatePayload,
  Template,
  TemplateDocumentation,
} from '..';

export const getTemplateDocumentation = (url: string) => core.get<TemplateDocumentation>(`TestData/ConvertFromMarkdown?url=${url}`);

export const getTemplates = (url: string) => from(core.get<Template[]>(`${GET_TEMPLATES}${url}`));

export const getTemplateDetails = (id: string) => core.get<Template>(`${GET_TEMPLATE_DETAILS}${id}`);

export const addTemplate = (payload: TemplatePayload) => core.post<string>(ADD_TEMPLATE, payload);

export const editTemplate = (id: string, payload: TemplatePayload) => core.put<string>(`${EDIT_TEMPLATE}${id}`, payload);

export const deleteTemplate = (id: string) => core.delete(`${DELETE_TEMPLATE}${id}`);

export const forkTemplate = (payload: ForkTemplatePayload) => core.post(`${FORK_TEMPLATE}`, payload);
