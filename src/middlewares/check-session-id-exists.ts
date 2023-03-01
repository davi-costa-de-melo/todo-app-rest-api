import { FastifyRequest, FastifyReply } from 'fastify'

export async function checkSessionIdExists(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { sessionId } = req.cookies

  if (!sessionId) {
    return rep.status(401).send({
      message: 'sessionId do not exists.',
    })
  }
}
