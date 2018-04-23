import Boom from 'boom';
import Task from '../models/task';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserInfo } from '../middlewares/auth';
import uuidv4 from 'uuid/v4';

export async function login(username, password) {
  let userBookSh = await new User({ name: username }).fetch();
  try {
    if (!userBookSh || !bcrypt.compareSync(password, userBookSh.toJSON().password)) {
      throw '';
    }
  } catch (err) {
    throw new Boom.badRequest('Incorrect username or password');
  }

  let userJson = userBookSh.toJSON();
  delete userJson.password;
  let token = jwt.sign({ user: userJson }, 'shhhhh');

  console.log('token', token);

  let response = {
    accessToken: token,
    refreshToken: uuidv4()
  };

  await new User({ id: userBookSh.get('id') })
    .save({ user_device: response.refreshToken })
    .then(user => user.refresh());

  return response;
}

export async function refreshToken(body) {
  let userBookSh = new User({ user_device: body.refreshToken }).fetch();

  if (!userBookSh) {
    throw new Boom.badRequest('Invalid token');
  }

  let userJson = userBookSh.toJSON();
  delete userJson.password;
  let token = jwt.sign({ user: userJson }, 'shhhhh');

  let response = {
    accessToken: token,
    refreshToken: body.refreshToken
  };

  return response;
}
