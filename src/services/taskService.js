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

  console.log('----', body, userId);
  let taskBs = new Task({ description: body.description, userId });
  await taskBs.save();

  await taskBs.tags().attach(tags);
  await taskBs.load(['tags']);
  // console.log('task', task);
  await taskBs.refresh();

  // console.log('tags', tags);

  // await task.;

  return taskBs;
}

export async function updateTask(id, body) {
  let tasks = await new Task({ id }).save({ description: body.description });

  await tasks.load(['tags']);
  let tags = tasks.relations.tags;

  let toDelete = [];

  tags.toJSON().forEach(element => {
    if (body.tags.indexOf(element.id) > -1) {
      body.tags.splice(body.tags.indexOf(element.id), 1);
      console.log('dalete', element.id, body.tags);
    } else {
      toDelete.push(element.id);
      console.log('add to delete', element.id, toDelete);
    }
  });

  await tasks.tags().detach(toDelete);
  await tasks.tags().attach(body.tags);

  return tasks;
}

export function deleteTask(id) {
  return new Task({ id }).fetch().then(task => task.destroy());
}

export function searchTask(req) {
  // console.log(req.params.term);

  return Task.query(q => {
    q.leftJoin('tasks_tags', 'tasks.id', 'tasks_tags.task_id');
    q.leftJoin('tags', 'tasks_tags.tag_id', 'tags.id');
    q.where('tasks.description', 'like', `%${req.query.term}%`).orWhere('tags.name', 'like', `%${req.query.term}%`);
  }).fetchAll({ withRelated: ['tags'] });
  // .fetchPage({ page: 1, pageSize: 8 });
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
