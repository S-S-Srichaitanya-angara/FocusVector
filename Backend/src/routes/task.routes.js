const express = require("express");

const TaskController = require(
  "../controllers/task.controller"
);

const authMiddleware = require(
  "../middleware/auth"
);

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  TaskController.create
);

router.get(
  "/",
  authMiddleware,
  TaskController.getAll
);

router.patch(
  "/:id/complete",
  authMiddleware,
  TaskController.complete
);

module.exports = router;