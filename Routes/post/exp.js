const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Endpoint for handling expense creation
router.post("/add-expenses", async (req, res) => {
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

    const { exp_type, created_by, amount, payment_type, detail } = req.body;

    let expense;

    if (exp_type === "daily-exp") {
      expense = await prisma.daily_exp.create({
        data: {
          date: date.toISOString(),
          created_by,
          amount,
          payment_type,
          detail,
        },
      });
    } else if (exp_type === "miscellaneous") {
      // Assuming you have a 'miscellaneous' table
      expense = await prisma.miscellaneous.create({
        data: {
          date: date.toISOString(),
          created_by,
          amount,
          payment_type,
          detail,
        },
      });
    } else {
      return res.status(400).json({ error: "Invalid expense type" });
    }

    res.status(201).json({ message: "Expense created successfully", expense });

    // Save payment in transactions table based on payment type
    let payment;
    switch (payment_type) {
      case "cash":
        payment = await prisma.transactions.create({
          data: {
            cash: parseFloat(-amount),
          },
        });
        break;
      case "cheque":
        payment = await prisma.transactions.create({
          data: {
            cheque: parseFloat(-amount),
          },
        });
      case "bank": // Handling both "cheque" and "bank" cases together
        payment = await prisma.transactions.create({
          data: {
            cheque: parseFloat(-amount),
          },
        });
        break;
      default:
        return res.status(400).json({ error: "Invalid payment type" });
    }

    res.status(201).json({ message: "Payment recorded successfully", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
