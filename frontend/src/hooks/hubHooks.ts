import { useApiMutation, useApiQuery } from './base';
import {
  CulturalPost,
  UpdateCulturalPostPayload,
  CulturalContextResponse,
} from '../types';

export const useGetCulturalPosts = (
  query: string = '',
  page: number = 1,
  limit: number = 10,
) => {
  // Only add parameters that have values
  const params = new URLSearchParams();

  if (query.trim()) {
    params.append('q', query.trim());
  }

  params.append('page', page.toString());
  params.append('limit', limit.toString());
  params.append('latest', 'true');

  const queryString = params.toString();

  return useApiQuery<CulturalContextResponse>(
    ['culturalPosts', query, page, limit],
    `/contexts?${queryString ? queryString : ''}`,
  );
};

export const useGetCulturalPostsByUser = (contextId: string) => {
  return useApiQuery<CulturalPost[]>(
    ['culturalPosts', contextId],
    `/contexts/${contextId}/post`,
    {
      queryKey: ['culturalPosts', contextId],
      enabled: !!contextId,
    },
  );
};

export const useCreateCulturalPost = () => {
  return useApiMutation<CulturalPost, any>('/contexts', 'POST');
};

export const useUpdateCulturalPost = (contextId: string) => {
  return useApiMutation<CulturalPost, UpdateCulturalPostPayload>(
    `/contexts/${contextId}/update`,
    'PUT',
  );
};

export const useDeleteCulturalPost = (contextId: string) => {
  return useApiMutation<void, void>(`/contexts/${contextId}`, 'DELETE');
};
