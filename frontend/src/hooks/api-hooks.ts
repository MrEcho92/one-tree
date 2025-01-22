import { useApiQuery, useApiMutation } from './base';
import { User, PaginatedResponse } from '../types/api';
import queryClient from '../core/http/react-query';

// Specific API hooks
export const useUsers = (page = 1, limit = 10) => {
  return useApiQuery<PaginatedResponse<User>>(
    ['users', page, limit],
    `/users?page=${page}&limit=${limit}`,
  );
};

export const useUser = (id: number) => {
  return useApiQuery<User>(['user', id], `/users/${id}`);
};

export const useLogin = () => {
  return useApiMutation<any, any>('/auth/login', 'POST', {
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    },
  });
};

export const useUpdateUser = () => {
  return useApiMutation<User, Partial<User>>('/users', 'PUT', {
    onSuccess: () => {
      // Invalidate and refetch user queries
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
