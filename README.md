# REST API for TODO APP

API designed to be used in a simple task application. Soon, this other application will be developed and we will be able to see both in action. This will be my first FULLSTACK PROJECT!

## Features ✅

- `List all tasks`: You can list all tasks by making a request with the GET method to "/tasks". You will receive tasks according to your "sessionId" cookie, this cookie is set when you create a new task, if you don't have it, you will receive an empty list.

- `Create a new task`: You can create tasks by making a request with the POST method to "/tasks" sending an object with the title property, which will be the title of your task, in the body of the request. If you don't have the "sessionId" cookie, that cookie is set for you, but if you do, the new task is added to your task list.

- `Mark and unmark a task as done`: You can mark and unmark a task as done by making a request with the PATCH method to "/tasks/:id". "id" in this case is the id of your task. You can only do this with the tasks on your task list, that is, with the tasks that have the "session_id" information equal to your "sessionId" cookie.

- `Delete a task`: You can delete a task by making a request with the DELETE method to "/tasks/:id". "id" in this case is the id of your task. You can only do this with the tasks in your task list, that is, with the tasks that have the information "session_id" equal to your "sessionId" cookie.

- `Delete all done tasks`: You can delete all completed tasks by making a request with the DELETE method to "/tasks/completed". This will only delete the done tasks from your task list, that is, the tasks that have the information "done" equal to **true** and the information "session_id" equal to your "sessionId".

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