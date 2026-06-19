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
  static getTimelineData(userId) {
    const stmt = db.prepare(`
      SELECT
        strftime('%H:00', start_time) AS time_window,
        event_type,
        SUM(duration_seconds) AS total_duration
      FROM session_events se
      JOIN sessions s
        ON se.session_id = s.id
      WHERE s.user_id = ?
      AND DATE(se.start_time) = DATE('now')
      GROUP BY time_window, event_type
      ORDER BY time_window ASC
    `);

    return stmt.all(userId);
  }

  static getDistractionBreakdown(userId) {
  const stmt = db.prepare(`
    SELECT
      app_name,
      SUM(duration_seconds) AS total_duration
    FROM session_events se
    JOIN sessions s
      ON se.session_id = s.id
    WHERE s.user_id = ?
      AND LOWER(se.event_type) = 'distraction'
      AND DATE(se.start_time) = DATE('now')
    GROUP BY app_name
    ORDER BY total_duration DESC
  `);

  return stmt.all(userId);
}

static getFocusTrend(userId) {
  const stmt = db.prepare(`
    SELECT
      DATE(start_time) AS date,
      ROUND(AVG(focus_score)) AS focus_score
    FROM sessions
    WHERE user_id = ?
      AND end_time IS NOT NULL
      AND DATE(start_time) >= DATE('now', '-7 days')
    GROUP BY DATE(start_time)
    ORDER BY DATE(start_time)
  `);

  return stmt.all(userId);
}

static getHeatmapData(userId) {
  const stmt = db.prepare(`
    SELECT
      DATE(start_time) AS date,
      COALESCE(SUM(focus_seconds), 0) AS total_focus_seconds
    FROM sessions
    WHERE user_id = ?
      AND end_time IS NOT NULL
      AND DATE(start_time) >= DATE('now', '-365 days')
    GROUP BY DATE(start_time)
    ORDER BY DATE(start_time)
  `);

  return stmt.all(userId);
}

static getFocusHours(userId) {
  const stmt = db.prepare(`
    SELECT
      strftime('%H:00', start_time) AS hour,
      SUM(duration_seconds) AS focus_seconds
    FROM session_events se
    JOIN sessions s
      ON se.session_id = s.id
    WHERE s.user_id = ?
      AND LOWER(se.event_type) = 'focus'
      AND DATE(se.start_time) = DATE('now')
    GROUP BY hour
    ORDER BY hour
  `);

  return stmt.all(userId);
}

static getPeakFocusWindow(userId) {
  const stmt = db.prepare(`
    SELECT
      strftime('%H:00', start_time) AS hour,
      SUM(duration_seconds) AS focus_seconds
    FROM session_events se
    JOIN sessions s
      ON se.session_id = s.id
    WHERE s.user_id = ?
      AND LOWER(se.event_type) = 'focus'
      AND DATE(se.start_time) >= DATE('now', '-30 days')
    GROUP BY hour
    ORDER BY focus_seconds DESC
    LIMIT 1
  `);

  return stmt.get(userId);
}

}

module.exports = AnalyticsModel;