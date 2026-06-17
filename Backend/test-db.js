require("dotenv").config();

const db = require("./config/database");

console.log(
  db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table'"
  ).all()
);