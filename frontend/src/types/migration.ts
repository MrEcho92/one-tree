export interface MigrationEvent {
  year: string;
  event: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

export interface MigrationRecord {
  id: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  title: string;
  description: string;
  tree_id: string;
  timeline: MigrationEvent[];
  media: string[];
}

export interface CreateMigrationRecordPayload {
  title: string;
  description: string;
  created_by: string;
}

export interface UpdateMigrationRecordPayload {
  title?: string;
  description?: string;
  updated_by: string;
  media?: string[];
  timeline?: MigrationEvent[];
}
