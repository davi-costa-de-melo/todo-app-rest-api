import fastify from 'fastify'
import { tasksRoutes } from './routes/tasks'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cookie)
app.register(cors)
app.register(tasksRoutes, {
  prefix: 'tasks',
})
