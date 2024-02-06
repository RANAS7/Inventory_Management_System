const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/user", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const userData = await prisma.user.create({
      data: {
        Name: req.body.name,
        Email: req.body.email,
        Role: req.body.role,
        Password: hashPassword,
      },
    });
    res.json(userData);
    console.log("User data successfully submitted", userData);
  } catch (err) {
    console.error("Error inserting user with Prisma", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
