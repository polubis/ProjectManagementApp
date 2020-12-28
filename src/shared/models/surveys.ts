export interface AddSurveyPayload {
  feedback: string;
  rating: number;
}

export interface GetSurveysPayload {
  limit: number;
  page: number;
  query: string;
}

export interface Survey {
  id: string;
  rating: number;
  feedback: string;
  username: string;
  createdAt: string;
}
