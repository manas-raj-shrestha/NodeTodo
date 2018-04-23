import Boom from 'boom';
import Task from '../models/task';

/**
 * Fetces all tasks
 */
export function getTasks(id) {
  return Task.fetchAll();
}

export function createTask(userId, body) {
  return new Task({ userId, description: body.description }).save().then(task => task.refresh());
}

export function updateTask(id, body) {
  console.log('body', body.description);

  return new Task({ id }).save({ description: body.description }).then(task => task.refresh());
}

export function deleteTask(id) {
  return new Task({ id }).fetch().then(task => task.destroy());
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
