import { LoginUseCase } from '@/data/usecases/users/login';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { container } from 'tsyringe';
import z from 'zod';

export async function LoginRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/login',
    {
      schema: {
        body: z.object({
          email: z
            .string({ required_error: 'O Email é obrigatorio' })
            .email({ message: 'O email deve ser válido' }),
          password: z
            .string({ required_error: 'A senha é obrigatória' })
            .min(4, { message: 'A senha deve conter no mínimo 4 caracteres' }),
        }),
      },
    },
    async (request, reply) => {
      const loginUseCase = container.resolve(LoginUseCase);

      const { email, password } = request.body;

      const response = await loginUseCase.execute({ email, password });

      if (typeof response === 'object') {
        reply.status(response.status).send({
          message: response.message,
        });
      }

      reply.status(200).send({
        accessToken: response,
      });
    },
  );
}
