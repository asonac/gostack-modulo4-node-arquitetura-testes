import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// Nos serviços ficam as regras de negócio

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

// Conceito de DTO - data transfer object
interface IRequest {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 *
 * # Single Responsability Principle
 * Open Closed Principle
 * # Liskov Substitution Principle
 * Interface Segragation Principle
 * # Dependency Invertion Principle
 */

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
