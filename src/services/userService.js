import Boom from 'boom';
import User from '../models/user';
import bcrypt from 'bcrypt';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
// export function createUser(user) {
//   let promise = new Promise((resolve, reject) => {
//     bcrypt.hash(user.password, 10, function(err, hash) {
//       if (err) {
//         reject(err);
//       }

//       new User({ name: user.name, password: hash })
//         .save()
//         .then(user => {
//           user.refresh();
//           let userJson = user.toJSON();
//           delete userJson.password;
//           resolve(userJson);
//         })
//         .catch(_err => {
//           reject(new Boom.badRequest('Username is already in use'));
//         });
//     });
//   });

//   return promise;
// }

export async function createUser(user) {
  try {
    let hash = await bcrypt.hash(user.password, 10);
    let userResult = await new User({ name: user.name, password: hash }).save();
    userResult.refresh();
    let userJson = userResult.toJSON();
    delete userJson.password;

    return userJson;
  } catch (err) {
    throw new Boom.badRequest('Username is already in use');
  }
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name }).then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
