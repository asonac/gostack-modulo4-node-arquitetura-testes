import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppoitmentService from './CreateAppointmentService';

// Um teste unitário, não produz nenhum efeito colateral, não esta ligado a nenuma outra camada
describe('CreateAppoitment', () => {
  let fakeAppoinmentsRepository: FakeAppointmentsRepository;
  let createAppointment: CreateAppoitmentService;
  let fakeNotificationsRepository: FakeNotificationsRepository;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    fakeAppoinmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppoitmentService(
      fakeAppoinmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const dateToday = new Date(Date.now());
    dateToday.setHours(10);

    const appointmentDate = new Date(
      dateToday.getFullYear(),
      dateToday.getMonth(),
      dateToday.getDate() + 2,
      dateToday.getHours(),
      dateToday.getMinutes(),
      dateToday.getSeconds(),
    );

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 22, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 22, 11),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with the same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 22, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 25, 11),
        provider_id: 'user-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 28, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 29, 7),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 29, 18),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
