import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// DTO - Data Transfer Object
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
