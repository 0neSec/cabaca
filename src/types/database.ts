export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 0 | 1 | 2; // 0: admin, 1: user, 2: guest
  status: 0 | 1; // 0: inactive, 1: active
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  status: 0 | 1;
  created_at: string;
  updated_at: string;
}


export interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  category_id: number | null;
  status: number;
  created_at: string;
  updated_at: string;
  image:string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  category?: {
    id: number;
    name: string;
  };
}