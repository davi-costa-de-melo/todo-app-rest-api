// eslint-disable-next-line no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    tasks: {
      id: string
      session_id: string
      title: string
      done: boolean
    }
  }
}
