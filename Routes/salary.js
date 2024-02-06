const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/add-salary", async (req, res) => {
  try {
    let date;

    if (req.body.date) {
      // If date is provided in the request, use it
      date = new Date(req.body.date);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
    } else {
      // If date is not provided, use the current date as the default
      date = new Date();
    }
    const salary = await prisma.salary.create({
      data: {
        Date: date.toISOString(),
        Amount: parseFloat(req.body.amount),
        User_ID: parseInt(req.body.selectedUser),
      },
    });
    res.json(salary);
    console.log(salary);
  } catch (error) {
    console.error("Error inserting user with Prisma", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
