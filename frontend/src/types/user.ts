export type UserRole = 'user' | 'admin';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
}
