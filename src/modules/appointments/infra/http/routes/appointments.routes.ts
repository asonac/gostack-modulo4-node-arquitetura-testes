import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppoinmentsController from '../controllers/ProviderAppoinmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppoinmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
