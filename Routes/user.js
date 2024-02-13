const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { SignUpSchema } = require("../validations/user.validation");
const validate = require("../middleware/validate");

const prisma = new PrismaClient();

router.post("/user", validate(SignUpSchema), async (req, res) => {
  try {
    const { password, fullname, username, usertype } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const userData = await prisma.user.create({
      data: {
        name: fullname,
        Email: username,
        Role: usertype,
        Password: hashPassword,
      },
    });
    // res.json(userData);
    res.status(200).json({ message: "user created", data: userData });
    console.log("User data successfully submitted", userData);
  } catch (err) {
    console.error("Error inserting user with Prisma", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
