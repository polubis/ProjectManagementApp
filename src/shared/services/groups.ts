import { core } from 'shared/instances';
import { AddGroupPayload, Group, GetGroupsParams } from 'shared/models';

const PATH = 'Groups';

export const addGroup = (payload: AddGroupPayload): Promise<string> =>
  core.post<AddGroupPayload, string>(`${PATH}/Create`, payload);

export const getGroups = (params: GetGroupsParams): Promise<Group[]> =>
  core.get<Group[]>(`${PATH}/SearchGroups`, { params });
