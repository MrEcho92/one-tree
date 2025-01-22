import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { HTTPInstance } from '../core';
import { ApiResponse, ErrorResponse } from '../types/api';

export const useApiQuery = <TData>(
  queryKey: QueryKey,
  url: string,
  options?: UseQueryOptions<ApiResponse<TData>, ErrorResponse>,
) => {
  const { enqueueSnackbar } = useSnackbar();
  return useQuery<ApiResponse<TData>, ErrorResponse>({
    queryKey,
    queryFn: async () => {
      try {
        const { data } = await HTTPInstance.get<ApiResponse<TData>>(url);
        return data;
      } catch (error: any) {
        enqueueSnackbar(`Error fetching data: ${error.message}`, {
          variant: 'error',
        });
        throw error;
      }
    },
    ...options,
  });
};

export const useApiMutation = <TData, TVariables>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  options?: UseMutationOptions<ApiResponse<TData>, ErrorResponse, TVariables>,
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<ApiResponse<TData>, ErrorResponse, TVariables>({
    mutationFn: async (variables: TVariables) => {
      try {
        const response = await HTTPInstance.request<ApiResponse<TData>>({
          url,
          method,
          data: variables,
        });
        return response.data;
      } catch (error: any) {
        enqueueSnackbar(`Operation failed: ${error.message}`, {
          variant: 'error',
        });
        throw error;
      }
    },
    onSuccess: (data: ApiResponse<TData>) => {
      enqueueSnackbar(data.message || 'Operation successful', {
        variant: 'success',
      });
    },
    ...options,
  });
};
