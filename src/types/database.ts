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
