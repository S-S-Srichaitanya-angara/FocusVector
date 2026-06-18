const db = require("../../config/database");

class AnalyticsModel {
  static getTodayStats(userId) {
    const stmt = db.prepare(`
      SELECT
        COALESCE(SUM(focus_seconds), 0) AS total_focus_seconds,
        COALESCE(AVG(focus_score), 0) AS average_focus_score
      FROM sessions
      WHERE user_id = ?
      AND DATE(start_time) = DATE('now')
      AND end_time IS NOT NULL
    `);

    return stmt.get(userId);
  }

  static getTaskStats(userId) {
    const stmt = db.prepare(`
      SELECT
        COUNT(*) AS total_tasks,
        SUM(
          CASE
            WHEN is_completed = 1
            THEN 1
            ELSE 0
          END
        ) AS completed_tasks
      FROM tasks
      WHERE user_id = ?
    `);

    return stmt.get(userId);
  }
}

module.exports = AnalyticsModel;