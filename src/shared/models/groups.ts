export enum GroupCategory {
  ALL = 'all',
}

export interface AddGroupPayload {
  name: string;
  description: string;
}

export type EditGroupPayload = AddGroupPayload;

export interface Group {
  id: string;
  name: string;
  thumbnailUrl: string;
  description: string;
  createdAtUtc: string;
  modifiedAtUtc: string;
  membersCount: number;
  topicsCount: number;
  templatesCount: number;
}

export interface GetGroupsParams {
  limit: number;
  page: number;
  query: string;
}
