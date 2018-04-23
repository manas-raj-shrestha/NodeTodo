import Boom from 'boom';
import Tag from '../models/tag';
import jwt from 'jsonwebtoken';
import { getUserInfo } from '../middlewares/auth';

export function createTag(reqBody) {
  return new Tag({ name: reqBody.name }).save().then(function(tag) {
    tag.tasks().attach(reqBody.taskId);
  });
}

export function modifyTag(reqBody) {
  return new Tag({ id: reqBody.id }).save({ name: reqBody.name }).then(tag => tag.refresh());
}

export function getTag(id) {
  return new Tag({ id }).fetch().then(tag => {
    if (!tag) {
      throw new Boom.notFound('Tag not found');
    }

    return tag;
  });
}
