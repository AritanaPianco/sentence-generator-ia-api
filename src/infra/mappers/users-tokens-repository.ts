import { UserToken } from '@/domain/entities/user-token';
import type { Prisma, UserToken as PrismaUserToken } from '@prisma/client';

export class UsersTokensMapper {
  static toDomain(raw: PrismaUserToken): UserToken {
    return UserToken.create(
      {
        userId: raw.userId,
        token: raw.token,
      },
      raw.id,
    );
  }

  static toPrisma(userToken: UserToken): Prisma.UserTokenUncheckedCreateInput {
    return {
      id: userToken.id,
      userId: userToken.userId,
      token: userToken.token,
    };
  }
}
