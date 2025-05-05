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
      expect(response.status).toEqual(401);
      expect(response.message).toEqual('Email não encontrado!');
    }
  });
});
