import { UserToken } from '@/domain/entities/user-token';
import type { UserTokenRepository } from '@/domain/repositories/user-token-repository';

export class UsersTokenRepositoryInMemory implements UserTokenRepository {
  private usersToken: UserToken[] = [];

  async create(userToken: UserToken): Promise<void> {
    this.usersToken.push(userToken);
  }
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = this.usersToken.filter(
      (userToken) => userToken.token === token,
    );
    if (!userToken[0]) {
      return null;
    }

    return userToken[0];
  }
  async updateAccessToken(userId: string, token: string): Promise<void> {
    const index = this.usersToken.findIndex((user) => user.id === userId);
    const userToken = this.usersToken[index];
    const updatedUserToken = UserToken.create(
      { userId: userToken.id, token: token },
      userToken.id,
    );
    this.usersToken[index] = updatedUserToken;
  }
}
