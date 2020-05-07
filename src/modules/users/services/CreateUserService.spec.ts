import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

// Um teste unitário, não produz nenhum efeito colateral, não esta ligado a nenuma outra camada
describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same e-mail address', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const emailDuplicado = 'johndoe@example2.com';

    await createUser.execute({
      name: 'John Doe',
      email: emailDuplicado,
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: emailDuplicado,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
