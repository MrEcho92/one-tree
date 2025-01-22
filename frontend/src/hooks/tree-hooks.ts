import { useApiMutation, useApiQuery } from './base';
import { CreateFamilyTreePayload, FamilyTree } from '../types/tree';

export const useGetFamilyTrees = (userId: string) => {
  return useApiQuery<FamilyTree[]>(
    ['familyTrees', userId],
    `/trees/${userId}`,
    {
      queryKey: ['familyTrees', userId],
      enabled: !!userId,
    },
  );
};

export const useCreateFamilyTree = () => {
  return useApiMutation<FamilyTree, CreateFamilyTreePayload>('/trees', 'POST');
};
