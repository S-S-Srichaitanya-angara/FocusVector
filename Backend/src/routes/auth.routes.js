const express = require("express");

const AuthController = require(
  "../controllers/auth.controller"
);

const router = express.Router();

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

module.exports = router;