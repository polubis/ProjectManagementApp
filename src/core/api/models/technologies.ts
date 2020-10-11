export interface Technology {
  id: number;
  name: string;
  description: string;
  picture: string;
}

export interface TechnologyPayload {
  name: string;
  description: string;
  picture: File;
}
