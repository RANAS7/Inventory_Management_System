const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Using Prisma to find a user by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = bcrypt.compare(password, user.Password);

    if (passwordMatch) {
      // Passwords match, generate JWT token
      const token = jwt.sign({ id: user.id }, "jwtSecretKey", {
        expiresIn: 300,
      });
      return res.json({
        login: true,
        token,
        result: user,
        message: "Login successful",
      });
    } else {
      return res
        .status(401)
        .json({ login: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error finding user with Prisma", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
