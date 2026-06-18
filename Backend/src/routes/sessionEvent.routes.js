const express = require("express");

const authMiddleware = require(
  "../middleware/auth"
);

const SessionEventController = require(
  "../controllers/sessionEvent.controller"
);

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  SessionEventController.create
);

module.exports = router;