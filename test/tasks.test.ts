import { describe, beforeAll, beforeEach, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'
import { app } from '../src/app'

describe('Tasks Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a task', async () => {
    await request(app.server)
      .post('/tasks')
      .send({
        title: 'New task',
      })
      .expect(201)
  })

  it('should be able to list all tasks', async () => {
    const createTaskResponse = await request(app.server).post('/tasks').send({
      title: 'New task',
    })

    const cookies = createTaskResponse.get('Set-Cookie')

    const listTasksResponse = await request(app.server)
      .get('/tasks')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTasksResponse.body.tasks).toEqual([
      expect.objectContaining({
        title: 'New task',
        done: 0,
      }),
    ])
  })

  it('should be able to mark and unmark a specific task as done', async () => {
    const createTaskResponse = await request(app.server).post('/tasks').send({
      title: 'New task',
    })

    const cookies = createTaskResponse.get('Set-Cookie')

    const listTasksResponse = await request(app.server)
      .get('/tasks')
      .set('Cookie', cookies)

    const { id: taskId } = listTasksResponse.body.tasks[0]

    await request(app.server)
      .patch(`/tasks/${taskId}`)
      .set('Cookie', cookies)
      .expect(204)

    const listTasksAfterASpecificTaskHasBeenMarkedAsDoneResponse =
      await request(app.server).get('/tasks').set('Cookie', cookies)

    expect(
      listTasksAfterASpecificTaskHasBeenMarkedAsDoneResponse.body.tasks,
    ).toEqual([
      expect.objectContaining({
        title: 'New task',
        done: 1,
      }),
    ])

    await request(app.server)
      .patch(`/tasks/${taskId}`)
      .set('Cookie', cookies)
      .expect(204)

    const listTasksAfterASpecificTaskHasBeenUnmarkedAsDoneResponse =
      await request(app.server).get('/tasks').set('Cookie', cookies)

    expect(
      listTasksAfterASpecificTaskHasBeenUnmarkedAsDoneResponse.body.tasks,
    ).toEqual([
      expect.objectContaining({
        title: 'New task',
        done: 0,
      }),
    ])
  })

  it('should be able to delete a specific task', async () => {
    const createTaskResponse = await request(app.server).post('/tasks').send({
      title: 'New task',
    })

    const cookies = createTaskResponse.get('Set-Cookie')

    const listTasksResponse = await request(app.server)
      .get('/tasks')
      .set('Cookie', cookies)

    const { id: taskId } = listTasksResponse.body.tasks[0]

    await request(app.server)
      .delete(`/tasks/${taskId}`)
      .set('Cookie', cookies)
      .expect(204)

    const listTasksAfterASpecificTaskHasBeenDeletedResponse = await request(
      app.server,
    )
      .get('/tasks')
      .set('Cookie', cookies)

    expect(
      listTasksAfterASpecificTaskHasBeenDeletedResponse.body.tasks,
    ).toEqual([])
  })

  it('should be able to delete all done tasks', async () => {
    const createTaskResponse = await request(app.server).post('/tasks').send({
      title: 'First task',
    })

    const cookies = createTaskResponse.get('Set-Cookie')

    await request(app.server).post('/tasks').set('Cookie', cookies).send({
      title: 'Second task',
    })

    await request(app.server).post('/tasks').set('Cookie', cookies).send({
      title: 'Third task',
    })

    const listTasksResponse = await request(app.server)
      .get('/tasks')
      .set('Cookie', cookies)

    const { id: firstTaskId } = listTasksResponse.body.tasks[0]
    const { id: secondTaskId } = listTasksResponse.body.tasks[1]

    await request(app.server)
      .patch(`/tasks/${firstTaskId}`)
      .set('Cookie', cookies)

    await request(app.server)
      .patch(`/tasks/${secondTaskId}`)
      .set('Cookie', cookies)

    await request(app.server)
      .delete('/tasks/completed')
      .set('Cookie', cookies)
      .expect(204)

    const listTasksAfterDoneTasksHaveBeenDeletedResponse = await request(
      app.server,
    )
      .get('/tasks')
      .set('Cookie', cookies)

    expect(listTasksAfterDoneTasksHaveBeenDeletedResponse.body.tasks).toEqual([
      expect.objectContaining({
        title: 'Third task',
        done: 0,
      }),
    ])
  })
})
