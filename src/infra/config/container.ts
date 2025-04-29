import 'reflect-metadata';
import { container } from 'tsyringe';

import { BcryptAdapter } from '../cryptography/bcrypt-adapter';
import { JwtAdapter } from '../cryptography/jwt-adapter';
import { UsersRepository } from '../repositories/users-repository';
import { UsersTokensRepository } from '../repositories/users-tokens-repository';

container.register('userRepository', UsersRepository);
container.register('userTokenRepository', UsersTokensRepository);

container.register('bcryptAdapter', BcryptAdapter);
container.register('jwtAdapter', JwtAdapter);
