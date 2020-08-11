import { core } from 'core/api';

import {
  GET_TEMPLATES,
  GET_TEMPLATE_DETAILS,
  ADD_TEMPLATE,
  EDIT_TEMPLATE,
  DELETE_TEMPLATE,
  TemplatePayload,
  Template,
  TemplateDocumentation
} from '..';

export const getTemplateDocumentation = (url: string) =>
  core.get<TemplateDocumentation>(`TestData/ConvertFromMarkdown?url=${url}`);

export const getTemplates = (url: string) => core.get<Template[]>(`${GET_TEMPLATES}${url}`);

export const getTemplateDetails = (id: string) =>
  core.get<Template>(`${GET_TEMPLATE_DETAILS}${id}`);

export const addTemplate = (payload: TemplatePayload) => core.post<string>(ADD_TEMPLATE, payload);

export const editTemplate = (id: string, payload: TemplatePayload) =>
  core.put<string>(`${EDIT_TEMPLATE}${id}`, payload);

export const deleteTemplate = (id: string) => core.delete(`${DELETE_TEMPLATE}${id}`);
