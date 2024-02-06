const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/add-notice", async (req, res) => {
  try {
    const notice = await prisma.notice.create({
      data: {
        title: req.body.title,
        message: req.body.amount,
        user_id: req.body.selectedUser,
      },
    });
    res.json(notice);
    console.log(notice);
  } catch (error) {
    console.error("Error inserting user with Prisma", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
