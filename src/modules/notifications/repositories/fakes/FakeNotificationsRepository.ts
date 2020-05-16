import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notificantion from '../../infra/typeorm/schemas/Notificantion';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notificantion[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notificantion> {
    const notification = new Notificantion();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
