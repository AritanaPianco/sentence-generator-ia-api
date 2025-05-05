import { Conflict } from '@/data/errors/conflict-error.js';
import { conflict } from '@/data/helpers/http-errors.js';
import type { Encrypter } from '@/domain/cryptography/encrypter.js';
import type { Hash } from '@/domain/cryptography/hash.js';
import { UserToken } from '@/domain/entities/user-token.js';
import { User } from '@/domain/entities/user.js';
import type { UserRepository } from '@/domain/repositories/user-repository.js';
import type { UserTokenRepository } from '@/domain/repositories/user-token-repository.js';
import { inject, injectable } from 'tsyringe';

type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

@injectable()
export class SingUpUseCase {
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

  async execute({ name, email, password }: SignUpRequest) {
    const existentUser = await this.usersRepository.findByEmail(email);

    if (existentUser) {
      return conflict(new Conflict('Email já em uso!'));
    }

    const hashedPassword = await this.hash.hash(password);
    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);
    const token = await this.encrypter.encrypt(user.id);
    const userToken = UserToken.create({ userId: user.id, token });

    await this.usersTokensRepository.create(userToken);
    return token;
  }
}
