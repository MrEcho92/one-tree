import { useApiMutation, useApiQuery } from './base';
import { CulturalPost, CulturalContextResponse } from '../types';

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

export const useGetCulturalPostsByUser = (userId: string) => {
  return useApiQuery<CulturalPost[]>(
    ['culturalPosts', userId],
    `/contexts/${userId}/user`,
    {
      queryKey: ['culturalPosts', userId],
      enabled: !!userId,
    },
  );
};

export const useAllGetCulturalPosts = () => {
  return useApiQuery<CulturalPost[]>(['culturalPosts'], `/contexts/admin`);
};

export const useGetCulturalPostsById = (contextId: string) => {
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
  return useApiMutation<CulturalPost, FormData>('/contexts', 'POST');
};

export const useUpdateCulturalPost = (contextId: string) => {
  return useApiMutation<CulturalPost, FormData>(
    `/contexts/${contextId}/update`,
    'PUT',
  );
};

export const useDeleteCulturalPost = (contextId: string) => {
  return useApiMutation<void, void>(`/contexts/${contextId}`, 'DELETE');
};
