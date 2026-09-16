// Allowed roles definition
export type UserRole = 'admin' | 'user' | 'owner';

// Main User Entity
export interface User {
  id: number;
  name: string;
  identification: string;
  role: UserRole;
  phone?: string | null;
  email: string;
  password?: string;
  createdAt?: Date;
}
