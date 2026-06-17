const db = require("../../config/database");

class UserModel {
  /*
  |--------------------------------------------------------------------------
  | Create User
  |--------------------------------------------------------------------------
  */

  static create({
    username,
    email,
    passwordHash
  }) {
    const stmt = db.prepare(`
      INSERT INTO users (
        username,
        email,
        password_hash
      )
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(
      username,
      email,
      passwordHash
    );

    return result.lastInsertRowid;
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Email
  |--------------------------------------------------------------------------
  */

  static findByEmail(email) {
    const stmt = db.prepare(`
      SELECT *
      FROM users
      WHERE email = ?
    `);

    return stmt.get(email);
  }

  /*
  |--------------------------------------------------------------------------
  | Find By ID
  |--------------------------------------------------------------------------
  */

  static findById(id) {
    const stmt = db.prepare(`
      SELECT
        id,
        username,
        email,
        created_at
      FROM users
      WHERE id = ?
    `);

    return stmt.get(id);
  }
}

module.exports = UserModel;