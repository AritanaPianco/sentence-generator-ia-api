import 'dotenv/config';
import '@/infra/config/container';

import fastify from 'fastify';
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { LoginRoute } from './users/login-route';
import { SignUpRoute } from './users/singup-route';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// routes
app.register(SignUpRoute);
app.register(LoginRoute);

async function start() {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running! http://localhost:3000');
  } catch (err) {
    console.log(err);
  }
}

start();
