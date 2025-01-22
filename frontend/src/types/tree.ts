export interface CreateTreeFormValues {
  name: string;
  description?: string;
  is_public: boolean;
  root_first_name: string;
  root_last_name: string;
  root_date_of_birth?: string;
  root_gender: string;
  father_first_name?: string;
  father_last_name?: string;
  father_date_of_birth?: string;
  father_gender?: string;
  father_is_alive?: boolean;
  mother_first_name?: string;
  mother_last_name?: string;
  mother_date_of_birth?: string;
  mother_gender?: string;
  mother_is_alive?: boolean;
}

export interface CreateFamilyTreePayload {
  name: string;
  description?: string;
  is_public: boolean;
  created_by: string;
  root_member: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    gender?: string;
  };
  father?: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    gender?: string;
    is_alive?: boolean;
  };
  mother?: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    gender?: string;
    is_alive?: boolean;
  };
}

export interface FamilyTree {
  id: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  name: string;
  is_public: boolean;
  description: string;
  collaborators: string[];
  members: string[];
}
