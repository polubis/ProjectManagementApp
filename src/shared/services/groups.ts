import { core } from 'shared/instances';
import { AddGroupPayload } from 'shared/models';

const PATH = 'Groups';

export const addGroup = (payload: AddGroupPayload): Promise<string> =>
  core.post<AddGroupPayload, string>(`${PATH}/Create`, payload);
