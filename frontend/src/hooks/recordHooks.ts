import { useApiMutation, useApiQuery } from './base';
import {
  MigrationRecord,
  CreateMigrationRecordPayload,
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
