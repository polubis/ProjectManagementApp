import { Template } from 'shared/models';
import { core } from 'shared/instances';

const PATH = 'FavouriteTemplates';

export const getFavouriteTemplates = (
  query: string,
  limit: number,
  page: number
): Promise<Template[]> =>
  core.get<Template[]>(`${PATH}/Search`, { params: { query, limit, page } });

export const addTemplateToFavourites = (templateId: string): Promise<null> =>
  core.post(`${PATH}/AddToFavourites/${templateId}`, {});

export const removeTemplateFromFavourites = (templateId: string): Promise<null> =>
  core.delete(`${PATH}/RemoveFromFavourites/${templateId}`);
