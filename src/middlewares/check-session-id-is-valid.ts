import { FastifyRequest, FastifyReply } from 'fastify'
import { isUUID } from '../utils/is-uuid'

export async function checkSessionIdIsValid(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { sessionId } = req.cookies

  if (!sessionId) {
    return rep.status(401).send({
      message: 'sessionId do not exists.',
    })
  }

  if (!isUUID(sessionId)) {
    return rep.status(401).send({
      message: 'sessionId is not a valid UUID.',
    })
  }
}
