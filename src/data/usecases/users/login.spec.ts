import { User } from '@/domain/entities/user';
import { UserToken } from '@/domain/entities/user-token';
import { FakeEncrypter } from '@/test/cryptography/faker-encrypter';
import { FakeHasher } from '@/test/cryptography/faker-hasher';
import { UsersRepositoryInMemory } from '@/test/in-memory/users-repository-in-memory';
import { UsersTokenRepositoryInMemory } from '@/test/in-memory/users-tokens-repository-in-memory';
import { LoginUseCase } from './login';

let usersRepository: UsersRepositoryInMemory;
let usersTokenRepository: UsersTokenRepositoryInMemory;
let bcryptAdapter: FakeHasher;
let jwtAdapter: FakeEncrypter;
let sut: LoginUseCase;

describe('Login UseCase', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokenRepository = new UsersTokenRepositoryInMemory();
    bcryptAdapter = new FakeHasher();
    jwtAdapter = new FakeEncrypter();
    sut = new LoginUseCase(
      usersRepository,
      usersTokenRepository,
      bcryptAdapter,
      jwtAdapter,
    );
  });

  test('should return 401 if email is not found', async () => {
    const response = await sut.execute({
      email: 'any_email',
      password: 'any_password',
    });

    if (typeof response === 'object') {
      expect(response.message).toEqual('Email não encontrado!');
      expect(response.status).toEqual(401);
    }
  });
  test('should return 401 if an invalid password is provided', async () => {
    const user = User.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    await usersRepository.create(user);
    const response = await sut.execute({
      email: 'any_email',
      password: 'wrong_password',
    });
    if (typeof response === 'object') {
      expect(response.message).toEqual('Senha inválida!');
      expect(response.status).toEqual(401);
    }
  });

  test('should return an accessToken on success', async () => {
    const user = User.create({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed-any_password',
    });

    const userToken = UserToken.create({
      userId: user.id,
      token: 'any_token',
    });

    await usersTokenRepository.create(userToken);

    await usersRepository.create(user);
    const response = await sut.execute({
      email: 'any_email',
      password: 'any_password',
    });

    expect(response).toEqual(`encrypted-${user.id}`);
  });
});
