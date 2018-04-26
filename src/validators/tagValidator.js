import Joi from 'joi';
import validate from '../utils/validate';
import * as taskService from '../services/taskService';
import * as tagService from '../services/tagService';
import Boom from 'boom';

const SCHEMA = {
  name: Joi.string()
    .label('Tag Name')
    .max(200)
    .required()
};

function tagValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

function findTag(req, res, next) {
  return tagService
    .getTag(req.params.tagId)
    .then(() => next())
    .catch(err => next(err));
}

async function findTaskWithUser(req, res, next) {
  try {
    let task = await taskService.getTask(req.body.taskId);

    if (!task) {
      throw new Boom.badRequest('Task not found');
    }

    if (task.attributes.userId != req.userId) {
      throw new Boom.unauthorized('User action not authorized');
    }
  } catch (err) {
    next(err);
  }

  next();
}

export { findTaskWithUser, tagValidator, findTag };
