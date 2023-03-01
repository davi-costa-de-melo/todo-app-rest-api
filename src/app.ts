import fastify from 'fastify'
import { tasksRoutes } from './routes/tasks'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)
app.register(tasksRoutes, {
  prefix: 'tasks',
})
