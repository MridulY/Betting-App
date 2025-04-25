import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Register route with admin creation functionality
router.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        email,
        password,
        isAdmin,
        adminToken,
        newAdminEmail,
        newAdminPassword,
      } = req.body;
      console.log("checking data at backend", email, password);

      // Admin registration functionality
      if (isAdmin) {
        // Check if the provided adminToken is valid
        if (adminToken !== process.env.ADMIN_TOKEN) {
          return res
            .status(403)
            .json({ message: "Unauthorized to create admin" });
        }

        // Validate the admin creation data
        if (!newAdminEmail || !newAdminPassword) {
          return res
            .status(400)
            .json({ message: "New admin email and password are required" });
        }

        // Check if the admin already exists
        const existingAdmin = await User.findOne({ email: newAdminEmail });
        if (existingAdmin) {
          return res
            .status(400)
            .json({ message: "Admin email already exists" });
        }

        // Hash the new admin's password

        const newAdmin = new User({
          email: newAdminEmail,
          password: password,
          role: "admin",
          status: "active",
        });

        await newAdmin.save();
        return res.json({
          message: `Admin ${newAdminEmail} created successfully`,
        });
      }

      // Normal user registration
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = new User({
        email,
        password: password,
        role: "user",
        status: "active",
      });

      await user.save();

      // Generate JWT token for normal user
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Login route
// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("pass rec in login is", password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials email" });
    }

    console.log("Stored password hash: ", user.password); // Debugging log

    // Compare the entered password with the stored hashed password
    const isMatch = await user.comparePassword(password);

    console.log("Password match result: ", isMatch); // Debugging log

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials pass" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account is not active" });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
