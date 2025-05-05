import type { User } from '@/domain/entities/user';
import type { UserRepository } from '@/domain/repositories/user-repository';

export class UsersRepositoryInMemory implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
  async findMany(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
