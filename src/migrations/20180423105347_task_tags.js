/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('tasks_tags', table => {
    table.increments();
    table.integer('task_id').references('tasks.id');
    table.integer('tag_id').references('tags.id');
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tasks_tags');
}
