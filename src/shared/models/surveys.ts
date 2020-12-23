export interface AddSurveyPayload {
  feedback: string;
  rating: number;
}

export interface Survey {
  id: string;
  rating: number;
  feedback: string;
  username: string;
  createdAt: string;
}
