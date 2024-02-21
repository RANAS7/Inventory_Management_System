const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  try {
    // Using Prisma to find a user by email
    const userData = await prisma.user.findMany({
      where: {
        Email: req.body.email,
      },
    });

    if (userData.length > 0) {
      // Compare the provided password with the hashed password from the database
      bcrypt.compare(req.body.password, userData[0].Password, (err, resp) => {
        if (err) {
          return res.json({
            login: false,
            message: "Error comparing passwords",
          });
        }

        if (resp) {
          const id = userData[0].id;
          const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: 300 });
          return res.json({
            login: true,
            token,
            result: userData,
            message: "Login Successfull",
          });
        } else {
          return res.json({ login: false, message: "Password not matched" });
        }
      });
    } else {
      return res.json({ login: false, message: "Email not found" });
    }
  } catch (error) {
    console.error("Error finding user with Prisma", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
