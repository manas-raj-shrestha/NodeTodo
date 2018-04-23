import bookshelf from '../db';
import Task from './task';

const TABLE_NAME = 'tags';

/**
 * Tag model.
 */
class Tag extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  tasks() {
    return this.belongsToMany(Task, 'tasks_tags');
  }
}

export default Tag;
