const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require(
  "../models/user.model"
);

class AuthController {
  static async register(
    req,
    res,
    next
  ) {
    try {
      const {
        username,
        email,
        password
      } = req.body;

      if (
        !username ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          status: "error",
          message:
            "All fields are required"
        });
      }

      const existingUser =
        UserModel.findByEmail(email);

      if (existingUser) {
        return res.status(409).json({
          status: "error",
          message:
            "Email already exists"
        });
      }

      const passwordHash =
        await bcrypt.hash(password, 12);

      const userId =
        UserModel.create({
          username,
          email,
          passwordHash
        });

      return res.status(201).json({
        status: "success",
        message:
          "User registered successfully",
        userId
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;