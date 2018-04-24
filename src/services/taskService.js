import Boom from 'boom';
import Task from '../models/task';

/**
 * Fetces all tasks
 */
export function getTasks(id) {
  return Task.fetchAll();
}

export async function createTask(userId, body) {
  let tags = body.tags;

  console.log('tags', tags);

  let task = await new Task({ userId, description: body.description }).save();
  await task.tags().attach(tags);

  return task;
}

export function updateTask(id, body) {
  console.log('body', body.description);

  return new Task({ id }).save({ description: body.description }).then(task => task.refresh());
}

export function deleteTask(id) {
  return new Task({ id }).fetch().then(task => task.destroy());
}

export function searchTask(req) {
  console.log(req.params.term);

  // return Task
  // .where('description', 'LIKE', '%' + req.params.term + '%').fetchAll();

  return Task.query(q => {
    q.leftJoin('tasks_tags', 'tasks.id', 'tasks_tags.task_id').select('*');
    q.leftJoin('tags', 'tasks_tags.tag_id', 'tags.id').select('*');
    q.where('tasks.description', 'like', `%${req.params.term}%`).orWhere('tags.name', 'like', `%${req.params.term}%`);
  }).fetchAll();
}

/**
 * Get a task.
 *
 * @param  {Number|String} ] id
 * @return {Promise}
 */
export function getTask(id) {
  return new Task({ id }).fetch().then(task => {
    if (!task) {
      throw new Boom.notFound('Task not found');
    }

    return task;
  });
}
