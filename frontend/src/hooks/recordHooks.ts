import { useApiMutation, useApiQuery } from './base';
import {
  MigrationRecord,
  CreateMigrationRecordPayload,
  UpdateMigrationRecordPayload,
} from '../types/migration';

export const useCreateMigrationRecord = () => {
  return useApiMutation<MigrationRecord, CreateMigrationRecordPayload>(
    '/migration-records',
    'POST',
  );
};

export const useGetMigrationRecord = (recordId: string) => {
  return useApiQuery<MigrationRecord>(
    ['migrationRecords', recordId],
    `/migration-records/${recordId}`,
    {
      queryKey: ['migrationRecords', recordId],
      enabled: !!recordId,
    },
  );
};

export const useGetMigrationRecordByUser = (userId: string) => {
  return useApiQuery<MigrationRecord[]>(
    ['migrationRecords', userId],
    `/migration-records/${userId}/user`,
    {
      queryKey: ['migrationRecords', userId],
      enabled: !!userId,
    },
  );
};

export const useUpdateMigrationRecord = (recordId: string) => {
  return useApiMutation<MigrationRecord, UpdateMigrationRecordPayload>(
    `/migration-records/${recordId}`,
    'PUT',
  );
};

export const useDeleteMigrationRecord = (recordId: string) => {
  return useApiMutation<void, void>(`/migration-records/${recordId}`, 'DELETE');
};
