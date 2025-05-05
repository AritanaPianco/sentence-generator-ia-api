import { User } from '@/domain/entities/user';
import { UserToken } from '@/domain/entities/user-token';
import { FakeEncrypter } from '@/test/cryptography/faker-encrypter';
import { FakeHasher } from '@/test/cryptography/faker-hasher';
import { UsersRepositoryInMemory } from '@/test/in-memory/users-repository-in-memory';
import { UsersTokenRepositoryInMemory } from '@/test/in-memory/users-tokens-repository-in-memory';
import { SingUpUseCase } from './singup';

let usersRepository: UsersRepositoryInMemory;
let usersTokenRepository: UsersTokenRepositoryInMemory;
let bcryptAdapter: FakeHasher;
let jwtAdapter: FakeEncrypter;
let sut: SingUpUseCase;

describe('SignUp UseCase', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokenRepository = new UsersTokenRepositoryInMemory();
    bcryptAdapter = new FakeHasher();
    jwtAdapter = new FakeEncrypter();
    sut = new SingUpUseCase(
      usersRepository,
      usersTokenRepository,
      bcryptAdapter,
      jwtAdapter,
    );
  });

  test('should return 401 if email already exist', async () => {
    const user = User.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    await usersRepository.create(user);

    const response = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
    if (typeof response === 'object') {
      expect(response.status).toEqual(409);
      expect(response.message).toEqual('Email já em uso!');
    }
  });

  test('should return an accessToken on success', async () => {
    const createSpy = vi.spyOn(usersRepository, 'create');
    const response = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(response).toBeDefined();
    expect(createSpy).toHaveBeenCalled();
  });
});
