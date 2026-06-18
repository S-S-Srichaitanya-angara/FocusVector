const db = require("../../config/database");

class SessionEventModel {
  static create({
    sessionId,
    eventType,
    appName,
    windowTitle,
    startTime,
    endTime,
    durationSeconds
  }) {
    const stmt = db.prepare(`
      INSERT INTO session_events (
        session_id,
        event_type,
        app_name,
        window_title,
        start_time,
        end_time,
        duration_seconds
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      sessionId,
      eventType,
      appName,
      windowTitle,
      startTime,
      endTime,
      durationSeconds
    );

    return result.lastInsertRowid;
  }

  static getSessionEvents(sessionId) {
    const stmt = db.prepare(`
      SELECT *
      FROM session_events
      WHERE session_id = ?
      ORDER BY start_time ASC
    `);

    return stmt.all(sessionId);
  }
  /*
    |--------------------------------------------------------------------------
    | Aggregate Session Metrics
    |--------------------------------------------------------------------------
    */

    static aggregateSession(sessionId) {
    const stmt = db.prepare(`
        SELECT
        event_type,
        SUM(duration_seconds) AS total_duration
        FROM session_events
        WHERE session_id = ?
        GROUP BY event_type
    `);

    const rows = stmt.all(sessionId);

    const result = {
        focusSeconds: 0,
        distractionSeconds: 0,
        idleSeconds: 0
    };

    rows.forEach((row) => {
        switch (row.event_type.toLowerCase()) {
        case "focus":
            result.focusSeconds = row.total_duration;
            break;

        case "distraction":
            result.distractionSeconds = row.total_duration;
            break;

        case "idle":
            result.idleSeconds = row.total_duration;
            break;
        }
    });

    return result;
    }
}

module.exports = SessionEventModel;