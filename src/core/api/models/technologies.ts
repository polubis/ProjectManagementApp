export interface Technology {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
}

export interface AddTechnologyPayload {
  name: string;
  description: string;
  picture: File;
}

export interface EditTechnologyPayload {
  name: string;
  description: string;
  picture?: File;
}
