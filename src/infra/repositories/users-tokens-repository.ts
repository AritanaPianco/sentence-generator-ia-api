import type { UserToken } from '@/domain/entities/user-token';
import type { UserTokenRepository } from '@/domain/repositories/user-token-repository';
import { prisma } from '@/infra';
import { UsersTokensMapper } from '../mappers/users-tokens-repository';

export class UsersTokensRepository implements UserTokenRepository {
  async create(userToken: UserToken): Promise<void> {
    const data = UsersTokensMapper.toPrisma(userToken);
    await prisma.userToken.create({
      data,
    });
  }
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        token: token,
      },
    });

    if (!userToken) {
      return null;
    }

    return UsersTokensMapper.toDomain(userToken);
  }
  async updateAccessToken(userId: string, token: string): Promise<void> {
    await prisma.userToken.update({
      where: {
        userId: userId,
      },
      data: {
        token: token,
      },
    });
  }
}
