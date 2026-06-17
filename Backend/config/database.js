const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(
  __dirname,
  "..",
  process.env.DB_PATH || "focusvector.db"
);

const schemaPath = path.join(
  __dirname,
  "..",
  "schema.sql"
);

const db = new Database(dbPath);

/*
|--------------------------------------------------------------------------
| SQLite Configuration
|--------------------------------------------------------------------------
*/

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

/*
|--------------------------------------------------------------------------
| Initialize Schema
|--------------------------------------------------------------------------
*/

try {
  const schema = fs.readFileSync(
    schemaPath,
    "utf8"
  );

  db.exec(schema);

  console.log(
    "✓ Database initialized successfully"
  );
} catch (error) {
  console.error(
    "✗ Failed to initialize database:",
    error
  );
  process.exit(1);
}

module.exports = db;