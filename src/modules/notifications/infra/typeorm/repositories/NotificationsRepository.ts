import { getRepository, Repository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notificantion from '../schemas/Notificantion';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: Repository<Notificantion>;

  constructor() {
    this.ormRepository = getRepository(Notificantion, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notificantion> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
