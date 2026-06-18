const express = require("express");

const AuthController = require(
  "../controllers/auth.controller"
);

const router = express.Router();

const authMiddleware = require(
  "../middleware/auth"
);
/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

router.get("/test", (req, res) => {
  res.json({
    status: "success",
    message: "Auth routes working"
  });
});

router.post(
  "/register",
  AuthController.register
);

router.post(
  "/login",
  AuthController.login
);

router.get(
  "/me",
  authMiddleware,
  AuthController.me
);

module.exports = router;