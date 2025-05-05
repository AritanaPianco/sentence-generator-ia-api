import { Unauthorized } from '@/data/errors/unauthorized';
import { unauthorized } from '@/data/helpers/http-errors';
import type { Encrypter } from '@/domain/cryptography/encrypter';
import type { Hash } from '@/domain/cryptography/hash';
import type { UserRepository } from '@/domain/repositories/user-repository';
import type { UserTokenRepository } from '@/domain/repositories/user-token-repository';
import { inject, injectable } from 'tsyringe';

type LoginRequest = {
  email: string;
  password: string;
};

@injectable()
export class LoginUseCase {
  constructor(
    @inject('userRepository')
    private readonly usersRepository: UserRepository,
    @inject('userTokenRepository')
    private readonly usersTokensRepository: UserTokenRepository,
    @inject('bcryptAdapter')
    private readonly hash: Hash,
    @inject('jwtAdapter')
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ email, password }: LoginRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return unauthorized(new Unauthorized('Email não encontrado!'));
    }

    const isPasswordValid = await this.hash.compare(password, user.password);

    if (!isPasswordValid) {
      return unauthorized(new Unauthorized('Senha inválida!'));
    }
    const token = await this.encrypter.encrypt(user.id);
    await this.usersTokensRepository.updateAccessToken(user.id, token);
    return token;
  }
}
