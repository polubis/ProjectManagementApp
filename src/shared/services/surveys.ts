import { Survey, AddSurveyPayload, GetSurveysPayload } from 'shared/models';

import { core } from 'shared/instances';

// TODO: Tell backend devs to rename
const PATH = 'Surveys';

export const getSurveys = (params: GetSurveysPayload): Promise<Survey[]> =>
  core.get<Survey[]>(`${PATH}/Search`, { params });

export const addSurvey = (payload: AddSurveyPayload): Promise<null> =>
  core.post<AddSurveyPayload, null>(`${PATH}/Add`, payload);

export const deleteSurvey = (id: string): Promise<null> =>
  core.delete<null>(`${PATH}/Delete/${id}`);
