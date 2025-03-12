import { useApiMutation, useApiQuery } from './base';
import {
  CreateFamilyTreePayload,
  FamilyTree,
  UpdateMemberPayload,
  Person,
  AddMemberPayload,
  DeleteMemberPayload,
  AddStoryPayload,
  FamilyStory,
  UpdateStoryPayload,
} from '../types/tree';

export const useGetFamilyTreesByUser = (
  userId: string,
  collaborator?: string,
) => {
  return useApiQuery<FamilyTree[]>(
    ['familyTrees', userId],
    `/trees/${userId}/user${collaborator ? `?collaborator=${collaborator}` : null}`,
    {
      queryKey: ['familyTrees', userId],
      enabled: !!userId,
    },
  );
};

export const useGetFamilyTree = (treeId: string) => {
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

export const useUpdateMember = (personId: string) => {
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

export const useDeleteFamilyTree = (treeId: string) => {
  return useApiMutation<void, void>(`/trees/${treeId}`, 'DELETE');
};

export const useDeleteFamilyTreeMember = (treeId: string) => {
  return useApiMutation<void, DeleteMemberPayload>(
    `/trees/${treeId}/member`,
    'DELETE',
  );
};

export const useAddCollaborators = (treeId: string) => {
  return useApiMutation<FamilyTree, any>(`/add-collaborators/${treeId}`, 'PUT');
};

export const useUpdateTree = (treeId: string) => {
  return useApiMutation<FamilyTree, UpdateMemberPayload>(
    `/trees/${treeId}`,
    'PUT',
  );
};

export const useGetFamilyStories = (treeId: string) => {
  return useApiQuery<FamilyStory[]>(
    ['familyStories', treeId],
    `/stories/${treeId}`,
    {
      queryKey: ['familyStories', treeId],
      enabled: !!treeId,
    },
  );
};

export const useGetFamilyStoriesById = (storyId: string) => {
  return useApiQuery<FamilyStory>(
    ['familyStories', storyId],
    `/stories/${storyId}/story`,
    {
      queryKey: ['familyStories', storyId],
      enabled: !!storyId,
    },
  );
};

export const useCreateStory = () => {
  return useApiMutation<FamilyStory, AddStoryPayload>('/stories', 'POST');
};

export const useUpdateStory = (storyId: string) => {
  return useApiMutation<Person, UpdateStoryPayload>(
    `/stories/${storyId}`,
    'PUT',
  );
};

export const useDeleteFamilyStory = (storyId: string) => {
  return useApiMutation<void, void>(`/stories/${storyId}`, 'DELETE');
};
