import { useApiMutation } from './base';

export const useSetAdminRole = () => {
  return useApiMutation<any, any>('/admin/set-user-roles', 'POST');
};
