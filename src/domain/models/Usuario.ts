export type UserRole = 'donante' | 'admin';

export interface Usuario {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: UserRole;
  profilePhoto?: string | null;
  createdAt: string;
}
