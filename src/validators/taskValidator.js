import Joi from 'joi';
import validate from '../utils/validate';
import * as taskService from '../services/taskService';

const SCHEMA = {
  description: Joi.string()
    .label('Task Description')
    .max(200)
    .required()
};

function taskValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

function findTask(req, res, next) {
  return taskService
    .getTask(req.params.taskId)
    .then(() => next())
    .catch(err => next(err));
}

export { findTask, taskValidator };
