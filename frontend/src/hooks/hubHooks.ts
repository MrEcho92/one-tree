import { useApiMutation, useApiQuery } from './base';
import { CulturalPost, UpdateCulturalPostPayload } from '../types';

export const useGetCulturalPosts = () => {
  return useApiQuery<CulturalPost[]>(['culturalPosts'], `/contexts`);
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
