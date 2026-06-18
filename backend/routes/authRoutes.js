const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created",
      userId: user._id
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {

    try {

      const user = await User.findById(
        req.user.id
      ).select("-password");

      res.json(user);

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);

module.exports = router;