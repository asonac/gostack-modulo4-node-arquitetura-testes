import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notificantion';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
