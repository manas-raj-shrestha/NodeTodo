import { Router } from 'express';
import { findTask, taskValidator } from '../validators/taskValidator';
import { getUserInfo } from '../middlewares/auth';
import * as taskService from '../services/taskService';
import HttpStatus from 'http-status-codes';

const router = Router();

/**
 * GET /api/users/:id/tasks
 */
router.get('/', getUserInfo, (req, res, next) => {
  console.log('user id', req.userId);
  taskService
    .getTasks(req.userId)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/users/:id/tasks
 */
router.post('/', taskValidator, getUserInfo, (req, res, next) => {
  console.log('user id', req.userId);
  taskService
    .createTask(req.userId, req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
   * PUT /api/users/:id/tasks/:taskId
   */
router.put('/:taskId', getUserInfo, findTask, (req, res, next) => {
  console.log('here', req.userId, req.params.taskId);
  taskService
    .updateTask(req.params.taskId, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
   * DELETE /api/tasks/:taskId
   */
router.delete('/:taskId', getUserInfo, findTask, (req, res, next) => {
  console.log(req.params.taskId);

  taskService
    .deleteTask(req.params.taskId)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

router.get('/search/:term', (req, res, next) => {
  taskService
    .searchTask(req)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
