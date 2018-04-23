import bookshelf from '../db';
import Tag from './tag';

const TABLE_NAME = 'tasks';

/**
 * Task model.
 */
class Task extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  tags() {
    return this.belongsToMany(Tag, 'tasks_tags');
  }
}

export default Task;
