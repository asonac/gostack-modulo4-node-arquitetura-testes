import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (request, response) =>
  response.json({ message: 'Hello GoStack!' }),
);

// routes.post('/users', (request, response) => {
//   const { name, email } = request.body;

//   const user = {
//     name,
//     email,
//   };

//   response.json(user);
// });

export default routes;
