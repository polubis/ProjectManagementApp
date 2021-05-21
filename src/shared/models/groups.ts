export enum GroupCategory {
  ALL = 'all',
}

export interface AddGroupPayload {
  name: string;
  description: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  createdAtUtc: string;
  modifiedAtUtc: string;
  members: number;
}
