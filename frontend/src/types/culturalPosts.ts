export enum ContextStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface CulturalPost {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  title: string;
  content: string;
  video_url?: string;
  image_url?: string;
  audio_url?: string;
  link_url?: string;
  tags: string[];
  status: ContextStatus;
}

export interface CreateCulturalPost {
  created_by: string;
  title: string;
  content: string;
  video_url?: string;
  image_url?: string;
  audio_url?: string;
  link_url?: string;
  tags?: string[];
}

export interface UpdateCulturalPostPayload {
  updated_by: string;
  title?: string;
  content?: string;
  video_url?: string;
  image_url?: string;
  audio_url?: string;
  link_url?: string;
  tags?: string[];
}

export interface CreateCulturalFormValues {
  title: string;
  content: string;
  tags: string[];
  media: FormData & string;
  link_url: string;
  status: ContextStatus;
}

export interface CulturalContextResponse {
  cultural_context: CulturalPost[];
  total_items: number;
  total_pages: number;
  current_page: number;
}
