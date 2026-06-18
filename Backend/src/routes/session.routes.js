const express = require("express");

const SessionController = require(
  "../controllers/session.controller"
);

const authMiddleware = require(
  "../middleware/auth"
);

const router = express.Router();

router.post(
  "/start",
  authMiddleware,
  SessionController.start
);

router.get(
  "/current",
  authMiddleware,
  SessionController.current
);

module.exports = router;