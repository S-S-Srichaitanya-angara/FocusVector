const db = require("../../config/database");

class TaskModel {
  static create(userId, title) {
    const stmt = db.prepare(`
      INSERT INTO tasks (
        user_id,
        title
      )
      VALUES (?, ?)
    `);

    const result = stmt.run(
      userId,
      title
    );

    return result.lastInsertRowid;
  }

  static getAll(userId) {
    const stmt = db.prepare(`
      SELECT *
      FROM tasks
      WHERE user_id = ?
      ORDER BY created_at DESC
    `);

    return stmt.all(userId);
  }

  static complete(taskId, userId) {
    const stmt = db.prepare(`
      UPDATE tasks
      SET is_completed = 1
      WHERE id = ?
      AND user_id = ?
    `);

    return stmt.run(
      taskId,
      userId
    );
  }

  static getCompletionStats(userId) {
    const stmt = db.prepare(`
      SELECT
        COUNT(*) AS total,
        SUM(
          CASE
            WHEN is_completed = 1
            THEN 1
            ELSE 0
          END
        ) AS completed
      FROM tasks
      WHERE user_id = ?
    `);

    return stmt.get(userId);
  }
static getTaskCompletionRate(userId) {
  const stats = this.getCompletionStats(userId);

  const total = stats.total || 0;
  const completed = stats.completed || 0;

  if (total === 0) {
    return 1;
  }

  return completed / total;
}
}

module.exports = TaskModel;