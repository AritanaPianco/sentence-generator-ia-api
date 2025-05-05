import 'dotenv/config';
import '@/infra/config/container';

import fastify from 'fastify';
import { LoginRoute } from './users/login-route';
import { SignUpRoute } from './users/singup-route';

export const app = fastify({ logger: true });

// routes
app.register(SignUpRoute);
app.register(LoginRoute);

app.listen({ port: 3000 }, () => {
  console.log('Server is running!');
});
