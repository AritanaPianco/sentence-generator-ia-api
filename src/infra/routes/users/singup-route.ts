import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { container } from 'tsyringe';
import z from 'zod';

export async function SignUpRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
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
    async (request, reply) => {},
  );
}
