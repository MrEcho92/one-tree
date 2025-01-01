export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}
