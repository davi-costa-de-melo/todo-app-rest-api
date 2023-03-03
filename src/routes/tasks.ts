import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { checkSessionIdIsValid } from '../middlewares/check-session-id-is-valid'
import { checkIdIsValid } from '../middlewares/check-id-is-valid'

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/', async (req) => {
    const { sessionId } = req.cookies

    const tasks = sessionId
      ? await knex('tasks').where('session_id', sessionId).select()
      : []

    return { tasks }
  })

  app.post('/', async (req, rep) => {
    const createTaskBodySchema = z.object({
      title: z.string(),
    })

    const body = createTaskBodySchema.safeParse(req.body)

    if (!body.success) {
      return rep.status(400).send({
        message: 'Invalid request body.',
        errors: body.error.issues,
      })
    }

    const { title } = body.data
    let { sessionId } = req.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      rep.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('tasks').insert({
      id: randomUUID(),
      session_id: sessionId,
      title,
    })

    return rep.status(201).send()
  })

  app.patch(
    '/:id',
    {
      preHandler: [checkSessionIdIsValid, checkIdIsValid],
    },
    async (req, rep) => {
      const markOrUnmarkTaskAsCompletedParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = markOrUnmarkTaskAsCompletedParamsSchema.parse(req.params)
      const { sessionId } = req.cookies

      const task = await knex('tasks')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      if (!task) {
        return rep.status(404).send({
          message: 'The task does not exist in the database.',
        })
      }

      const isTaskDone = task.done

      await knex('tasks').where('id', id).first().update({
        done: !isTaskDone,
      })

      return rep.status(204).send()
    },
  )

  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdIsValid, checkIdIsValid],
    },
    async (req, rep) => {
      const deleteTaskParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = deleteTaskParamsSchema.parse(req.params)
      const { sessionId } = req.cookies

      const task = await knex('tasks')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      if (!task) {
        return rep.status(404).send({
          message: 'The task does not exist in the database.',
        })
      }

      await knex('tasks').where('id', id).delete()

      return rep.status(204).send()
    },
  )

  app.delete(
    '/completed',
    {
      preHandler: [checkSessionIdIsValid],
    },
    async (req, rep) => {
      const { sessionId } = req.cookies

      await knex('tasks')
        .where({
          session_id: sessionId,
          done: true,
        })
        .delete()

      return rep.status(204).send()
    },
  )
}
