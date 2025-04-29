import type { User } from '@/domain/entities/user';
import type { UserRepository } from '@/domain/repositories/user-repository';
import { prisma } from '@/infra';
import { UsersMapper } from '../mappers/users-mapper';

export class UsersRepository implements UserRepository {
  async create(user: User): Promise<void> {
    const data = UsersMapper.toPrisma(user);
    await prisma.user.create({
      data,
    });
  }
  async findMany(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(UsersMapper.toDomain);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return UsersMapper.toDomain(user);
  }
}
