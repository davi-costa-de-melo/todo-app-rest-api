import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { isUUID } from '../utils/is-uuid'

export async function checkIdIsValid(req: FastifyRequest, rep: FastifyReply) {
  const requestParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = requestParamsSchema.parse(req.params)

  if (!id) {
    return rep.status(400).send({
      message: 'id is required.',
    })
  }

  if (!isUUID(id)) {
    return rep.status(400).send({
      message: 'id is not a valid UUID.',
    })
  }
}
