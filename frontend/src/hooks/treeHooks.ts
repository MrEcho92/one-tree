import { useApiMutation, useApiQuery } from './base';
import {
  CreateFamilyTreePayload,
  FamilyTree,
  UpdateMemberPayload,
  Person,
  AddMemberPayload,
} from '../types/tree';

export const useGetFamilyTreesByUser = (userId: string) => {
  return useApiQuery<FamilyTree[]>(
    ['familyTrees', userId],
    `/trees/${userId}/user`,
    {
      queryKey: ['familyTrees', userId],
      enabled: !!userId,
    },
  );
};

export const useGetFamilyTrees = (treeId: string) => {
  return useApiQuery<FamilyTree>(
    ['familyTrees', treeId],
    `/trees/${treeId}/tree`,
    {
      queryKey: ['familyTrees', treeId],
      enabled: !!treeId,
    },
  );
};

export const useCreateFamilyTree = () => {
  return useApiMutation<FamilyTree, CreateFamilyTreePayload>('/trees', 'POST');
};

export const useUpdatePerson = (personId: string) => {
  return useApiMutation<Person, UpdateMemberPayload>(
    `/members/${personId}`,
    'PUT',
  );
};

export const useAddMemberFamilyTree = (treeId: string) => {
  return useApiMutation<FamilyTree, AddMemberPayload>(
    `/add-member-tree/${treeId}`,
    'POST',
  );
};
