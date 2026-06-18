const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require(
  "../models/user.model"
);

class AuthController {
  static async register(req, res, next) {
  console.log("REGISTER HIT");
  console.log(req.body);
  
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
  static async login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required"
      });
    }

    const user =
      UserModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials"
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    return res.status(200).json({
      status: "success",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
}
static async me(
  req,
  res,
  next
) {
  try {
    const user =
      UserModel.findById(
        req.user.userId
      );

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    return res.status(200).json({
      status: "success",
      user
    });
  } catch (error) {
    next(error);
  }
}
}

module.exports = AuthController;