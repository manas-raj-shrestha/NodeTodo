import jwt from 'jsonwebtoken';
import Boom from 'boom';

export function getUserInfo(req, res, next) {
  let token = req.headers['access-token'];

  let user = jwt.decode(token, 'shhhhh');

  // console.log('tasks', user.user.id, user);
  req.userId = user.user.id;
  // req.body = req.body;

  if (!user) {
    throw new Boom.unauthorized('User not valid');
  }

  next();
}
