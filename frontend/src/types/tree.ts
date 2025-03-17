export interface CreateTreeFormValues {
  name: string;
  description?: string;
  is_public: boolean;
  root_first_name: string;
  root_last_name: string;
  root_date_of_birth?: string;
  root_gender: string;
  father_first_name: string;
  father_last_name: string;
  father_date_of_birth: string | null;
  father_gender?: string;
  father_is_alive?: boolean;
  mother_first_name: string;
  mother_last_name: string;
  mother_date_of_birth: string | null;
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
    date_of_birth: string | null;
    gender?: string;
    is_alive?: boolean;
  };
  mother?: {
    first_name?: string;
    last_name?: string;
    date_of_birth: string | null;
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
  members: Person[];
}

export interface Person {
  id: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  last_name_at_birth?: string;
  date_of_birth?: string;
  gender?: string;
  is_alive?: boolean;
  birth_place?: string;
  death_date?: string;
  bio?: string;
  photo_url?: string;
  father_id?: string;
  mother_id?: string;
  spouse_id?: any[];
  children_id?: any[];
  sibling_id?: any[];
  tree_id: string;
  created_by?: string;
  updated_by?: string;
}

export interface AddMemberTreeForm {
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender: string;
}

export interface UpdateMemberPayload {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  last_name_at_birth?: string;
  date_of_birth?: string;
  gender?: string;
  is_alive?: boolean;
  birth_place?: string;
  death_date?: string;
  bio?: string;
  photo_url?: string;
  updated_by?: string;
}

export interface AddMemberPayload {
  member: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    created_by: string;
  };
  relation: {
    primary_user_id: string;
    primary_user_gender: string;
    rel: string;
    primary_spouse_id?: string;
    primary_spouse_gender?: string;
    primary_children_id?: string[];
  };
}

export interface MemberId {
  id: string;
  fullName: string;
  gender: string;
}

export interface DeleteMemberPayload {
  delete_member_id: string;
  root_id: string;
}

export interface UpdateTreePayload {
  name?: string;
  description?: string;
  is_public?: boolean;
  collaborators?: string[];
  updated_by?: string;
}

export interface AddCollaboratorsPayload {
  collaborators: string[];
}

export interface AddStoryPayload {
  title: string;
  content: string;
  tags?: string[];
  is_public: boolean;
  media_url?: string;
  created_by: string;
  tree_id: string;
}

export interface FamilyStory {
  id: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  title: string;
  content: string;
  tags?: string[];
  is_public: boolean;
  media_url?: string;
  tree_id: string;
}

export interface UpdateStoryPayload {
  title?: string;
  content?: string;
  tags?: string[];
  is_public?: boolean;
  media_url?: string;
  updated_by?: string;
}

export interface StoryForm {
  title: string;
  content: string;
  tags: string[];
  is_public: boolean;
}
