import { SingUpUseCase } from '@/data/usecases/users/singup';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { container } from 'tsyringe';
import z from 'zod';

export async function SignUpRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/singup',
    {
      schema: {
        body: z.object({
          name: z.string({ required_error: 'O nome é obrigatório' }),
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
      const singUpUseCase = container.resolve(SingUpUseCase);

      const { email, name, password } = request.body;

      const response = await singUpUseCase.execute({ name, email, password });

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
