import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as tagService from '../services/tagService';
import { getUserInfo } from '../middlewares/auth';
import { defaultThrottleConfig } from 'rxjs/operator/throttle';
import { findTaskWithUser, tagValidator, findTag } from '../validators/tagValidator';

const router = Router();

router.post('/', tagValidator, getUserInfo, (req, res, next) => {
  tagService
    .createTag(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.put('/:tagId', tagValidator, getUserInfo, findTag, (req, res, next) => {
  tagService
    .modifyTag(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
