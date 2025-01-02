import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from '@tanstack/react-query';
import { HTTPInstance } from '../core';
import { ApiResponse, ErrorResponse } from '../types/api';

export const useApiQuery = <TData>(
  queryKey: QueryKey,
  url: string,
  options?: UseQueryOptions<ApiResponse<TData>, ErrorResponse>,
) => {
  return useQuery<ApiResponse<TData>, ErrorResponse>({
    queryKey,
    queryFn: async () => {
      const { data } = await HTTPInstance.get<ApiResponse<TData>>(url);
      return data;
    },
    ...options,
  });
};

export const useApiMutation = <TData, TVariables>(
  url: string,
  options?: UseMutationOptions<ApiResponse<TData>, ErrorResponse, TVariables>,
) => {
  return useMutation<ApiResponse<TData>, ErrorResponse, TVariables>({
    mutationFn: async (variables) => {
      const { data } = await HTTPInstance.post<ApiResponse<TData>>(
        url,
        variables,
      );
      return data;
    },
    ...options,
  });
};
