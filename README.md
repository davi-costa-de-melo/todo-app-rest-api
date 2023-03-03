# REST API for TODO APP

API designed to be used in a simple task application. Soon, this other application will be developed and we will be able to see both in action. This will be my first FULLSTACK PROJECT!

## Routes ✅

- `GET /tasks`: Lists all tasks that have `session_id` information equal to the `sessionId` cookie sent in the request. If the `sessionId` cookie is not sent, it returns an empty list.

- `POST /tasks`: Creates a task based on the request body. In the body of the request there must be an `object` with the `title` property, which must be a `string`. `title` will be the title of your task. If the `sessionId` cookie is not sent, this cookie is set at creation time and the new task is added to the task list, but if it is sent, the new task is just added to your task list.

- `PATCH /tasks/:id`: Marks or unmarks a task as done. `id` is the `id` of the task to be updated. If there is any error, it returns a message with the description of the error that occurred.

- `DELETE /tasks/:id`: Deletes a task. `id` is the `id` of the task to be deleted. If there is any error, it returns a message with the description of the error that occurred.

- `DELETE /tasks/completed`: Deletes all tasks that have `session_id` information equal to the `sessionId` cookie sent in the request and `done` information equal to `true`. If there is any error, it returns a message with the description of the error that occurred.

## Technologies Used 🚀

- `nodejs`
- `fastify`
- `typescript`
- `tsx`
- `knexjs`
- `zod`
- `eslint`
- `sqlite`
- `vitest`
- `tsup`