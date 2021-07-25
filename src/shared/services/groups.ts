import { core } from 'shared/instances';
import { AddGroupPayload, EditGroupPayload, Group, GetGroupsParams } from 'shared/models';

const PATH = 'Groups';

export const addGroup = (payload: AddGroupPayload): Promise<string> =>
  core.post<AddGroupPayload, string>(`${PATH}/Create`, payload);

export const editGroup = (id: string, payload: EditGroupPayload): Promise<string> =>
  core.put<EditGroupPayload, string>(`${PATH}/Update/${id}`, payload);

export const getGroups = (params: GetGroupsParams): Promise<Group[]> =>
  core.get<Group[]>(`${PATH}/SearchGroups`, { params });

export const getGroup = (id: string): Promise<Group> => core.get<Group>(`${PATH}/Get/${id}`);
