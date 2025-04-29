import type { UserToken } from '../entities/user-token.js';

export interface UserTokenRepository {
  create(userToken: UserToken): Promise<void>;
  findByToken(token: string): Promise<UserToken | null>;
  updateAccessToken(userId: string, token: string): Promise<void>;
}
