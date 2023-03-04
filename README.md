# REST API For Todo App ✅

REST API designed to be consumed by [this todo app](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW), which I will develop soon. This will be my first FULLSTACK APLICATION!

## How It Works? 🛠️

In the database, there is only the task table. Each task is represented by an object that contains the following data.

```json
{
  "id": "12345678-abcd-abcd-abcd-123456789abc",
  "session_id": "1234abcd-123e-456f-abcd-abcd123456789",
  "title": "My task",
  "done": false
}
```

- `id`: UUID that identifies the task in the database (primary key).
- `session_id`: UUID that identifies the session to which the task belongs.
- `title`: Text that identifies the task's title.
- `done`: boolean that identifies if the task was done.

When you create a task, a sessionId cookie is set. This cookie is used to identify your tasks in the database. You can only search, update and delete your own tasks.

If there is an error in sending the data, there will be no update in the database, only a message will be sent with the description of the error that occurred.

## Routes 🔀

### `GET /tasks`

Returns all your tasks in the response body in the following format.

```json
{
  "tasks": [
    // your tasks here
  ]
}
```

If the sessionId cookie is not set, the tasks property will be an empty list.

### `POST /tasks`

Creates a task according to the information you send in the request body. The information must be in the following format.

```json
{
  "title": "New task"
}
```

You only need to send the title of your task, any other information will be ignored. If the sessionId cookie is not set, it will be set as soon as you create the task.

### `PATCH /tasks/:id`

Toggles the done information on a specific task. You only need to send the task id as a route parameter.

If the task is not found, no update will be made to the database, only a message will be sent stating that the task does not exist.

**Remember that you can only manipulate your tasks, tasks that do not have session_id information equal to your sessionId cookie will be ignored.**

### `DELETE /tasks/:id`

Deletes a specific task. You only need to send the task id as a route parameter.

If the task is not found, no update will be made to the database, only a message will be sent stating that the task does not exist.

**Remember that you can only manipulate your tasks, tasks that do not have session_id information equal to your sessionId cookie will be ignored.**

### `DELETE /tasks/completed`

Deletes all done tasks. If you don't have done tasks, no updates are made to the database and no error messages are sent.

**Remember that you can only manipulate your tasks, tasks that do not have session_id information equal to your sessionId cookie will be ignored.**

## Technologies Used 👨‍💻

- `nodejs`
- `fastify`
- `typescript`
- `zod`
- `knexjs`
- `sqlite`
- `vitest`
- `eslint`
- `tsx`
- `tsup`