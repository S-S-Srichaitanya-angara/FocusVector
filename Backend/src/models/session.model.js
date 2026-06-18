const db = require("../../config/database");

class SessionModel {
  /*
  |--------------------------------------------------------------------------
  | Create Session
  |--------------------------------------------------------------------------
  */

  static create(userId) {
    const stmt = db.prepare(`
      INSERT INTO sessions (
        user_id,
        start_time
      )
      VALUES (?, datetime('now'))
    `);

    const result = stmt.run(userId);

    return result.lastInsertRowid;
  }

  /*
  |--------------------------------------------------------------------------
  | Get Active Session
  |--------------------------------------------------------------------------
  */

  static getActiveSession(userId) {
    const stmt = db.prepare(`
      SELECT *
      FROM sessions
      WHERE user_id = ?
      AND end_time IS NULL
      ORDER BY id DESC
      LIMIT 1
    `);

    return stmt.get(userId);
  }

  /*
  |--------------------------------------------------------------------------
  | End Session
  |--------------------------------------------------------------------------
  */

  static endSession(
    sessionId,
    focusSeconds,
    distractionSeconds,
    idleSeconds,
    focusScore
  ) {
    const stmt = db.prepare(`
      UPDATE sessions
      SET
        end_time = datetime('now'),
        focus_seconds = ?,
        distraction_seconds = ?,
        idle_seconds = ?,
        focus_score = ?
      WHERE id = ?
    `);

    return stmt.run(
      focusSeconds,
      distractionSeconds,
      idleSeconds,
      focusScore,
      sessionId
    );
  }
  /*
    |--------------------------------------------------------------------------
    | Get Session By ID
    |--------------------------------------------------------------------------
    */

    static findById(sessionId) {
    const stmt = db.prepare(`
        SELECT *
        FROM sessions
        WHERE id = ?
    `);

    return stmt.get(sessionId);
    }

    /*
    |--------------------------------------------------------------------------
    | Current Session Summary
    |--------------------------------------------------------------------------
    */

    static getCurrentSessionSummary(userId) {
    const stmt = db.prepare(`
        SELECT *
        FROM sessions
        WHERE user_id = ?
        AND end_time IS NULL
        ORDER BY id DESC
        LIMIT 1
    `);

    return stmt.get(userId);
    }
}

module.exports = SessionModel;