import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary()
    table.uuid('session_id').index()
    table.text('title').notNullable()
    table.boolean('done').defaultTo(false).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks')
}
