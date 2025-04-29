import type { User } from '../entities/user.js';

export interface UserRepository {
  create(user: User): Promise<void>;
  findMany(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}
